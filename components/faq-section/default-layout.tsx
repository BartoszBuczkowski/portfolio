"use client";

import { FaqSectionAside } from "./aside";
import { FaqSectionList } from "./list";

export function FaqSectionDefaultLayout() {
  return (
    <section id="faq" className="scroll-mt-24 bg-muted/5 py-12">
      <div className="mx-auto flex w-full max-w-5xl gap-6 px-6 flex-col md:flex-row">
        <FaqSectionAside />
        <FaqSectionList />
      </div>
    </section>
  );
}
