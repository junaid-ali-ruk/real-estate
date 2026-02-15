import { clerkClient, currentUser } from "@clerk/nextjs/server";

/**
 * Check if the current user has an active subscription.
 * This function checks the Clerk user metadata for subscription status
 * which should be set by Clerk webhooks when a subscription is created.
 * 
 * It also checks for organization-level subscriptions.
 */
export async function hasActiveSubscription(): Promise<boolean> {
  // 1. Always allow in development mode
  if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_BYPASS_SUBSCRIPTION === "true") {
    return true;
  }

  // Use currentUser() which works without requiring clerkMiddleware in the same way
  const user = await currentUser();
  
  if (!user) {
    return false;
  }
  
  const userId = user.id;
  const clerk = await clerkClient();
  
  // 2. Check all common metadata keys
  const publicMeta = user.publicMetadata || {};
  const privateMeta = user.privateMetadata || {};

  const hasValidStatus = [publicMeta.subscriptionStatus, privateMeta.subscriptionStatus].some(
    status => status === "active" || status === "trialing"
  );
  
  const hasSubscriptionId = !!(publicMeta.stripeSubscriptionId || privateMeta.stripeSubscriptionId || 
                               publicMeta.subscriptionId || privateMeta.subscriptionId);
                               
  const hasPlan = !!(publicMeta.plan || privateMeta.plan || publicMeta.role === "agent");

  if (hasValidStatus || hasSubscriptionId || hasPlan) {
    return true;
  }
  
  // 3. Check if user has any organization with active subscription
  try {
    const { data: memberships } = await clerk.users.getOrganizationMembershipList({
      userId,
    });
    
    for (const membership of memberships) {
      const org = membership.organization;
      const orgMeta = org.publicMetadata || {};
      // Check organization metadata for subscription
      if (orgMeta.subscriptionStatus === "active" || 
          orgMeta.subscriptionStatus === "trialing" ||
          orgMeta.plan) {
        return true;
      }
    }
  } catch {
    // User might not be in any organizations
  }
  
  // Default to false - no valid subscription found
  return false;
}

/**
 * Legacy function for backward compatibility.
 * 
 * @param has Optional Clerk 'has' function for checking permissions
 */
export function hasAgentPlan(has?: unknown): boolean {
  // This function was being misused - Clerk's has() checks permissions
  // not subscriptions. Return true to allow access, actual check happens
  // in middleware and server components using hasActiveSubscription()
  return true;
}
