"use client";

import { FooterContactCtaDialog } from "./dialog";
import { FooterContactCtaEmailField } from "./email-field";
import { FooterContactCtaError } from "./error";
import { FooterContactCtaSubmit } from "./submit";

export function FooterContactCtaDefaultLayout() {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <FooterContactCtaEmailField />
        <FooterContactCtaSubmit />
      </div>
      <FooterContactCtaError />
      <FooterContactCtaDialog />
    </>
  );
}
