"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";
import { SITE } from "@/lib/site";
import { Button } from "./ui";

const FIELD =
  "min-h-[44px] w-full rounded-sm border border-forest/25 bg-white px-4 py-3 text-[0.94rem] placeholder:text-ink-soft/55 focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-deep";
const LABEL = "font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft";

const INTERESTS = [
  "A single workshop",
  "A pillar series",
  "The full capstone",
  "Not sure yet — let's talk",
  "Something else",
];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("bot-field")) return;

    setState("sending");
    try {
      await submitForm("workshop-enquiry", {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        institution: String(fd.get("institution") ?? ""),
        role: String(fd.get("role") ?? ""),
        timeframe: String(fd.get("timeframe") ?? ""),
        interest: String(fd.get("interest") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="rounded-sm border border-gold-deep/35 bg-gold/12 p-8"
      >
        <h2 className="font-display-sm text-[length:var(--text-step-1)]">
          Thank you — that came through.
        </h2>
        <p className="mt-3 max-w-[48ch] text-ink-soft">
          Kira will get back to you within a couple of days. If it&apos;s
          urgent, email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p hidden aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={LABEL}>
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="institution" className={LABEL}>
            School or organization
          </label>
          <input
            id="institution"
            name="institution"
            autoComplete="organization"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className={LABEL}>
            Your role
          </label>
          <input
            id="role"
            name="role"
            placeholder="Department chair, faculty, student…"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeframe" className={LABEL}>
            Timeframe
          </label>
          <input
            id="timeframe"
            name="timeframe"
            placeholder="Spring semester, April, flexible…"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="interest" className={LABEL}>
            What you&apos;re after
          </label>
          <select id="interest" name="interest" className={FIELD} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Class year, group size, what you'd like students to walk away with…"
          className={`${FIELD} min-h-[130px] resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-[0.8rem] text-ink-soft">
          Or email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-4"
          >
            {SITE.email}
          </a>
        </p>
      </div>

      {state === "error" && (
        <p role="alert" className="text-[0.85rem] text-[#8f2f16]">
          That didn&apos;t send. Please try again, or email {SITE.email}{" "}
          directly.
        </p>
      )}
    </form>
  );
}
