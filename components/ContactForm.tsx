"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitContact, type ContactState } from "@/app/actions/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [state, setState] = useState<ContactState | null>(null);

  const form = useForm<ContactValues>({
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const issues = parsed.error.issues;
      for (const issue of issues) {
        const path = issue.path[0] as keyof ContactValues;
        if (path) form.setError(path, { message: issue.message });
      }
      return;
    }
    const { name, email, message } = parsed.data;
    const fd = new FormData();
    fd.set("name", name);
    fd.set("email", email);
    fd.set("message", message);
    const result = await submitContact(fd);
    setState(result);
    if (result.ok) form.reset();
  }

  return (
    <section id="contact" className={cn("py-24 px-6", className)} {...props}>
      <div className="mx-auto max-w-lg">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground">
          Contact
        </h2>
        <div
          className={cn(
            "rounded-2xl border border-white/20 bg-white/70 p-6 shadow-[0_0_40px_-8px_var(--glow-violet)] backdrop-blur-xl",
            "focus-within:ring-2 focus-within:ring-accent-violet/20",
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="border-border focus-visible:ring-accent-violet/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="border-border focus-visible:ring-accent-violet/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Your message..."
                        rows={4}
                        className={cn(
                          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none",
                          "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "focus-visible:border-accent-violet focus-visible:ring-accent-violet/30",
                          "disabled:pointer-events-none disabled:opacity-50 md:text-sm",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state && (
                <p
                  className={cn(
                    "text-sm",
                    state.ok ? "text-accent-violet" : "text-destructive",
                  )}
                >
                  {state.message}
                </p>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-accent-violet text-white hover:bg-accent-violet/90 focus-visible:ring-accent-violet/50"
              >
                {form.formState.isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
