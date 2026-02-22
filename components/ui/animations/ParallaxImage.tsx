"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  speed?: number; // How much it moves (negative moves opposite to scroll)
}

export function ParallaxImage({
  children,
  className,
  speed = 0.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("overflow-hidden relative", className)}>
      <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] absolute">
        {children}
      </motion.div>
    </div>
  );
}
