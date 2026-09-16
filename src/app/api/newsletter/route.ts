import { NextResponse } from "next/server";

/**
 * Newsletter sign-up → MailerLite.
 *
 * The MailerLite API token is a secret, so the browser never sees it: the
 * form posts here, and this route adds the subscriber server-side. The token
 * lives in the MAILERLITE_API_KEY environment variable (set on Vercel and in
 * .env.local; never committed).
 */
export async function POST(req: Request) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Newsletter is not configured." }, { status: 500 });
  }

  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown; source?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    // fall through to the validation error below
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, status: "active" }),
  });

  // 200 = already subscribed and updated, 201 = newly added.
  if (res.status !== 200 && res.status !== 201) {
    const detail = await res.text().catch(() => "");
    console.error("MailerLite rejected the sign-up", res.status, detail);
    return NextResponse.json({ error: "That didn't go through." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
