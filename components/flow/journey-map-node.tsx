"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JourneyNode } from "@/lib/journey";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { cn } from "@/lib/utils";

export function JourneyMapNode({
  node,
  onNavigate,
  className,
}: {
  node: JourneyNode;
  onNavigate?: () => void;
  className?: string;
}) {
  const visited = useDemoStore((s) => s.visitedJourneyNodes.includes(node.id));
  const markVisited = useDemoStore((s) => s.markJourneyNodeVisited);

  return (
    <Link
      href={node.href}
      onClick={() => {
        markVisited(node.id);
        onNavigate?.();
      }}
      className={cn(
        "group flex items-start gap-3 rounded-xl border p-4 transition-colors hover:border-royal hover:bg-royal/5",
        visited ? "border-royal/30 bg-royal/[0.03]" : "border-border bg-card",
        className
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
          visited ? "bg-royal text-white" : "bg-secondary text-secondary-foreground"
        )}
      >
        {node.step}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-1.5 font-medium text-navy">
          {node.title}
          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{node.description}</span>
      </span>
    </Link>
  );
}
