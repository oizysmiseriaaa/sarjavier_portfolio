"use client";

import Image from "next/image";
import { BadgeCheck, CalendarDays, FolderKanban, GitBranch, Mail, MapPin, Network } from "lucide-react";
import { motion } from "framer-motion";
import { owner } from "@/lib/constants";
import { socials } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";

export default function Hero() {
  const linkedIn = socials.find((social) => social.label === "LinkedIn")?.href ?? "#";
  const github = socials.find((social) => social.label === "GitHub")?.href ?? "#";

  return (
    <section id="home" className="section-bg pt-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="home-layout mx-auto max-w-5xl">
          <div className="home-avatar-frame">
            <Image
              src={owner.profileImage}
              alt="Portrait of Shean Anika Rojo Javier"
              width={150}
              height={150}
              priority
              className="home-avatar"
            />
          </div>

          <div className="min-w-0 md:self-center">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <h1 className="text-4xl font-semibold tracking-normal text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                {owner.name}
              </h1>
              <BadgeCheck size={21} className="text-[var(--accent)]" aria-label="Verified profile" />
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-base text-[var(--muted)] md:justify-start">
              <MapPin size={18} />
              {owner.location}
            </p>

            <p className="mt-6 text-lg font-medium leading-8 text-[var(--foreground)] sm:text-xl">
              Frontend Developer · IT Student · Aspiring Software Engineer
            </p>

            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              I build clean, user-focused web experiences while developing practical skills in web
              development, systems, business technology, and digital communication.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-action"
                aria-label="LinkedIn"
              >
                <Network size={20} strokeWidth={2.2} />
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-action"
                aria-label="GitHub"
              >
                <GitBranch size={20} strokeWidth={2.2} />
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="button-primary"
              >
                <FolderKanban size={17} />
                View Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="button-secondary"
              >
                <CalendarDays size={17} />
                Contact Me
              </button>
              <a
                href={`mailto:${owner.email}`}
                className="button-secondary"
              >
                <Mail size={17} />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
