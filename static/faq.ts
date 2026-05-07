export type FaqItem = {
  id: string;
  question: string;
  answer?: string;
  ctaLabel?: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer:
      "I provide software development and technical consulting services focused on modern web applications, product development, system modernization, and AI-assisted engineering workflows.",
  },
  {
    id: "faq-2",
    question: "Do you work only as a frontend developer?",
    answer:
      "Frontend engineering is my main specialization, particularly in React and TypeScript, but I also work across backend services, architecture decisions, product development, and technical consulting.",
  },
  {
    id: "faq-3",
    question: "Can you help with existing projects?",
    answer:
      "Yes. I often work with existing products, helping teams modernize codebases, improve maintainability, optimize workflows, and deliver new features faster.",
  },
  {
    id: "faq-4",
    question: "What is AI-assisted development?",
    answer:
      "AI-assisted development means using modern AI tools to accelerate repetitive work, improve research and debugging, speed up prototyping, and reduce delivery time while maintaining engineering quality.",
  },
  {
    id: "faq-5",
    question: "Do you work with startups?",
    answer:
      "Yes. I enjoy working with startups, especially where fast iteration, pragmatic decisions, and rapid product delivery are important.",
  },
  {
    id: "faq-6",
    question: "Can you modernize legacy applications?",
    answer:
      "Yes. I have experience working with legacy systems and gradually modernizing them without interrupting ongoing business operations.",
  },
  {
    id: "faq-7",
    question: "Do you offer consulting services?",
    answer:
      "Yes. Besides implementation, I help teams make technical decisions related to architecture, scalability, modernization, workflows, and product development strategy.",
  },
];
