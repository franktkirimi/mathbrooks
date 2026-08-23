import { Activity, BatteryCharging, BrainCircuit, Factory, Recycle, SunMedium, Zap } from "lucide-react";

const pillars = [
  {
    code: "01",
    title: "Eklezo OS",
    subtitle: "The operating intelligence",
    icon: BrainCircuit,
    copy: "Software for forecasting generation and demand, scheduling batteries, prioritising loads, and coordinating grid, solar, storage, and backup assets as one energy system.",
    areas: ["Generation and demand forecasting", "Battery scheduling and load priority", "Multi-source coordination and fault visibility"],
  },
  {
    code: "02",
    title: "Energy infrastructure",
    subtitle: "The operating layer available now",
    icon: SunMedium,
    copy: "Production-grade hybrid solar, storage, backup, and mini-grid systems for organisations that cannot allow unreliable power to define their operations.",
    areas: ["Hybrid and off-grid system engineering", "Mini-grid deployment and monitoring", "Live operating environments for Eklezo OS"],
  },
  {
    code: "03",
    title: "Local battery capability",
    subtitle: "The industrial research horizon",
    icon: Factory,
    copy: "Long-horizon research into lithium processing, pack engineering, climate-appropriate storage, and circular battery systems suited to Zimbabwean and regional conditions.",
    areas: ["Battery-material processing research", "Cell, module, and pack engineering", "Second-life storage and recycling pathways"],
  },
];

const horizons = [
  {
    label: "Now",
    title: "Deploy resilient power",
    copy: "Build hybrid systems that keep essential operations productive and begin producing high-quality operating data.",
  },
  {
    label: "Next",
    title: "Orchestrate every asset",
    copy: "Use Eklezo OS to forecast, schedule, prioritise, and coordinate mixed energy infrastructure across sites and mini-grids.",
  },
  {
    label: "Long term",
    title: "Build local battery capability",
    copy: "Develop the scientific, engineering, manufacturing, and circular-economy capability required to retain more energy value locally.",
  },
];

const collaborators = [
  "Electrical and power-electronics engineers",
  "Lithium chemists, metallurgists, and battery researchers",
  "IoT, control-systems, data, and machine-learning engineers",
  "Farms, mines, clinics, schools, fleets, and industrial sites",
];

