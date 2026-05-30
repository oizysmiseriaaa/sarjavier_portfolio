"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { owner } from "@/lib/constants";
import { profileCards, timeline } from "@/lib/data";

export default function Profile() {
  return (
    <section id="about" className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_55%,var(--accent-soft),transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Career-ready, practical, and focused on useful digital work."
          description="My work sits at the intersection of web development, system management, business technology, and clear digital communication."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="surface-card rounded-[2rem] p-6 backdrop-blur"
          >
            <div className="grid gap-4">
              {[
                { icon: GraduationCap, label: "Education", value: owner.education },
                { icon: GraduationCap, label: "Institution", value: owner.institution },
                { icon: BriefcaseBusiness, label: "Level", value: owner.yearLevel },
                { icon: MapPin, label: "Location", value: owner.location },
              ].map((item) => (
                <div key={item.label} className="soft-card rounded-3xl p-5">
                  <item.icon className="mb-4 text-[var(--accent)]" size={24} />
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{item.label}</p>
                  <p className="mt-2 font-medium text-[var(--foreground)]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {profileCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="soft-card rounded-[1.75rem] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{card.title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="soft-card relative rounded-[1.75rem] p-6"
            >
              <div className="mb-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {item.label}
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
