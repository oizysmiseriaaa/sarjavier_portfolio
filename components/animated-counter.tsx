"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className="soft-card rounded-2xl p-4 text-center backdrop-blur"
    >
      <div className="text-2xl font-semibold text-[var(--foreground)]">
        {display}
        {suffix}
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
    </motion.div>
  );
}
