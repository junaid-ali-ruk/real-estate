"use client";

import {
  Protect,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Heart, LayoutDashboard, Menu, User, X, Box } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { hasActiveSubscription } from "@/lib/clerk/plans";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable sticky header on pricing page to prevent z-index conflicts with Clerk's PricingTable
  const isPricingPage = pathname === "/pricing";

  return (
    <header
      className={
        isPricingPage
          ? "w-full border-b border-border/50 bg-background"
          : `sticky top-0 z-50 w-full transition-all duration-500 ${
              scrolled 
                ? "border-b border-border/50 bg-background/80 backdrop-blur-xl py-2" 
                : "bg-transparent py-4"
            }`
      }
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <motion.div 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-10 w-10 items-center justify-center border border-primary bg-primary overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-primary-foreground font-heading font-black text-xl"
              >
                N
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-accent/20 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-heading tracking-[0.2em] uppercase leading-none">
                Nestwell
              </span>
              <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-primary/60 mt-1">
                Luxury Estates
              </span>
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {[
              { label: "Collection", href: "/properties" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </Link>
            ))}
            <SignedIn>
              <Protect
                fallback={
                  <Link
                    href="/pricing"
                    className="relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  >
                    Partnerships
                    <motion.span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </Link>
                }
              >
                <div className="flex items-center gap-1">
                  <Link
                    href="/dashboard"
                    className="relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  >
                    dashboard
                    <motion.span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </Link>
                  <Link
                    href="/create"
                    className="relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary hover:text-primary transition-colors duration-300 group"
                  >
                    Create
                    <motion.span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </Link>
                </div>
              </Protect>
            </SignedIn>
            <SignedOut>
              <Link
                href="/pricing"
                className="relative px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                Partnerships
                <motion.span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </SignedOut>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <SignedIn>
            <Link
              href="/saved"
              aria-label="Saved properties"
              className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/profile"
              aria-label="My profile"
              className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
            >
              <User className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="ml-4 pl-6 border-l border-border/50">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-none border border-border/50",
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] px-6">
                Entry
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] px-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20">
                Join
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-4">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 rounded-none border border-border/50",
                },
              }}
            />
          </SignedIn>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-12 w-12 border border-border/20"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] border-l border-border/50 p-0 overflow-hidden"
            >
              <div className="flex flex-col h-full bg-background">
                <SheetHeader className="p-8 border-b border-border/20">
                  <SheetTitle className="flex items-center gap-3 text-left">
                    <div className="h-8 w-8 bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-heading font-black text-sm">N</span>
                    </div>
                    <span className="font-heading font-black tracking-widest uppercase">Nestwell</span>
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col p-8 gap-1"
                  aria-label="Mobile navigation"
                >
                  {[
                    { label: "Browse Properties", href: "/properties", icon: Box },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-6 border-b border-border/10 group"
                    >
                      <span className="text-lg font-heading font-bold uppercase tracking-widest group-hover:text-primary transition-colors italic">
                        {item.label}
                      </span>
                      <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                  <SignedIn>
                    <Protect
                      fallback={
                        <Link
                          href="/pricing"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-6 border-b border-border/10 group"
                        >
                          <span className="text-lg font-heading font-bold uppercase tracking-widest group-hover:text-primary transition-colors italic">
                            Become an Agent
                          </span>
                        </Link>
                      }
                    >
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-6 border-b border-border/10 group"
                        >
                          <span className="text-lg font-heading font-bold uppercase tracking-widest group-hover:text-primary transition-colors italic">
                            Agent Dashboard
                          </span>
                        </Link>
                        <Link
                          href="/create"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-6 border-b border-border/10 group"
                        >
                          <span className="text-lg font-heading font-bold uppercase tracking-widest text-primary italic">
                            Create Property
                          </span>
                        </Link>
                      </>
                    </Protect>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/pricing"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-6 border-b border-border/10 group"
                    >
                      <span className="text-lg font-heading font-bold uppercase tracking-widest group-hover:text-primary transition-colors italic">
                        Become an Agent
                      </span>
                    </Link>
                  </SignedOut>
                  
                  <div className="mt-auto pt-12 flex flex-col gap-4">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full rounded-none h-14 font-black uppercase tracking-widest border-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button
                          className="w-full rounded-none h-14 font-black uppercase tracking-widest"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
