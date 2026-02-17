import { auth } from "@clerk/nextjs/server";
import "server-only";

/**
 * SERVER-ONLY LOGIC
 * Simplified version: Pricing is removed, everyone is subscribed if authenticated.
 */
export async function hasActiveSubscription(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId;
}

export function hasAgentPlan(): boolean {
  return true;
}
