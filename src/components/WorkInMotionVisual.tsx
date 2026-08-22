import { useState, type CSSProperties } from "react";

const workAreas = [
  {
    title: "Health",
    description: "Connected systems that bring care closer to people.",
    image: "/work-health.png",
  },
  {
    title: "Finance",
    description: "Clearer tools for the decisions people make every day.",
    image: "/work-finance.png",
  },
  {
    title: "Learning",
    description: "Local knowledge made easier to reach and use.",
    image: "/projects/project2.png",
  },
  {
    title: "Teams",
    description: "Better systems for work that depends on people moving together.",
    image: "/projects/Project3.png",
  },
  {
    title: "Fieldwork",
    description: "Intelligence for the work that happens beyond the screen.",
    image: "/soko-a01-crop-inspection-v4.png",
  },
  {
    title: "Things",
    description: "Hardware and intelligent software for difficult work.",
    image: "/soko-a01-hazardous-work-v2.png",
  },
];

const WorkInMotionVisual = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section className="-mx-5 mt-10 lg:hidden" aria-label="MathBrooks in motion">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none]">
          {workAreas.map((area) => (
            <article key={area.title} className="relative w-[78vw] max-w-[21rem] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card shadow-card aspect-[1.3]">
              <img src={area.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-lg font-semibold tracking-[-0.02em]">{area.title}</p>
                <p className="mt-1 text-sm leading-5 text-white/80">{area.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="px-5 text-xs text-muted-foreground">Swipe to explore MathBrooks systems in operation.</p>
      </section>

      <div
        className={`work-orbit relative hidden min-h-[510px] overflow-visible lg:block ${activeIndex !== null ? "is-paused" : ""}`}
        onMouseLeave={() => setActiveIndex(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setActiveIndex(null);
        }}
      >
        <div aria-hidden="true" className="work-orbit-aura absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="work-orbit-stage absolute top-[52%] size-0 -translate-x-1/2 -translate-y-1/2">
          <span aria-hidden="true" className="work-orbit-shadow absolute bottom-0 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full" />
          {workAreas.map((area, index) => (
            <div key={area.title} className="work-orbit-item" style={{ "--card-index": index } as CSSProperties}>
              <button
                type="button"
                className={`work-orbit-card ${activeIndex === index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex((current) => (current === index ? null : index))}
                aria-label={`${area.title}: ${area.description}`}
                aria-pressed={activeIndex === index}
              >
                <img src={area.image} alt="" />
                <span className="work-orbit-card-shade" />
                <span className="work-orbit-card-copy">
                  <strong>{area.title}</strong>
                  <small>{area.description}</small>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkInMotionVisual;
