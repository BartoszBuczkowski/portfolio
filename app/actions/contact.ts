"use server";

export type ContactState = { ok: boolean; message: string };

export async function submitContact(formData: FormData): Promise<ContactState> {
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const message = formData.get("message")?.toString() ?? "";

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  // Placeholder: integrate with Resend, Nodemailer, or your API here.
  await new Promise((r) => setTimeout(r, 500));

  return { ok: true, message: "Thanks! Your message has been sent." };
}
