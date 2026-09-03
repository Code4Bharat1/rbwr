"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ShareButton({ title }: { title: string }) {
  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast("Copy this page's URL to share it");
    }
  }

  return (
    <Button variant="outline" className="gap-2" onClick={share}>
      <Share2 className="h-4 w-4" /> Share
    </Button>
  );
}
