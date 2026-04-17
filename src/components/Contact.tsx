import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import TextScramble from "./TextScramble";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-display text-[2rem] md:text-[2.75rem] lg:text-[3.15rem] font-bold uppercase tracking-wide mb-6 leading-tight">
            <TextScramble text="Ready to run your business on better systems?" />
          </h2>
          <div className="line-accent w-20 mx-auto mt-8 mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <p className="font-light text-muted-foreground text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl mx-auto">
            Share the business problem, current workflow, and timeline. We respond
            within 1 business day with the next best step: a quick call, follow-up
            questions, or a written scope recommendation.
          </p>
        </AnimatedSection>

        {/* Contact buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14">
            <Link to="/book-demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="font-display text-xs tracking-[0.1em] uppercase px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                Start a Demo
              </Button>
            </Link>

            <a
              href="https://wa.me/263783469023"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.1em] uppercase px-8 py-5 sm:py-6 border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5 text-green-400 hover:text-green-300 transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to Us
              </Button>
            </a>

            <a href="mailto:cto@mathbrooks.com" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.1em] uppercase px-8 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all duration-300 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 mr-2" />
                cto@mathbrooks.com
              </Button>
            </a>

            <a href="tel:+263783469023" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.1em] uppercase px-8 py-5 sm:py-6 border-border/40 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground transition-all duration-300 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2" />
                +263 78 346 9023
              </Button>
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={450}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 md:mb-14 text-left">
            {[
              {
                title: "1. Share context",
                description:
                  "Tell us what is slowing the business down, what you have today, and what outcome matters most.",
              },
              {
                title: "2. We review quickly",
                description:
                  "We review for technical complexity, delivery risk, and whether software or AI is the right lever.",
              },
              {
                title: "3. Book the right next step",
                description:
                  "You get a demo, a scoping call, or a written recommendation instead of a generic sales reply.",
              },
            ].map((step) => (
              <div key={step.title} className="card-glass rounded-lg p-5">
                <h3 className="font-display text-xs tracking-[0.15em] uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-base font-light text-muted-foreground leading-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="flex items-center justify-center gap-2 text-sm font-light text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span>Harare, Zimbabwe — Operating Globally</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
