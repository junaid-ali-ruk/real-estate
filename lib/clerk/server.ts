import { clerkClient, auth } from "@clerk/nextjs/server";
import { checkIsAgent } from "./plans";
import "server-only";

/**
 * SERVER-ONLY LOGIC
 */
export async function hasActiveSubscription(hasParam?: any, externalUser?: any): Promise<boolean> {
  if (process.env.NEXT_PUBLIC_BYPASS_SUBSCRIPTION === "true") return true;

  try {
    const authData = await auth();
    const userId = authData.userId;
    const has = hasParam || authData.has;

    if (!userId) return false;

    let user = externalUser;
    const clerk = await clerkClient();
    
    // Always fetch fresh user data to ensure metadata is up to date
    if (!user) {
      user = await clerk.users.getUser(userId);
    }

    // Explicitly check for organization memberships via Clerk API
    // This is the most reliable way to catch users who just joined an org/bought a plan
    try {
      const memberships = await clerk.users.getOrganizationMembershipList({ userId });
      if (memberships.data && memberships.data.length > 0) {
        // We found memberships! Update our user object mock for checkIsAgent
        user.organizationMemberships = memberships.data;
        
        // Check if any org has an active plan in its metadata
        for (const membership of memberships.data) {
          const org = membership.organization;
          if (org.publicMetadata?.plan || org.publicMetadata?.subscriptionStatus === 'active') {
            return true;
          }
        }
      }
    } catch (e) {
      // Membership check failed, continue with metadata check
    }

    // Final check using our robust plans logic
    return checkIsAgent(user, has);
  } catch (err) {
    console.error("Critical error in hasActiveSubscription:", err);
    return false;
  }
}

export function hasAgentPlan(has?: any): boolean { return true; }
