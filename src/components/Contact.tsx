import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide mb-6">
            Let's Build Together
          </h2>
          <div className="line-accent w-20 mx-auto mt-8 mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <p className="font-light text-muted-foreground text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl mx-auto">
            We partner with organisations solving hard problems at scale.
            If that sounds like you, we'd like to hear from you.
          </p>
        </AnimatedSection>

        {/* Contact buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14">
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
                WhatsApp Us
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

        {/* Location */}
        <AnimatedSection delay={450}>
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
