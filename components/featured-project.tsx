"use client";

import Image from "next/image";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { featuredProject } from "@/lib/data";

export default function FeaturedProject() {
  return (
    <section className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--accent-soft),transparent_38%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Project"
          title="A focused academic project with a professional presentation."
          description="Highlighted first for recruiters and coordinators who want a quick view of project ownership and practical learning."
        />

        <motion.article
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75 }}
          whileHover={{ y: -6 }}
          className="surface-card grid overflow-hidden rounded-[2rem] backdrop-blur lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative min-h-[310px] overflow-hidden bg-[var(--surface-elevated)]">
            <Image
              src={featuredProject.image}
              alt={`${featuredProject.title} project screenshot`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] backdrop-blur">
              <Star size={16} className="text-[var(--accent)]" />
              Featured
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {featuredProject.label}
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">{featuredProject.title}</h3>
            <p className="mt-5 leading-8 text-[var(--muted)]">{featuredProject.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {featuredProject.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1.5 text-sm text-[var(--foreground)]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary rounded-full"
              >
                <GitBranch size={18} /> GitHub Repository
              </a>
              <a
                href={featuredProject.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                View Project <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
