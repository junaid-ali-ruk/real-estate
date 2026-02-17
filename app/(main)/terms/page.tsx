export default function TermsPage() {
  return (
    <main className="container py-24 max-w-3xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5">
            Legal Framework
          </div>
          <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
            Terms of<br/>Acquisition
          </h1>
          <p className="text-muted-foreground font-light italic">Last updated: February 17, 2026</p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>Welcome to Nestwell. By accessing our curated directory, you agree to abide by our standards of architectural preservation and professional conduct.</p>
          
          <h3 className="text-foreground font-bold uppercase tracking-widest text-xs pt-4">1. Use of Curation</h3>
          <p>Our platform provides direct access to high-value estate data. Users are permitted to utilize this information for personal acquisition research or professional brokerage purposes only.</p>

          <h3 className="text-foreground font-bold uppercase tracking-widest text-xs pt-4">2. Verified Information</h3>
          <p>While Nestwell ensures the highest level of data integrity through Sanity CMS, all architectural specifications and pricing are subject to final physical verification.</p>
        </div>
      </div>
    </main>
  );
}
