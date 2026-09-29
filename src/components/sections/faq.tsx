import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SectionHeader } from "./section-header";

const faqs = [
  {
    question: "Qu'est-ce qu'une estimation après sinistre?",
    answer:
      "C'est l'évaluation des dommages causés par un sinistre et des coûts associés à la réparation ou au remplacement des biens endommagés. Nos experts en assurances et en sinistres s'en servent pour déterminer le montant des indemnités à verser.",
  },
  {
    question: "Que comprend une estimation en ébénisterie?",
    answer:
      "Elle évalue le coût des travaux nécessaires pour réparer ou remplacer des meubles endommagés ou défectueux : matériaux, main-d'œuvre et, le cas échéant, démolition et reconstruction.",
  },
  {
    question:
      "Estimez-vous aussi des projets de construction et de rénovation?",
    answer:
      "Oui. Nous évaluons le coût total des travaux pour construire un bâtiment ou pour réparer et rénover un bâtiment existant, incluant les matériaux, la main-d'œuvre, la démolition et la reconstruction.",
  },
  {
    question: "Quelles sont vos formations et certifications?",
    answer:
      "Notre équipe détient la certification IICRC WRT et a suivi la formation avancée Xactimate, la formation Symbility ainsi que la formation sur l'amiante de la CNESST.",
  },
  {
    question: "Comment obtenir une estimation?",
    answer:
      "Remplissez le formulaire de contact en décrivant votre sinistre ou votre projet. Notre équipe communiquera avec vous pour en discuter.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="px-5 py-20 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-3xl reveal">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Vos questions, nos réponses"
          description="Tout ce qu'il faut savoir avant de demander une estimation."
        />

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-10 gap-1.5 rounded-xl bg-neutral-900/60 p-1.5"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="rounded-[11px] border-none bg-black px-4 sm:px-5"
            >
              <AccordionTrigger className="items-center gap-4 py-4 text-[15px] leading-snug text-white hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-neutral-400"
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-px w-3 rotate-90 bg-current transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-0" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-neutral-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Une autre question?{" "}
          <a
            href="#contact"
            className="rounded-sm font-medium text-mxl-blue-light underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Écrivez-nous
          </a>
        </p>
      </div>
    </section>
  );
}
