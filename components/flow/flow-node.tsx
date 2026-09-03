"use client";

import Link from "next/link";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { cn } from "@/lib/utils";

export function FlowNode({
  id,
  label,
  href,
  variant = "default",
  className,
}: {
  id: string;
  label: string;
  href: string;
  variant?: "default" | "accent" | "success" | "critical";
  className?: string;
}) {
  const visited = useDemoStore((s) => s.visitedJourneyNodes.includes(id));
  const markVisited = useDemoStore((s) => s.markJourneyNodeVisited);

  const variants = {
    default: "border-royal/30 bg-card text-navy hover:border-royal hover:bg-royal/5",
    accent: "border-gold/40 bg-gold/10 text-gold-deep hover:bg-gold/20",
    success: "border-verified/40 bg-verified/10 text-verified hover:bg-verified/20",
    critical: "border-live/40 bg-live/10 text-live hover:bg-live/20",
  };

  return (
    <Link
      href={href}
      onClick={() => markVisited(id)}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border-2 px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        variants[variant],
        visited && "ring-2 ring-gold/50",
        className
      )}
    >
      {label}
    </Link>
  );
}
