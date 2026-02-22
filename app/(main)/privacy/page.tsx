export default function PrivacyPage() {
  return (
    <main className="container py-24 max-w-3xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5">
            Data Governance
          </div>
          <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
            Privacy &<br />
            Discretion
          </h1>
          <p className="text-muted-foreground font-light italic">
            Last updated: February 17, 2026
          </p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Discretion is the cornerstone of Nestwell. We treat your personal
            data with the same level of care as the properties we represent.
          </p>

          <h3 className="text-foreground font-bold uppercase tracking-widest text-xs pt-4">
            1. Collection Protocols
          </h3>
          <p>
            We utilize Clerk for industry-leading authentication. Your
            identifying information is never sold or utilized for third-party
            marketing.
          </p>

          <h3 className="text-foreground font-bold uppercase tracking-widest text-xs pt-4">
            2. Digital Footprint
          </h3>
          <p>
            We analyze browsing patterns to improve our collection curation but
            anonymize all data points to ensure user anonymity.
          </p>
        </div>
      </div>
    </main>
  );
}
