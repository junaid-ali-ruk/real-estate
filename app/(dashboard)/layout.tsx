import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
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
