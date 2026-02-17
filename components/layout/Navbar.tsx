"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Heart, Menu, User, X, Box } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center border border-primary bg-primary overflow-hidden">
              <span className="text-primary-foreground font-heading font-black text-xl">
                N
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-heading tracking-[0.2em] uppercase leading-none">
                Nestwell
              </span>
              <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-primary/60 mt-1">
                Luxury Estates
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/properties"
              className="px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors group relative"
            >
              Collection
              <span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                className="px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground group relative"
              >
                Dashboard
                <span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link
                href="/create"
                className="px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary hover:text-primary group relative"
              >
                Create
                <span className="absolute bottom-1 left-5 right-5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            </SignedIn>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <SignedIn>
            <Link
              href="/saved"
              className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-all"
            >
              <Heart className="h-4 w-4" />
            </Link>
            <Link
              href="/profile"
              className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-all"
            >
              <User className="h-4 w-4" />
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
              <Button
                variant="ghost"
                size="sm"
                className="text-[10px] font-black uppercase tracking-[0.2em] px-6"
              >
                Entry
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="text-[10px] font-black uppercase tracking-[0.2em] px-8 rounded-none bg-primary text-primary-foreground"
              >
                Join
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

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
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] border-l border-border/50 p-0"
            >
              <div className="flex flex-col h-full bg-background">
                <nav className="flex flex-col p-8 gap-1">
                  <Link
                    href="/properties"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-6 border-b border-border/10 group"
                  >
                    <span className="text-lg font-heading font-bold uppercase tracking-widest italic">
                      Browse Properties
                    </span>
                    <Box className="h-5 w-5" />
                  </Link>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-6 border-b border-border/10 group"
                    >
                      <span className="text-lg font-heading font-bold uppercase tracking-widest italic">
                        Dashboard
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
                  </SignedIn>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
