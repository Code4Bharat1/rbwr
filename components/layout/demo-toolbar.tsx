"use client";

import Link from "next/link";
import { LayoutGrid, MonitorPlay, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { useMounted } from "@/hooks/use-mounted";
import { ROLE_LABELS } from "@/lib/types";
import { toast } from "sonner";

export function DemoToolbar() {
  const mounted = useMounted();
  const viewerRole = useDemoStore((s) => s.viewerRole);
  const resetDemoState = useDemoStore((s) => s.resetDemoState);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-navy-gradient text-gold-soft shadow-lg hover:opacity-90"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-72">
          <p className="text-sm font-semibold text-navy">Demo Control Center</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {viewerRole ? `Viewing as ${ROLE_LABELS[viewerRole]}` : "Not signed in — public visitor view"}
          </p>
          <Separator className="my-3" />
          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/sign-in">
                <Sparkles className="h-4 w-4" /> Switch role / dummy sign in
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/platform-flow">
                <LayoutGrid className="h-4 w-4" /> Platform Flow diagram
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/presentation">
                <MonitorPlay className="h-4 w-4" /> Presentation Mode
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 text-live"
              onClick={() => {
                resetDemoState();
                toast("Demo state reset");
              }}
            >
              <RotateCcw className="h-4 w-4" /> Reset demo state
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
