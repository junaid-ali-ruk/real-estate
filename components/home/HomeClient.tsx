"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  MapPin,
  Maximize2,
  MoveRight,
  Plus,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { ParallaxImage } from "@/components/ui/animations/ParallaxImage";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations/StaggerContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Property } from "@/types";

// Partner avatar data
const partnerAvatars = [
  { id: 1, name: "Alexandra" },
  { id: 2, name: "Benjamin" },
  { id: 3, name: "Catherine" },
  { id: 4, name: "Dominic" },
  { id: 5, name: "99+", isCount: true },
];

export function HomeClient({
  featuredProperties,
}: {
  featuredProperties: Property[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Simplified scroll transforms
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  // Reduced parallax movement
  const textX1 = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
  const textX2 = useTransform(scrollYProgress, [0, 0.25], [0, 30]);

  return (
    <div ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[120vh] flex items-center justify-center pt-20 pb-32">
        {/* Simple Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full"
            style={{ filter: "blur(100px)" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.08]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="container relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.1} className="flex items-center gap-6 mb-16">
                <div className="h-px w-20 bg-primary/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                  Estate Vanguard 2026
                </span>
              </FadeIn>

              <FadeIn delay={0.2} className="relative">
                <h1 className="text-[16vw] md:text-[13vw] lg:text-[10vw] font-heading font-black leading-[0.9] tracking-[-0.06em] uppercase mb-12 md:mb-20">
                  <motion.span style={{ x: textX1 }} className="block">
                    Bespoke
                  </motion.span>
                  <motion.span className="block italic font-light ml-[12%] text-stroke py-2 md:py-4 opacity-80">
                    Living
                  </motion.span>
                  <motion.span
                    style={{ x: textX2 }}
                    className="block text-primary"
                  >
                    Refined
                  </motion.span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3} className="max-w-2xl mt-12 md:mt-16">
                <div className="relative pl-6 md:pl-16">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
                  <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-muted-foreground mb-12 md:mb-16">
                    We bridge the gap between vision and reality for the world's
                    most distinctive architectural legacies.
                  </p>
                  <div className="flex flex-wrap gap-12 items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/properties" tabIndex={-1}>
                        <Button
                          size="xl"
                          className="group bg-primary text-primary-foreground rounded-none px-8 md:px-16 h-16 md:h-20 text-xs md:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-auto"
                        >
                          <span className="flex items-center gap-4 md:gap-6">
                            Enter Directory{" "}
                            <MoveRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                      <div className="flex -space-x-4 mb-2">
                        {partnerAvatars.map((partner, i) => (
                          <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                            className="h-12 w-12 border-4 border-background bg-primary flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            title={partner.name}
                          >
                            {partner.isCount ? (
                              <span className="text-[10px] font-bold text-primary-foreground">
                                {partner.name}
                              </span>
                            ) : (
                              <User className="h-5 w-5 text-primary-foreground" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Verified Partners
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-4 lg:pt-32">
              <FadeIn
                delay={0.4}
                direction="left"
                className="relative z-20 group mb-24"
              >
                <div className="bg-background border border-border p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <form action="/properties" method="GET" className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="search-location"
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                        >
                          Acquisition Search
                        </label>
                        <Compass className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="search-location"
                          name="city"
                          placeholder="Global Territories..."
                          className="border-0 border-b-2 border-border rounded-none px-8 h-16 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300 text-lg font-semibold placeholder:font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="group/field cursor-pointer">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover/field:text-primary transition-colors duration-300">
                          Tier
                        </span>
                        <div className="h-12 border-b border-border flex items-center px-2 font-semibold text-sm group-hover/field:border-primary transition-colors duration-300">
                          Ultra Luxury
                        </div>
                      </div>
                      <div className="group/field cursor-pointer">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover/field:text-primary transition-colors duration-300">
                          Format
                        </span>
                        <div className="h-12 border-b border-border flex items-center px-2 font-semibold text-sm group-hover/field:border-primary transition-colors duration-300">
                          Estates
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors duration-300"
                    >
                      Begin Journey
                    </Button>
                  </form>
                </div>
              </FadeIn>

              <FadeIn
                delay={0.5}
                direction="left"
                whileHover={{ y: -10 }}
                className="aspect-square relative overflow-hidden group shadow-lg cursor-pointer"
              >
                <ParallaxImage speed={0.15} className="w-full h-full">
                  <Image
                    src="/hero1.png"
                    alt="Property Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </ParallaxImage>
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300" />

                <div className="absolute top-8 left-8">
                  <div className="flex items-center gap-3 bg-white px-4 py-2 text-black">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      New Release
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                        Signature Estate
                      </span>
                      <h3 className="text-2xl font-heading font-bold uppercase text-white leading-tight">
                        The Obsidian Monolith
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-card relative">
        <div className="container">
          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20"
          >
            {[
              { label: "Active Listings", value: "1.2k+", icon: Layers },
              { label: "Success Rate", value: "98%", icon: Shield },
              { label: "Global Reach", value: "50+", icon: Compass },
              { label: "Asset Volume", value: "$4.2B", icon: Maximize2 },
            ].map((stat, _i) => (
              <StaggerItem
                key={stat.label}
                className="group flex flex-col items-center text-center"
              >
                <div className="h-14 w-14 mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 border border-border rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-5xl font-heading font-bold mb-3 tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-secondary/20">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <FadeIn direction="right" className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-primary/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Limited Release
                </span>
              </div>
              <h2 className="text-[8vw] font-heading font-bold leading-[0.85] tracking-tight uppercase">
                Curated
                <br />
                <span className="italic font-light text-stroke">
                  Collection
                </span>
              </h2>
            </FadeIn>

            <Link
              href="/properties"
              className="group flex flex-col items-end gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Examine Full Directory
              </span>
              <div className="flex h-16 w-44 items-center justify-between border-2 border-border px-6 group-hover:border-primary transition-colors duration-300">
                <span className="font-bold uppercase tracking-wider text-xs">
                  View All
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <FadeIn direction="up">
            {featuredProperties && featuredProperties.length > 0 ? (
              <PropertyGrid properties={featuredProperties} />
            ) : (
              <div className="py-32 border-2 border-dashed border-border flex flex-col items-center justify-center text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent mb-6" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Synchronizing Global Inventory
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 border-y border-border bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <FadeIn direction="right" className="lg:col-span-7 relative">
              <div className="aspect-[16/10] overflow-hidden relative shadow-lg group">
                <ParallaxImage className="w-full h-full" speed={-0.1}>
                  <Image
                    src="/hero2.png"
                    alt="Architecture"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </ParallaxImage>
                <div className="absolute inset-0 bg-primary/30 mix-blend-multiply group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-20 w-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                  >
                    <Plus className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
              </div>

              <FadeIn
                delay={0.2}
                direction="up"
                className="absolute -bottom-12 -right-12 hidden xl:block w-80 bg-background border border-border p-8 shadow-lg"
              >
                <h3 className="text-2xl font-heading font-bold mb-4 leading-tight">
                  The Spirit of Architectural Legacy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Every structure tells a story. We specialize in the ones that
                  redefine the skyline and the soul.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-primary/40" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Our Advisory Standard
                  </span>
                </div>
              </FadeIn>
            </FadeIn>

            <div className="lg:col-span-5 space-y-16">
              <div>
                <FadeIn
                  direction="up"
                  className="text-5xl font-heading font-bold uppercase tracking-tight leading-[0.85] mb-8"
                >
                  Defining
                  <br />
                  <span className="italic font-light text-stroke">
                    Principles
                  </span>
                </FadeIn>
                <div className="h-1 w-24 bg-primary/40" />
              </div>

              <StaggerContainer staggerDelay={0.15} className="space-y-10">
                {[
                  {
                    title: "Sovereign Selection",
                    desc: "Our curation process is an elite screening of architectural value and location prestige.",
                  },
                  {
                    title: "Bespoke Acquisition",
                    desc: "Private advisory services that handle every nuance of high-value property transfer.",
                  },
                  {
                    title: "Global Intelligence",
                    desc: "Direct access to off-market inventory and emerging luxury territories.",
                  },
                ].map((item, i) => (
                  <StaggerItem
                    key={item.title}
                    direction="left"
                    className="group pl-12 relative"
                  >
                    <div className="absolute left-0 top-0 text-xl font-heading font-bold text-primary/20 group-hover:text-primary transition-colors">
                      0{i + 1}
                    </div>
                    <h4 className="text-base font-bold uppercase tracking-wider mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed border-l border-border pl-6 group-hover:border-primary transition-colors">
                      {item.desc}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-[12vw] font-heading font-bold text-white/90 leading-none uppercase tracking-tight">
              Elevated
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 mt-4">
              Experience The Untethered Life
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-48 bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-bold uppercase tracking-tight opacity-[0.03] text-white select-none whitespace-nowrap pointer-events-none">
          MASTERPIECE LEGACY VANGUARD
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <FadeIn direction="right">
                <h2 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tight leading-[0.85] mb-6 md:mb-8">
                  Shape The
                  <br />
                  <span className="italic font-light text-white/60">
                    Future
                  </span>
                </h2>
                <p className="text-lg font-light text-white/70 leading-relaxed mb-12 max-w-md">
                  Whether you are liquidating a premium asset or searching for
                  your next architectural legacy, our team is ready to advise.
                </p>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/create"
                    className="group flex items-center justify-between p-6 border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <span className="text-lg font-heading font-bold uppercase">
                      Register New Asset
                    </span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    href="/properties"
                    className="group flex items-center justify-between p-6 border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <span className="text-lg font-heading font-bold uppercase">
                      Begin Acquisition
                    </span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn
                direction="up"
                className="relative aspect-square border-2 border-white/20 p-10 flex flex-col justify-center items-center text-center group overflow-hidden"
              >
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                  <Image
                    src="/hero2.png"
                    alt="Luxury Interior"
                    fill
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#050505]/60" />
                </div>

                <div className="relative z-10">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/30" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/30" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/30" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/30" />

                  <h3 className="text-4xl font-heading font-bold uppercase mb-6 text-white">
                    Nestwell
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-10">
                    Luxury Estate Management
                  </p>
                  <div className="h-16 w-px bg-white/20 group-hover:h-20 transition-all duration-300 mx-auto" />
                  <div className="mt-10 text-sm font-light text-white/40 tracking-widest uppercase">
                    Est. 2026
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
