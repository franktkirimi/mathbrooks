import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import InteractiveCard from "./InteractiveCard";
import TextScramble from "./TextScramble";

const projects = [
  {
    title: "OrderFile",
    businessNeed:
      "Teams needed a reliable way to keep high-volume shared folders usable as files piled up.",
    delivered:
      "A rule-based file management system that sorts, filters, and maintains structure automatically in the background.",
    image: "/projects/Project1.png",
    tags: ["File Management", "Automation", "Desktop"],
    outcomes: ["10,000+ files organized", "95% time saved", "Built in 6 weeks"],
  },
  {
    title: "Educentia",
    businessNeed:
      "Students and tutors needed one place to manage lessons, assessments, and progress without fragmented tools.",
    delivered:
      "An education platform for live lessons, quizzes, tests, and progress tracking across the learning journey.",
    image: "/projects/project2.png",
    tags: ["EdTech", "Live Lessons", "Assessments"],
    outcomes: ["500+ students", "Live video lessons", "Built in 10 weeks"],
  },
  {
    title: "CoachHub",
    businessNeed:
      "Coaches needed operational visibility across sessions, players, and performance trends.",
    delivered:
      "A coaching management system for planning training, tracking performance, and monitoring player development over time.",
    image: "/projects/Project3.png",
    tags: ["Sports Tech", "Analytics", "Team Management"],
    outcomes: ["50+ teams managed", "Real-time analytics", "Built in 8 weeks"],
  },
];

const OurProjects = () => {
  return (
    <section
      id="projects"
      className="py-16 md:py-[120px] lg:py-[150px] px-6 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(217 91% 60% / 0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="Selected Work" />
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-xl mx-auto">
              Representative engagements and product builds across workflow
              automation, education, and operational visibility.
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 150}>
              <InteractiveCard className="rounded-lg group h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    loading="lazy"
                    width={600}
                    height={338}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-display text-base tracking-wider uppercase mb-3">
                    {project.title}
                  </h3>
                  <div className="space-y-4 mb-4 flex-1">
                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Business Need
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {project.businessNeed}
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Delivered
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {project.delivered}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.outcomes.map((metric) => (
                      <span
                        key={metric}
                        className="text-[0.65rem] font-display tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary/80"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] font-display tracking-wider uppercase px-3 py-1 rounded-full border border-border/40 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/work"
              className="inline-block mb-5 font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Browse selected work
            </Link>
            <p className="text-sm font-light text-muted-foreground mb-5 max-w-2xl mx-auto leading-relaxed">
              If you want a walkthrough of work relevant to your industry or delivery
              stage, reach out and we will point you to the closest fit.
            </p>
            <a
              href="#contact"
              className="font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Request a relevant walkthrough
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OurProjects;
