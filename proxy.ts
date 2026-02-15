import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/saved(.*)",
  "/profile(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

const isAgentRoute = createRouteMatcher(["/dashboard(.*)", "/create(.*)"]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/properties(.*)",
  "/pricing(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/studio(.*)",
]);

/**
 * Check if user has active subscription by examining their Clerk metadata.
 * This function is designed to work within clerkMiddleware.
 */
async function checkUserSubscription(userId: string): Promise<boolean> {
  // 1. Always allow in development mode to prevent blocking the developer
  if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_BYPASS_SUBSCRIPTION === "true") {
    return true;
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  
  // 2. Check all common metadata keys used for subscriptions
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
  
  // 3. Check organization memberships
  try {
    const { data: memberships } = await clerk.users.getOrganizationMembershipList({
      userId,
    });
    
    for (const membership of memberships) {
      const org = membership.organization;
      const orgMeta = org.publicMetadata || {};
      if (orgMeta.subscriptionStatus === "active" || 
          orgMeta.subscriptionStatus === "trialing" ||
          orgMeta.plan) {
        return true;
      }
    }
  } catch {
    // Continue if organization check fails
  }
  
  return false;
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, has } = await auth();

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect routes that require authentication
  if ((isProtectedRoute(req) || isOnboardingRoute(req)) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Check onboarding status for authenticated users on protected routes
  if (userId && isProtectedRoute(req)) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const onboardingComplete = user.publicMetadata?.onboardingComplete;
    if (!onboardingComplete) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // If user has completed onboarding but visits /onboarding, redirect to home
  if (userId && isOnboardingRoute(req)) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const onboardingComplete = user.publicMetadata?.onboardingComplete;
    if (onboardingComplete) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Agent routes require active subscription + completed agent onboarding
  if (isAgentRoute(req) && userId) {
    // Check for active subscription using Clerk metadata
    const isSubscribed = await checkUserSubscription(userId);
    
    if (!isSubscribed) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }

    // Check agent onboarding status (stored in Clerk metadata)
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const agentOnboardingComplete =
      user.publicMetadata?.agentOnboardingComplete;

    // If not onboarded, redirect to agent onboarding (unless already there)
    if (
      !agentOnboardingComplete &&
      !req.nextUrl.pathname.startsWith("/dashboard/onboarding")
    ) {
      return NextResponse.redirect(new URL("/dashboard/onboarding", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
