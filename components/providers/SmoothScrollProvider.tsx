"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import type { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 2,
        smoothWheel: true,
      }}
    >
      {/* Cast to any to bypass type mismatch between React 19 and react-lenis */}
      {/* biome-ignore lint/suspicious/noExplicitAny: react-lenis types are currently incompatible with React 19 children */}
      {children as any}
    </ReactLenis>
  );
}
