"use client";

import Image from "next/image";
import { ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,var(--accent-soft),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work built around real use cases."
          description="A focused collection of web projects showing presentation, layout, interaction, and problem-solving growth."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
              className="soft-card group overflow-hidden rounded-[1.75rem] backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <div className="relative h-60 overflow-hidden bg-[var(--surface-elevated)]">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">{project.title}</h3>
                <p className="mt-3 min-h-24 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs text-[var(--muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary flex-1 rounded-full"
                  >
                    <ExternalLink size={17} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
                  >
                    <GitBranch size={17} /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
