import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Standard protection for user-specific routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/saved(.*)",
  "/profile(.*)",
  "/create(.*)"
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/properties(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/studio(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isPublicRoute(req)) return NextResponse.next();

  // AUTH GUARD: Require sign-in for protected routes
  if (!userId) {
    if (isProtectedRoute(req) || isOnboardingRoute(req)) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // ONBOARDING GUARD: Ensure basic profile setup
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const onboardingComplete = user.publicMetadata?.onboardingComplete;

  if (!onboardingComplete && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Prevent double-onboarding
  if (onboardingComplete && isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
