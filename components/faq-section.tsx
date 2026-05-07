"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faqItems } from "@/static/faq";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function FAQSection() {
  const [expandedItemId, setExpandedItemId] = useState<string>("faq-1");

  return (
    <section className="bg-muted/5 py-12">
      <div className="mx-auto flex w-full max-w-5xl gap-6 px-6 flex-col md:flex-row">
        <div className="relative flex-1 h-152">
          <Image
            src="/bartosz.jpg"
            alt="Bartosz Buczkowski - Software Developer"
            width={1200}
            height={1794}
            className="md:absolute rounded-sm w-full h-full object-cover object-bottom iv"
          />

          <div className="absolute bottom-0 flex flex-col gap-4 p-10">
            <h2 className="text-5xl font-extrabold text-white">FAQ</h2>
            <p className="max-w-xl text-base text-muted dark:text-muted-foreground">
              Everything you may want to know about collaboration, development workflows, and how I help teams build and improve software
              products.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col">
            {faqItems.map((item) => {
              const isExpanded = expandedItemId === item.id;

              return (
                <div key={item.id} className="border-b border-border py-4 first:pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setExpandedItemId(isExpanded ? "" : item.id)}
                  >
                    <span className="max-w-full text-base leading-6 font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.question}
                    </span>

                    <ChevronDown
                      aria-hidden
                      className={cn("size-5 shrink-0 text-muted-foreground transition-transform", {
                        "rotate-180": isExpanded,
                      })}
                    />
                  </Button>

                  <div
                    className={cn("pt-3 transition-all duration-600 overflow-hidden", {
                      "max-h-0": !isExpanded,
                      "max-h-64": isExpanded,
                    })}
                  >
                    <p className="text-sm leading-5 text-muted-foreground ml-3 mr-6">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
