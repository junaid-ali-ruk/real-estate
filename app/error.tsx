"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our structured logger
    logger.error("Application error", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 border border-destructive/20 text-[10px] font-black uppercase tracking-[0.3em] text-destructive bg-destructive/5">
            System Error
          </div>
          <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
            Architectural
            <br />
            Dissonance
          </h1>
          <p className="text-muted-foreground font-light italic text-lg leading-relaxed">
            A structural anomaly has occurred in the digital framework. Our
            systems are recalibrating.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            size="xl"
            className="w-full sm:w-auto rounded-none px-8 h-14 font-black uppercase tracking-widest bg-primary shadow-xl hover:shadow-primary/20 transition-all"
          >
            Attempt Recovery
          </Button>
          <Button
            variant="outline"
            size="xl"
            asChild
            className="w-full sm:w-auto rounded-none px-8 h-14 font-black uppercase tracking-widest border-2 hover:bg-accent transition-all"
          >
            <Link href="/">Return to Entry</Link>
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8">
          Error Signature: {error.digest || "Unknown"}
        </p>
      </div>
    </div>
  );
}
