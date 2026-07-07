import { z } from "zod";

export function createContactSchema(tv: (key: string) => string) {
  return z.object({
    name: z.string().trim().min(2, tv("nameMin")),
    email: z.email(tv("emailInvalid")),
    message: z.string().trim().min(10, tv("messageMin")),
  });
}
