"use client";

import { useState } from "react";
import { LEARN } from "@/lib/content";
import { submitForm } from "@/lib/submitForm";
import { SITE } from "@/lib/site";
import { Button } from "./ui";

/**
 * Newsletter sign-up, embedded rather than as a MailerLite pop-up so it works
 * without loading MailerLite's script on every page.
 *
 * With LEARN.newsletter.action set, the email posts straight to MailerLite.
 * Without it, the address goes to the site's own Netlify form ("newsletter")
 * so nothing is lost while the URL is being sorted out.
 */
export default function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("bot-field")) return;
    const email = String(fd.get("email") ?? "");

    setState("sending");
    try {
      const action = LEARN.newsletter.action;
      if (action) {
        const body = new FormData();
        body.set("fields[email]", email);
        body.set("ml-submit", "1");
        body.set("anticsrf", "true");
        // MailerLite's endpoint doesn't send CORS headers, so the response is
        // opaque. A resolved fetch is the only signal we get.
        await fetch(action, { method: "POST", body, mode: "no-cors" });
      } else {
        await submitForm("newsletter", { email });
      }
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p
        role="status"
        className={`mt-6 rounded-sm border px-4 py-3.5 text-[0.9rem] ${
          dark
            ? "border-gold/40 bg-gold/12 text-cream"
            : "border-gold-deep/35 bg-gold/12"
        }`}
      >
        You&apos;re in. The next letter will find you.
      </p>
    );
  }

  const field = dark
    ? "border-cream/25 bg-cream/8 text-cream placeholder:text-cream/45 focus:border-gold"
    : "border-forest/25 bg-white placeholder:text-ink-soft/55 focus:border-forest";

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
      <p hidden aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className={`min-h-[44px] flex-1 rounded-sm border px-4 py-3 text-[0.94rem] focus:outline-none focus-visible:outline-2 focus-visible:outline-gold ${field}`}
        />
        <Button type="submit" variant={dark ? "gold" : "solid"} disabled={state === "sending"}>
          {state === "sending" ? "Adding…" : LEARN.newsletter.cta}
        </Button>
      </div>

      {state === "error" && (
        <p role="alert" className={`text-[0.85rem] ${dark ? "text-gold" : "text-[#8f2f16]"}`}>
          That didn&apos;t send. Try again, or email {SITE.email} directly.
        </p>
      )}
    </form>
  );
}
