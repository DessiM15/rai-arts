/**
 * Netlify Forms submission.
 *
 * Netlify's build bot only finds forms declared in static HTML, so the shapes
 * live in /public/__forms.html and every live form POSTs back to that path.
 * See that file before changing any field name.
 */
export async function submitForm(
  formName: string,
  data: Record<string, string>,
): Promise<void> {
  const body = new URLSearchParams({ "form-name": formName, ...data });

  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}
