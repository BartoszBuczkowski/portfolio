import { FooterContactCtaDialog } from "./dialog";
import { FooterContactCtaEmailField } from "./email-field";
import { FooterContactCtaError } from "./error";
import { FooterContactCtaRoot } from "./root";
import { FooterContactCtaSubmit } from "./submit";

export const FooterContactCta = Object.assign(FooterContactCtaRoot, {
  EmailField: FooterContactCtaEmailField,
  Submit: FooterContactCtaSubmit,
  Error: FooterContactCtaError,
  Dialog: FooterContactCtaDialog,
});
