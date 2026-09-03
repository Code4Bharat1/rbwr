"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { formatNumber } from "@/lib/format";

export function StatCounter({
  value,
  suffix = "+",
  label,
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatNumber(Math.floor(latest));
    });
  }, [spring]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="font-display text-4xl font-semibold text-navy sm:text-5xl">
        <span ref={ref}>0</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}
