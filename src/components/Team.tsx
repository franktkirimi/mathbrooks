import { Briefcase, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const teamMembers = [
  {
    name: "Dr. Eng. D. Simango",
    role: "Chief Engineer",
    qualification: "PhD in Machine Learning and Robotics",
    roleFocus:
      "Leads system architecture and AI engineering standards, ensuring every platform is robust, scalable, and production-ready.",
  },
  {
    name: "Eytan Kirimi",
    role: "Product Development Lead",
    qualification: "Honors Degree in IT",
    roleFocus:
      "Owns product planning and execution, aligning user needs, business priorities, and delivery milestones across projects.",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Team
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={`${member.name}-${index}`} delay={index * 120}>
              <article className="card-glass rounded-lg p-6 md:p-8 h-full">
                <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/80 mb-4">
                  Team Member
                </p>
                <h3 className="font-display text-xl md:text-2xl tracking-wide mb-6">
                  {member.name}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground font-light">
                  <div className="flex items-start gap-2.5">
                    <Briefcase className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{member.role}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{member.qualification}</span>
                  </div>
                </div>
                <p className="mt-5 text-sm font-light text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground/90">Role Focus:</span>{" "}
                  {member.roleFocus}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
