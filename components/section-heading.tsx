"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
