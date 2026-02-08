import { ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "OrderFile",
    description:
      "A smart file management system that declutters folders and maintains order. Users can apply filters, set rules, and run it in the background to automatically organise files as they're saved.",
    image: "/projects/Project1.png",
    tags: ["File Management", "Automation", "Desktop"],
  },
  {
    title: "Educentia",
    description:
      "An education platform connecting students with tutors for extra lessons. Features live lessons, quizzes, tests, and progress tracking to enhance the learning experience.",
    image: "/projects/project2.png",
    tags: ["EdTech", "Live Lessons", "Assessments"],
  },
  {
    title: "CoachHub",
    description:
      "A coaching management system for planning training sessions, tracking player performance, and monitoring progress — giving coaches full visibility over their team's development.",
    image: "/projects/Project3.png",
    tags: ["Sports Tech", "Analytics", "Team Management"],
  },
];

const OurProjects = () => {
  return (
    <section
      id="projects"
      className="py-16 md:py-[120px] lg:py-[150px] px-6 relative"
    >
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(217 91% 60% / 0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Our Projects
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-xl mx-auto">
              A selection of systems we've designed, built, and deployed for
              clients across industries.
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 150}>
              <div className="card-glass card-hover rounded-lg group relative overflow-hidden h-full flex flex-col">
                {/* Image / Screenshot area */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-display text-base tracking-wider uppercase mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
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
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
