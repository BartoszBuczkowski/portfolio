export type FaqItem = {
  id: string;
  question: string;
  answer?: string;
  ctaLabel?: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  },
  {
    id: "faq-2",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  },
  {
    id: "faq-3",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  },
  {
    id: "faq-4",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer: "This is subtext which appears after expanding the accordion.",
    ctaLabel: "Button CTA",
  },
  {
    id: "faq-5",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  },
];
