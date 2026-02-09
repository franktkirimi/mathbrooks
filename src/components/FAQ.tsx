import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with startups, SMEs, and enterprise organisations across industries including agriculture, education, logistics, sports, mining, and finance. Whether you're building your first MVP or scaling an existing platform, we tailor our approach to your stage and needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects range from 6 to 14 weeks depending on complexity. A Starter MVP typically takes 4–6 weeks, a full Professional build runs 8–12 weeks, and Enterprise engagements are scoped individually. We provide clear timelines during the Discovery phase.",
  },
  {
    question: "Do you work with clients outside of Africa?",
    answer:
      "Yes. While we're headquartered in Harare, Zimbabwe, we work with clients globally. Our team collaborates remotely across time zones, and we've delivered projects for clients in multiple countries.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "Every project includes a handover with full documentation. Our Professional package includes 3 months of post-launch support, and Enterprise clients get ongoing partnership with dedicated support. We also offer standalone maintenance plans.",
  },
  {
    question: "How do you handle communication and updates?",
    answer:
      "We run structured sprints with weekly progress updates, shared project boards, and direct access to your development team via WhatsApp, Slack, or email. You're never left guessing about the status of your project.",
  },
  {
    question: "Can you integrate AI into our existing systems?",
    answer:
      "Absolutely. We specialise in applied AI — integrating machine learning models, natural language processing, and intelligent automation into your existing infrastructure without requiring a complete rebuild.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 80}>
              <div className="card-glass rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-display text-sm tracking-wider uppercase pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-primary"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm font-light text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
