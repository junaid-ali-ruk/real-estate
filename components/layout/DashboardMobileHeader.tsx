"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardMobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-sidebar sticky top-0 z-50">
      <h2 className="font-heading font-bold uppercase tracking-widest text-lg">
        Dashboard
      </h2>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px]">
          <DashboardSidebar
            className="w-full border-r-0 h-full"
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