const EklezoExperience = () => (
  <div className="space-y-20 md:space-y-28">
    <header className="relative overflow-hidden rounded-[2rem] bg-[#071412] px-7 py-10 text-white sm:px-10 md:px-14 md:py-16">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(126,221,176,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(126,221,176,0.22)_1px,transparent_1px)] [background-size:48px_48px]" />
      <svg viewBox="0 0 620 520" className="absolute -right-28 top-5 hidden h-[95%] w-[58%] opacity-70 lg:block" aria-hidden="true">
        <g fill="none" stroke="#79d5ac" strokeWidth="2">
          <path d="M70 72V182H214V270H350V382H548" strokeOpacity="0.32" />
          <path d="M30 246H156V126H292V214H458V328H590" strokeOpacity="0.22" />
          <path d="M112 432V330H250V436H402V142H570" strokeOpacity="0.25" />
        </g>
        <g fill="#0f766e" stroke="#9ae5c2" strokeWidth="2">
          <rect x="50" y="52" width="40" height="40" rx="6" />
          <rect x="194" y="250" width="40" height="40" rx="6" />
          <rect x="330" y="362" width="40" height="40" rx="6" />
          <rect x="438" y="194" width="40" height="40" rx="6" />
          <rect x="528" y="362" width="40" height="40" rx="6" />
          <rect x="230" y="416" width="40" height="40" rx="6" />
        </g>
        <path d="M32 470H590" stroke="#f3b763" strokeWidth="3" strokeDasharray="8 12" />
      </svg>

      <div className="relative z-10 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mb-caption text-[#8de0b9]">G01 · Energy intelligence</span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/65">Research in formation</span>
        </div>
        <h1 className="mt-8 font-display text-6xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl md:text-[7rem]">Eklezo</h1>
        <p className="mt-5 font-display text-xl font-medium tracking-[-0.025em] text-[#8de0b9] md:text-2xl">End-to-End Energy Intelligence</p>
        <p className="mt-10 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
          From local lithium to grid orchestration.
        </p>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
          An energy initiative spanning resilient infrastructure, operating intelligence, and the long path towards locally developed battery capability.
        </p>
      </div>
    </header>

    <section className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16" aria-labelledby="eklezo-question">
      <div>
        <p className="mb-caption text-primary">The research question</p>
        <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
          <Zap className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
      </div>
      <div>
        <h2 id="eklezo-question" className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
          Can Zimbabwe connect energy deployment, intelligent orchestration, and local battery capability into one resilient value chain?
        </h2>
        <p className="mt-7 text-lg leading-8 text-muted-foreground">
          Eklezo asks how immediate hybrid-power systems can become the operating foundation for smarter energy coordination—and, over time, for deeper local capability in storage, battery engineering, reuse, and manufacturing.
        </p>
      </div>
    </section>

    <section aria-labelledby="eklezo-matters">
      <div className="grid gap-10 border-y border-border py-12 md:grid-cols-[0.75fr_1.25fr] md:py-16">
        <div>
          <p className="mb-caption text-primary">Why it matters</p>
          <BatteryCharging className="mt-7 h-9 w-9 text-primary" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div>
          <h2 id="eklezo-matters" className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
            Energy resilience cannot stop at importing equipment.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Farms, mines, schools, clinics, and businesses increasingly combine grid power, solar generation, storage, and backup systems without one operating intelligence. At the same time, much of the value in the battery supply chain is created outside the countries that provide its raw materials.
          </p>
          <p className="mt-5 text-lg leading-8 text-foreground">
            Eklezo links the urgent need for reliable power today with the longer work of building sovereign energy capability for tomorrow.
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="eklezo-pillars">
      <p className="mb-caption text-primary">One system · Three pillars</p>
      <h2 id="eklezo-pillars" className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-foreground md:text-6xl">
        Deploy. Orchestrate. Localise.
      </h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border lg:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.code} className="flex flex-col bg-card p-7 md:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-[0.16em] text-primary">{pillar.code}</span>
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{pillar.subtitle}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground">{pillar.title}</h3>
              <p className="mt-5 text-base leading-7 text-muted-foreground">{pillar.copy}</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {pillar.areas.map((area) => <li key={area} className="py-3 text-sm leading-6 text-foreground">{area}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>

    <section className="overflow-hidden rounded-[2rem] bg-[#edf7f2] p-7 md:p-12" aria-labelledby="eklezo-horizons">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-caption text-primary">The build horizon</p>
          <h2 id="eklezo-horizons" className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-foreground md:text-6xl">
            Ambition, sequenced honestly.
          </h2>
        </div>
        <Activity className="h-10 w-10 text-primary" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {horizons.map((horizon, index) => (
          <article key={horizon.label} className="border-t border-primary/25 pt-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">0{index + 1} · {horizon.label}</span>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.035em] text-foreground">{horizon.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{horizon.copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16" aria-labelledby="eklezo-coalition">
      <div>
        <p className="mb-caption text-primary">Research and build with us</p>
        <Recycle className="mt-7 h-9 w-9 text-primary" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div>
        <h2 id="eklezo-coalition" className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
          This requires a coalition, not a single discipline.
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Eklezo is seeking the expertise, operating environments, data, capital, and institutional partnerships required to test each layer against real conditions.
        </p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {collaborators.map((collaborator, index) => (
            <li key={collaborator} className="flex gap-5 py-4 text-base leading-7 text-foreground">
              <span className="font-mono text-xs font-semibold text-primary">0{index + 1}</span>
              {collaborator}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);

export default EklezoExperience;
