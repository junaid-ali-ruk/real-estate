import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { sanityFetch } from "@/lib/sanity/live";
import { AGENT_ID_BY_USER_QUERY } from "@/lib/sanity/queries";
import { createAgentDocument } from "@/actions/agents";

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
    <div className="flex min-h-screen bg-background border-l border-border">
      <DashboardSidebar />
      <main id="main" className="flex-1 p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
