"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  Shield, 
  MoveRight, 
  Plus, 
  ArrowUpRight,
  Maximize2,
  Compass,
  Layers,
  User
} from "lucide-react";
import Link from "next/link";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useMemo } from "react";

// Partner avatar data
const partnerAvatars = [
  { id: 1, name: "Alexandra" },
  { id: 2, name: "Benjamin" },
  { id: 3, name: "Catherine" },
  { id: 4, name: "Dominic" },
  { id: 5, name: "99+", isCount: true },
];

export function HomeClient({ featuredProperties }: { featuredProperties: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Simplified scroll transforms
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  
  // Reduced parallax movement
  const textX1 = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
  const textX2 = useTransform(scrollYProgress, [0, 0.25], [0, 30]);

  // Memoize variants
  const containerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo<Variants>(() => ({
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }), []);

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
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.08]" 
          />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
                <div className="h-px w-20 bg-primary/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                  Estate Vanguard 2026
                </span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">
                <h1 className="text-[13vw] lg:text-[10vw] font-heading font-black leading-[0.7] tracking-[-0.06em] uppercase mb-20">
                  <motion.span 
                    style={{ x: textX1 }}
                    className="block"
                  >
                    Bespoke
                  </motion.span>
                  <motion.span 
                    className="block italic font-light ml-[12%] text-stroke py-6"
                  >
                    Living
                  </motion.span>
                  <motion.span 
                    style={{ x: textX2 }}
                    className="block text-primary"
                  >
                    Refined
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants} className="max-w-2xl mt-16">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground mb-16">
                    We bridge the gap between vision and reality for the world's most distinctive architectural legacies.
                  </p>
                  <div className="flex flex-wrap gap-12 items-center">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="xl" className="group bg-primary text-primary-foreground rounded-none px-16 h-20 font-bold uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-6">
                          Enter Directory <MoveRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Button>
                    </motion.div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex -space-x-4 mb-2">
                        {partnerAvatars.map((partner, i) => (
                          <motion.div 
                            key={partner.id} 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + (i * 0.1) }}
                            className="h-12 w-12 border-4 border-background bg-primary flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            title={partner.name}
                          >
                            {partner.isCount ? (
                              <span className="text-[10px] font-bold text-primary-foreground">{partner.name}</span>
                            ) : (
                              <User className="h-5 w-5 text-primary-foreground" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Verified Partners</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-4 lg:pt-32">
              <motion.div 
                variants={itemVariants}
                className="relative z-20 group mb-24"
              >
                <div className="bg-background border border-border p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <form action="/properties" method="GET" className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Acquisition Search</label>
                        <Compass className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          name="city"
                          placeholder="Global Territories..."
                          className="border-0 border-b-2 border-border rounded-none px-8 h-16 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300 text-lg font-semibold placeholder:font-light"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="group/field cursor-pointer">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover/field:text-primary transition-colors duration-300">Tier</span>
                        <div className="h-12 border-b border-border flex items-center px-2 font-semibold text-sm group-hover/field:border-primary transition-colors duration-300">Ultra Luxury</div>
                      </div>
                      <div className="group/field cursor-pointer">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover/field:text-primary transition-colors duration-300">Format</span>
                        <div className="h-12 border-b border-border flex items-center px-2 font-semibold text-sm group-hover/field:border-primary transition-colors duration-300">Estates</div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-16 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors duration-300">
                      Begin Journey
                    </Button>
                  </form>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="aspect-square relative overflow-hidden group shadow-lg cursor-pointer"
              >
                <motion.img 
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  src="/hero1.png" 
                  alt="Property Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300" />
                
                <div className="absolute top-8 left-8">
                  <div className="flex items-center gap-3 bg-white px-4 py-2 text-black">
                    <span className="text-xs font-bold uppercase tracking-wider">New Release</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">Signature Estate</span>
                      <h3 className="text-2xl font-heading font-bold uppercase text-white leading-tight">The Obsidian Monolith</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-card relative">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
            {[
              { label: "Active Listings", value: "1.2k+", icon: Layers },
              { label: "Success Rate", value: "98%", icon: Shield },
              { label: "Global Reach", value: "50+", icon: Compass },
              { label: "Asset Volume", value: "$4.2B", icon: Maximize2 },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="h-14 w-14 mb-6 flex items-center justify-center relative">
                   <div className="absolute inset-0 border border-border rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                   <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-5xl font-heading font-bold mb-3 tracking-tight tabular-nums">{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-secondary/20">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <motion.div 
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-primary/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">Limited Release</span>
              </div>
              <h2 className="text-[8vw] font-heading font-bold leading-[0.85] tracking-tight uppercase">
                Curated<br/>
                <span className="italic font-light text-stroke">Collection</span>
              </h2>
            </motion.div>
            
            <Link href="/properties" className="group flex flex-col items-end gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors duration-300">Examine Full Directory</span>
              <div className="flex h-16 w-44 items-center justify-between border-2 border-border px-6 group-hover:border-primary transition-colors duration-300">
                <span className="font-bold uppercase tracking-wider text-xs">View All</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {featuredProperties && featuredProperties.length > 0 ? (
              <PropertyGrid properties={featuredProperties} />
            ) : (
              <div className="py-32 border-2 border-dashed border-border flex flex-col items-center justify-center text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent mb-6" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Synchronizing Global Inventory</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 border-y border-border bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative"
            >
              <div className="aspect-[16/10] overflow-hidden relative shadow-lg group">
                <img src="/hero2.png" alt="Architecture" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
              
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-12 -right-12 hidden xl:block w-80 bg-background border border-border p-8 shadow-lg"
              >
                <h3 className="text-2xl font-heading font-bold mb-4 leading-tight">The Spirit of Architectural Legacy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                   Every structure tells a story. We specialize in the ones that redefine the skyline and the soul.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-primary/40" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Our Advisory Standard</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-5 space-y-16">
               <div>
                  <motion.h2 
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl font-heading font-bold uppercase tracking-tight leading-[0.85] mb-8"
                  >
                    Defining<br/>
                    <span className="italic font-light text-stroke">Principles</span>
                  </motion.h2>
                  <div className="h-1 w-24 bg-primary/40" />
               </div>

               <div className="space-y-10">
                  {[
                    { title: "Sovereign Selection", desc: "Our curation process is an elite screening of architectural value and location prestige." },
                    { title: "Bespoke Acquisition", desc: "Private advisory services that handle every nuance of high-value property transfer." },
                    { title: "Global Intelligence", desc: "Direct access to off-market inventory and emerging luxury territories." }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ x: 60, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="group pl-12 relative"
                    >
                      <div className="absolute left-0 top-0 text-xl font-heading font-bold text-primary/20 group-hover:text-primary transition-colors">0{i+1}</div>
                      <h4 className="text-base font-bold uppercase tracking-wider mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed border-l border-border pl-6 group-hover:border-primary transition-colors">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
               </div>
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
            <h2 className="text-[12vw] font-heading font-bold text-white/90 leading-none uppercase tracking-tight">Elevated</h2>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 mt-4">Experience The Untethered Life</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-primary text-primary-foreground relative overflow-hidden">
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-bold uppercase tracking-tight opacity-[0.03] select-none whitespace-nowrap pointer-events-none"
        >
          MASTERPIECE LEGACY VANGUARD
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-6xl font-heading font-bold uppercase tracking-tight leading-[0.85] mb-8">
                  Shape The<br/>
                  <span className="italic font-light text-primary-foreground/60">Future</span>
                </h2>
                <p className="text-lg font-light text-primary-foreground/70 leading-relaxed mb-12 max-w-md">
                  Whether you are liquidating a premium asset or searching for your next architectural legacy, our team is ready to advise.
                </p>
                <div className="flex flex-col gap-4">
                  <Link href="/create" className="group flex items-center justify-between p-6 border border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                    <span className="text-lg font-heading font-bold uppercase">Register New Asset</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link href="/properties" className="group flex items-center justify-between p-6 border border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                    <span className="text-lg font-heading font-bold uppercase">Begin Acquisition</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square border-2 border-primary-foreground/20 p-10 flex flex-col justify-center items-center text-center group"
              >
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary-foreground/30" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary-foreground/30" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary-foreground/30" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary-foreground/30" />
                
                <h3 className="text-4xl font-heading font-bold uppercase mb-6">Nestwell</h3>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground/60 mb-10">Luxury Estate Management</p>
                <div className="h-16 w-px bg-primary-foreground/20 group-hover:h-20 transition-all duration-300" />
                <div className="mt-10 text-sm font-light text-primary-foreground/40 tracking-widest uppercase">Est. 2026</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}