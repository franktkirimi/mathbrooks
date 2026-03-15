import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { usePageMeta } from "@/hooks/usePageMeta";

const workItems = [
  {
    title: "OrderFile",
    sector: "Workflow Automation",
    businessNeed:
      "High-volume folders become unmanageable quickly when teams rely on manual filing and inconsistent naming.",
    delivered:
      "A desktop workflow that applies rules automatically so files stay organised as they are created and saved.",
    outcomes: ["10,000+ files organized", "95% time saved", "Built in 6 weeks"],
  },
  {
    title: "Educentia",
    sector: "Education Technology",
    businessNeed:
      "Students and tutors needed one system for lessons, assessments, and progress visibility.",
    delivered:
      "A connected platform for live learning, quizzes, tests, and progress tracking in one experience.",
    outcomes: ["500+ students", "Live video lessons", "Built in 10 weeks"],
  },
  {
    title: "CoachHub",
    sector: "Operational Analytics",
    businessNeed:
      "Coaches needed clearer visibility across training plans, player performance, and development progress.",
    delivered:
      "A coaching management platform that supports planning, performance tracking, and ongoing progress review.",
    outcomes: ["50+ teams managed", "Real-time analytics", "Built in 8 weeks"],
  },
];

const Work = () => {
  usePageMeta({
    title: "Selected Work | MathBrooks",
    description:
      "Representative MathBrooks work across workflow automation, education technology, and operational analytics.",
    canonicalPath: "/work",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Selected Work
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-wide leading-tight mb-6">
              Representative Delivery Across Product and Operations
            </h1>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
              These summaries show the kind of business problems we tend to work on:
              workflow friction, fragmented operations, and teams that need clearer
              visibility through software.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6 mt-12 md:mt-16">
          {workItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 120}>
              <article className="card-glass rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-3">
                      {item.sector}
                    </p>
                    <h2 className="font-display text-xl tracking-wide">{item.title}</h2>
                  </div>
                  <div className="flex-1 space-y-5">
                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Business Need
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.businessNeed}
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Delivered
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.delivered}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className="text-[0.65rem] font-display tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary/80"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={360}>
          <div className="text-center mt-12 md:mt-16">
            <p className="text-sm font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-5">
              If you want to discuss a similar operational problem, start with the
              contact section and we can point you to the most relevant approach.
            </p>
            <a
              href="/#contact"
              className="font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Start the conversation
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Work;
