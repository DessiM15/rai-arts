"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";
import { Button } from "./ui";

export default function WaitlistForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("bot-field")) return; // honeypot tripped

    setState("sending");
    try {
      await submitForm("online-waitlist", {
        email: String(fd.get("email") ?? ""),
      });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p
        role="status"
        className="mt-6 rounded-sm border border-gold-deep/35 bg-gold/12 px-4 py-3.5 text-[0.9rem]"
      >
        You&apos;re on the list. We&apos;ll email you when enrolment opens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
      <p hidden aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@school.edu"
          className="min-h-[44px] flex-1 rounded-sm border border-forest/25 bg-white px-4 py-3 text-[0.94rem] placeholder:text-ink-soft/55 focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-deep"
        />
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Adding…" : "Join the list"}
        </Button>
      </div>

      {state === "error" && (
        <p role="alert" className="text-[0.85rem] text-[#8f2f16]">
          That didn&apos;t send. Try again, or email hello@raiarts.com directly.
        </p>
      )}
    </form>
  );
}
