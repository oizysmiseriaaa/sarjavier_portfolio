"use client";

import { BadgeCheck, Code2, FileText, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/lib/data";

const icons = { Code2, FileText, PenTool, BadgeCheck };

export default function Skills() {
  return (
    <section id="skills" className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,var(--accent-soft),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A balanced toolkit for frontend work and professional delivery."
          description="Technical fundamentals, productivity tools, design support, and reliable working habits."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {skills.map((category) => {
            const Icon = icons[category.icon as keyof typeof icons] ?? Code2;
            return (
              <motion.article
                key={category.title}
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -8 }}
                className="soft-card group rounded-[1.75rem] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--border)]">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{category.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-sm text-[var(--muted)] transition group-hover:border-[var(--accent)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
