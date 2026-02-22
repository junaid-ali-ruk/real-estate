import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAgentDocument } from "@/actions/agents";
import { ListingForm } from "@/components/forms/ListingForm";
import { sanityFetch } from "@/lib/sanity/live";
import { AGENT_ID_BY_USER_QUERY, AMENITIES_QUERY } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function CreatePropertyPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Ensure agent document exists in Sanity
  let { data: agent } = await sanityFetch({
    query: AGENT_ID_BY_USER_QUERY,
    params: { userId },
  });

  if (!agent) {
    console.log(
      `[CREATE PAGE] No agent found for user ${userId}. Creating document...`,
    );
    agent = await createAgentDocument();

    // If creation still fails to return an agent, we might be in a race condition
    if (!agent) {
      console.error(
        `[CREATE PAGE] Failed to create or retrieve agent for user ${userId}`,
      );
      throw new Error(
        "Agent account could not be initialized. Please refresh or try again.",
      );
    }
  }

  const { data: amenities } = await sanityFetch({
    query: AMENITIES_QUERY,
  });

  return (
    <main className="container py-20" id="main">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Legacy Creation
            </span>
          </div>
          <h1 className="text-6xl font-heading font-black uppercase tracking-tighter leading-none mb-4">
            Register New
            <br />
            <span className="italic font-light text-stroke">Estate Asset</span>
          </h1>
          <p className="text-muted-foreground font-light italic">
            Populate the architectural directory with a new premium asset.
          </p>
        </div>

        <ListingForm amenities={amenities} />
      </div>
    </main>
  );
}
