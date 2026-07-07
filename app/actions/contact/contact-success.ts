import type { ContactState } from "@/lib/contact";

export function contactSuccess(message: string): ContactState {
  return { ok: true, message };
}
