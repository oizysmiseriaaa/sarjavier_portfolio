"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, GitBranch, Mail, Network, Phone, Send, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { owner } from "@/lib/constants";
import { availability, socials } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

type ContactApiResponse = {
  success: boolean;
  message: string;
};

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email.includes("@") || message.length < 10) {
      setStatus("error");
      setStatusMessage("Please enter a valid name, email, and message.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setStatusMessage(data.message || "Failed to send message.");
        return;
      }

      formElement.reset();
      setStatus("success");
      setStatusMessage(data.message);
    } catch {
      setStatus("error");
      setStatusMessage("Failed to send message.");
    }
  };

  const linkedIn = socials.find((social) => social.label === "LinkedIn")?.href ?? "#";
  const github = socials.find((social) => social.label === "GitHub")?.href ?? "#";

  return (
    <section id="contact" className="section-bg relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,var(--accent-soft),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Ready for internships, projects, and professional conversations."
          description="Reach out for internship coordination, entry-level opportunities, collaboration, or freelance website work."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="surface-card rounded-[2rem] p-7 backdrop-blur"
          >
            <h3 className="text-2xl font-semibold text-[var(--foreground)]">Available For</h3>
            <div className="mt-5 grid gap-3">
              {availability.map((item) => (
                <div key={item} className="soft-card flex items-center gap-3 rounded-2xl p-4 text-[var(--muted)]">
                  <CheckCircle2 size={18} className="text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Email</p>
              <a href={`mailto:${owner.email}`} className="mt-2 inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)]">
                <Mail size={18} /> {owner.email}
              </a>
            </div>
            <div className="mt-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Phone</p>
              <a href={`tel:${owner.phone}`} className="mt-2 inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)]">
                <Phone size={18} /> {owner.phone}
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="button-primary flex-1 rounded-full">
                <Network size={17} /> LinkedIn
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)]">
                <GitBranch size={17} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="surface-card rounded-[2rem] p-7 backdrop-blur"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                Name
                <input name="name" autoComplete="name" className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                Email
                <input name="email" type="email" autoComplete="email" className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-medium text-[var(--foreground)]">
              Message
              <textarea name="message" rows={6} className="resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]" placeholder="Tell me about the opportunity or project." />
            </label>

            {status === "success" ? (
              <p className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <CheckCircle2 size={18} /> {statusMessage || "Message sent successfully."}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-5 flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
                <XCircle size={18} /> {statusMessage || "Failed to send message."}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="button-primary button-full mt-6 rounded-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"} <Send size={17} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
