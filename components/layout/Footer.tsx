"use client";

import { Mail, ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Welcome to the inner circle.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute -bottom-20 -right-20 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter leading-none">N</div>
      <div className="container relative z-10 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="group flex items-center gap-4 w-fit">
              <div className="flex h-12 w-12 items-center justify-center bg-accent text-accent-foreground"><span className="text-xl font-heading font-black">N</span></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black font-heading tracking-[0.2em] uppercase leading-none">Nestwell</span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary-foreground/70 mt-1">Luxury Estates</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm text-base leading-relaxed">Defining the next generation of home ownership. Our directory is curated for the architectural connoisseur.</p>
            <div className="flex gap-6">
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></Link>
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
               <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Directory</h3>
              <ul className="space-y-5">
                {[{ label: "All Estates", href: "/properties" }, { label: "Modern Houses", href: "/properties?type=house" }, { label: "Penthouse", href: "/properties?type=apartment" }].map((item) => (
                  <li key={item.label}><Link href={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all">{item.label}</Link></li>
                ))}
              </ul>
            </nav>

            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Agency</h3>
              <ul className="space-y-5">
                <SignedIn>
                  <li><Link href="/dashboard" className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all">Dashboard</Link></li>
                  <li><Link href="/dashboard/listings" className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all">Estate Management</Link></li>
                  <li><Link href="/create" className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all text-accent">Register New Asset</Link></li>
                </SignedIn>
                <SignedOut>
                  <li><Link href="/sign-up" className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all">Join the Vanguard</Link></li>
                </SignedOut>
              </ul>
            </nav>

            <nav className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Legals</h3>
              <ul className="space-y-5">
                {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }].map((item) => (
                  <li key={item.label}><Link href={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground hover:pl-2 transition-all">{item.label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
