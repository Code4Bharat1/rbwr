"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slides } from "@/lib/presentation-slides";

export default function PresentationPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const next = useCallback(() => setIndex((i) => Math.min(slides.length - 1, i + 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, router]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy-gradient text-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient text-navy-deep">
            <Trophy className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold">RBWR Presentation</span>
        </Link>
        <Link href="/" className="rounded-full p-2 hover:bg-white/10" aria-label="Exit presentation">
          <X className="h-5 w-5" />
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 sm:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.number}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-2xl text-center"
          >
            <p className="font-mono text-sm tracking-[0.3em] text-gold-soft">{slide.number} / {slides.length}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{slide.title}</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{slide.description}</p>
            <Button asChild size="lg" className="mt-8 bg-gold-gradient text-navy-deep hover:opacity-90">
              <Link href={slide.href}>{slide.cta} →</Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="flex flex-col items-center gap-4 px-6 pb-8 sm:px-10">
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold-soft" : "w-1.5 bg-white/25 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={prev} disabled={index === 0}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <p className="text-xs text-white/50">← Previous · → Next · Esc Exit</p>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={next} disabled={index === slides.length - 1}>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
