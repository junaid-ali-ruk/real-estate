import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5">
            404 Exception
          </div>
          <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
            Estate Not
            <br />
            Identified
          </h1>
          <p className="text-muted-foreground font-light italic text-lg leading-relaxed">
            The coordinate you requested does not exist within our curated
            directory of architectural legacies.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            size="xl"
            className="rounded-none px-12 h-16 font-black uppercase tracking-widest bg-primary shadow-2xl hover:shadow-primary/20 transition-all"
          >
            <Link href="/">Return to Collection</Link>
          </Button>
        </div>

        <div className="pt-12 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-primary/20" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">
            Nestwell Luxury Estates
          </p>
        </div>
      </div>
    </div>
  );
}
