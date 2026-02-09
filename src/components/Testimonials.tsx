import { Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote:
      "MathBrooks transformed how we manage our operations. The system they built cut our processing time by 70% and scaled with us as we grew.",
    name: "David M.",
    role: "Operations Director",
    company: "Logistics Firm",
  },
  {
    quote:
      "Their team delivered exactly what we needed — on time and within budget. The AI integration was seamless and our team adopted it immediately.",
    name: "Sarah K.",
    role: "Head of Technology",
    company: "EdTech Startup",
  },
  {
    quote:
      "What impressed me most was their understanding of our industry. They didn't just build software — they solved our actual business problems.",
    name: "James T.",
    role: "Managing Director",
    company: "Agricultural Enterprise",
  },
];

const stats = [
  { value: "20+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "6", label: "Industries Served" },
  { value: "3", label: "Countries" },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(217 91% 60% / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Stats bar */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              What Our Clients Say
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 150}>
              <div className="card-glass rounded-lg p-6 md:p-8 h-full flex flex-col relative group hover:border-primary/20 transition-colors duration-300">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-6 flex-shrink-0" />

                {/* Quote text */}
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 flex-1 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-border/20 pt-6">
                  <div className="font-display text-sm tracking-wider uppercase">
                    {testimonial.name}
                  </div>
                  <div className="text-xs font-light text-muted-foreground mt-1">
                    {testimonial.role} — {testimonial.company}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
