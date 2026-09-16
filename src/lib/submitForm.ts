/**
 * Contact and waitlist submissions go to Web3Forms, which emails them to the
 * address the access key is registered to (Kira's). The access key is meant to
 * be public: Web3Forms binds it to a destination address only, so it can't be
 * used to read anything or to send mail anywhere else.
 *
 * `formName` becomes the email subject so the two forms are easy to tell apart
 * in the inbox.
 */
const WEB3FORMS_ACCESS_KEY = "c34a75bd-2a59-459e-8782-b6a1be239353";

export async function submitForm(
  formName: string,
  data: Record<string, string>,
): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Rai Arts website: ${formName}`,
      from_name: "Rai Arts website",
      ...data,
    }),
  });

  const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!res.ok || !json?.success) {
    throw new Error(`Submission failed (${res.status})`);
  }
}
