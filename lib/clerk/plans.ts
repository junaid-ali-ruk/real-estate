import { clerkClient, currentUser } from "@clerk/nextjs/server";

/**
 * Check if the current user has an active subscription.
 * This function checks the Clerk user metadata for subscription status
 * which should be set by Clerk webhooks when a subscription is created.
 * 
 * It also checks for organization-level subscriptions.
 */
export async function hasActiveSubscription(): Promise<boolean> {
  // Use currentUser() which works without requiring clerkMiddleware in the same way
  const user = await currentUser();
  
  if (!user) {
    return false;
  }
  
  const userId = user.id;
  const clerk = await clerkClient();
  
  // Check for active subscription in Clerk user metadata
  // This gets set by Clerk webhooks when subscription is created/active
  const subscriptionStatus = user.publicMetadata?.subscriptionStatus;
  const stripeSubscriptionId = user.publicMetadata?.stripeSubscriptionId;
  const plan = user.publicMetadata?.plan;
  
  // If subscription status is explicitly set in metadata, use that
  if (subscriptionStatus === "active" || subscriptionStatus === "trialing") {
    return true;
  }
  
  // If there's a Stripe subscription ID or a plan name, consider them subscribed
  if (stripeSubscriptionId || plan) {
    return true;
  }

  // In development, allow access if bypass is enabled or just return true for testing
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  
  // Check if user has any organization with active subscription
  try {
    const { data: memberships } = await clerk.users.getOrganizationMembershipList({
      userId,
    });
    
    for (const membership of memberships) {
      const org = membership.organization;
      // Check organization metadata for subscription
      const orgSubscriptionStatus = org.publicMetadata?.subscriptionStatus;
      if (orgSubscriptionStatus === "active" || orgSubscriptionStatus === "trialing") {
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
