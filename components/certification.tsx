"use client";

import Image from "next/image";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { certification } from "@/lib/data";

export default function Certification() {
  return (
    <section id="certification" className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,var(--accent-soft),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certification"
          title="Verified professional credential."
          description="A recognized Microsoft credential that supports productivity, documentation, and workplace readiness."
        />

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6 }}
          className="surface-card mx-auto grid max-w-4xl gap-8 rounded-[2rem] p-7 backdrop-blur sm:p-9 md:grid-cols-[220px_1fr]"
        >
          <div className="flex items-center justify-center rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <Image src={certification.badge} alt="Microsoft Office Specialist Word Associate badge" width={160} height={160} />
          </div>
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              <BadgeCheck size={17} /> Verified Credential
            </div>
            <div className="flex items-start gap-4">
              <div className="hidden rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)] sm:block">
                <Award size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">{certification.title}</h3>
                <p className="mt-3 text-[var(--muted)]">{certification.issuer}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Issued {certification.issued}</p>
              </div>
            </div>
            <a
              href={certification.verification}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary mt-8 rounded-full"
            >
              Verify Credential <ExternalLink size={17} />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
