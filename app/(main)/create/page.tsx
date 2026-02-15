import { Protect } from "@clerk/nextjs";
import { ListingForm } from "@/components/forms/ListingForm";
import { hasActiveSubscription } from "@/lib/clerk/plans";
import { sanityFetch } from "@/lib/sanity/live";
import { AMENITIES_QUERY } from "@/lib/sanity/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CreatePropertyPage() {
  const { data: amenities } = await sanityFetch({
    query: AMENITIES_QUERY,
  });

  // Check if user has active subscription
  const isSubscribed = await hasActiveSubscription();

  return (
    <main className="container py-20" id="main">
      <Protect
        fallback={
          <div className="max-w-xl mx-auto text-center space-y-8 py-32 border border-dashed border-border bg-card/50">
            <div className="inline-block px-4 py-1 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary">Access Restricted</div>
            <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic">Vanguard<br/>Access Required</h1>
            <p className="text-muted-foreground font-light italic text-lg px-12">
              The ability to curate architectural legacies is reserved for our verified partners. Explore our partnership tiers to begin.
            </p>
            <Button asChild size="xl" className="rounded-none px-12 h-16 font-black uppercase tracking-widest bg-primary shadow-2xl">
              <Link href="/pricing">Examine Partnership Tiers</Link>
            </Button>
          </div>
        }
      >
        {!isSubscribed ? (
          <div className="max-w-xl mx-auto text-center space-y-8 py-32 border border-dashed border-border bg-card/50">
            <div className="inline-block px-4 py-1 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary">Access Restricted</div>
            <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic">Vanguard<br/>Access Required</h1>
            <p className="text-muted-foreground font-light italic text-lg px-12">
              The ability to curate architectural legacies is reserved for our verified partners. Explore our partnership tiers to begin.
            </p>
            <Button asChild size="xl" className="rounded-none px-12 h-16 font-black uppercase tracking-widest bg-primary shadow-2xl">
              <Link href="/pricing">Examine Partnership Tiers</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Legacy Creation</span>
              </div>
              <h1 className="text-6xl font-heading font-black uppercase tracking-tighter leading-none mb-4">Register New<br/><span className="italic font-light text-stroke">Estate Asset</span></h1>
              <p className="text-muted-foreground font-light italic">
                Populate the architectural directory with a new premium asset.
              </p>
            </div>

            <ListingForm amenities={amenities} />
          </div>
        )}
      </Protect>
    </main>
  );
}
