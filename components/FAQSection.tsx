"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/static/faq";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  const [expandedItemId, setExpandedItemId] = useState<string>("faq-4");

  return (
    <section className="bg-muted/35 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-[36px] leading-[44px] tracking-[-0.02em] font-extrabold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl text-base leading-6 text-muted-foreground">
            Can&apos;t able to find answers you&apos;re looking for?
            <br />
            Reach out to our{" "}
            <a
              href="#"
              className="text-accent-violet transition-colors hover:text-accent-blue"
            >
              customer support
            </a>{" "}
            team.
          </p>
        </div>

        <div className="flex flex-col">
          {faqItems.map((item) => {
            const isExpanded = expandedItemId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-border py-4 first:pt-4"
              >
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => setExpandedItemId(isExpanded ? "" : item.id)}
                >
                  <span className="max-w-[358px] text-base leading-6 font-medium text-foreground">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </Button>

                {isExpanded && item.answer && (
                  <div className="pt-3">
                    <p className="text-sm leading-5 text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
