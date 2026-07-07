import type { ReactNode } from "react";

export type FooterContactCtaState = {
  email: string;
  footerError: string | null;
  open: boolean;
  modalEmail: string;
};

export type FooterContactCtaActions = {
  setEmail: (value: string) => void;
  tryOpenModal: () => void;
  setOpen: (open: boolean) => void;
};

export type FooterContactCtaMeta = {
  formId: string;
};

export type FooterContactCtaContextValue = {
  state: FooterContactCtaState;
  actions: FooterContactCtaActions;
  meta: FooterContactCtaMeta;
};

export type FooterContactCtaRootProps = {
  children?: ReactNode;
};
