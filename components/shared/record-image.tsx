"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecordImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(!src);

  if (errored || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-navy-gradient text-gold-soft",
          className
        )}
      >
        <Trophy className="h-10 w-10 opacity-70" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
