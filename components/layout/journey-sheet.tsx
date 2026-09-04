"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { journeyNodes } from "@/lib/journey";
import { JourneyMapNode } from "@/components/flow/journey-map-node";
import Link from "next/link";

export function JourneySheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
        <Compass className="h-4 w-4" />
        <span className="hidden sm:inline">Explore Prototype</span>
      </Button>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">The Complete RBWR Journey</SheetTitle>
          <SheetDescription>
            Every stage of the record lifecycle, from public discovery to certificate. Click any
            step to jump straight to that screen.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4 pb-6">
          {journeyNodes.map((node) => (
            <JourneyMapNode key={node.id} node={node} onNavigate={() => setOpen(false)} />
          ))}
          <Link
            href="/platform-flow"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl border border-dashed border-royal/40 p-4 text-center text-sm font-medium text-royal hover:bg-royal/5"
          >
            View as a full interactive diagram →
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
