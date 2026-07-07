import type { ContactState } from "@/lib/contact";

export function contactFailure(message: string): ContactState {
  return { ok: false, message };
}
