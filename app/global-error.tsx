"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global application error", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
          <div className="max-w-md w-full space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 border border-destructive/20 text-[10px] font-black uppercase tracking-[0.3em] text-destructive bg-destructive/5">
                Critical Exception
              </div>
              <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
                Structural
                <br />
                Failure
              </h1>
              <p className="text-muted-foreground font-light italic text-lg leading-relaxed">
                A critical error has compromised the application framework. A
                full system reset is required.
              </p>
            </div>

            <button
              type="button"
              onClick={() => reset()}
              className="w-full rounded-none px-8 h-16 font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/20 transition-all"
            >
              Reinitialize Application
            </button>

            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8">
              Critical Error Signature: {error.digest || "Unknown"}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
