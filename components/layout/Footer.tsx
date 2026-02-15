"use client";

import { Mail, ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Welcome to the inner circle.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -bottom-20 -right-20 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter leading-none">
        N
      </div>

      <div className="container relative z-10 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link
              href="/"
              className="group flex items-center gap-4 w-fit"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-accent text-accent-foreground">
                <span className="text-xl font-heading font-black">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black font-heading tracking-[0.2em] uppercase leading-none">
                  Nestwell
                </span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary-foreground/70 mt-1">
                  Luxury Estates
                </span>
              </div>
            </Link>
            
            <p className="text-primary-foreground/80 max-w-sm text-base leading-relaxed">
              Defining the next generation of home ownership. From minimalist urban retreats to sprawling coastal sanctuaries. 
              Our directory is curated for the architectural connoisseur.
            </p>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">The Inner Circle</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-0 group border-b-2 border-primary-foreground/30 focus-within:border-accent transition-colors duration-300 pb-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="border-0 rounded-none h-12 bg-transparent focus-visible:ring-0 px-0 text-sm font-semibold tracking-wider uppercase placeholder:text-primary-foreground/40 text-primary-foreground"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-12 flex items-center justify-center group/btn"
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 animate-spin border-2 border-accent border-t-transparent" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-accent group-hover/btn:translate-x-1 transition-transform duration-300 ease-out" />
                  )}
                </button>
              </form>
            </div>

            <div className="flex gap-6">
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"><Instagram className="h-5 w-5" /></Link>
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"><Twitter className="h-5 w-5" /></Link>
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {/* Browse Column */}
            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Directory</h3>
              <ul className="space-y-5">
                {[
                  { label: "All Estates", href: "/properties" },
                  { label: "Modern Houses", href: "/properties?type=house" },
                  { label: "Penthouse", href: "/properties?type=apartment" },
                  { label: "Waterfront", href: "/properties?type=land" },
                  { label: "Urban Retreats", href: "/properties?type=condo" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all duration-300 ease-out"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Partnerships Column */}
            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Agency</h3>
              <ul className="space-y-5">
                {[
                  { label: "Become an Agent", href: "/pricing" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Estate Management", href: "/dashboard/listings" },
                  { label: "Client Inquiries", href: "/dashboard/leads" },
                  { label: "Private Advisory", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all duration-300 ease-out"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legals Column */}
            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Legals</h3>
              <ul className="space-y-5">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Acquisition Advisory", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all duration-300 ease-out"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50" suppressHydrationWarning>
            © {new Date().getFullYear()} NESTWELL GLOBAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Geneva</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Dubai</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">London</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Tokyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}