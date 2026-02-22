import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAgentDocument } from "@/actions/agents";
import { DashboardMobileHeader } from "@/components/layout/DashboardMobileHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { sanityFetch } from "@/lib/sanity/live";
import { AGENT_ID_BY_USER_QUERY } from "@/lib/sanity/queries";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Ensure agent document exists
  const { data: agent } = await sanityFetch({
    query: AGENT_ID_BY_USER_QUERY,
    params: { userId },
  });

  if (!agent) {
    await createAgentDocument();
  }

  return (
    <div className="flex min-h-[100dvh] bg-background border-l border-border flex-col md:flex-row w-full overflow-hidden">
      <DashboardSidebar className="hidden md:block" />
      <DashboardMobileHeader />
      <main id="main" className="flex-1 p-4 md:p-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
