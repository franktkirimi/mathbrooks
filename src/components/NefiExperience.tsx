import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  CloudSun,
  Database,
  FileCheck2,
  Landmark,
  Map,
  Microscope,
  Mountain,
  RadioTower,
  Satellite,
  Sprout,
  UsersRound,
  Waves,
} from "lucide-react";

const observationStreams = [
  {
    title: "Satellite imagery",
    detail: "Sentinel-1 radar, Sentinel-2 optical, and Landsat—updated every 5–12 days.",
    Icon: Satellite,
  },
  {
    title: "Weather data",
    detail: "ZMS stations and global models, from hourly to daily.",
    Icon: CloudSun,
  },
  {
    title: "Water observations",
    detail: "River levels and dam states from ZINWA and other sources.",
    Icon: Waves,
  },
  {
    title: "Ground reports",
    detail: "Extension workers, field officers, and community observers.",
    Icon: RadioTower,
  },
  {
    title: "Static foundations",
    detail: "Terrain, soils, catchments, and administrative boundaries.",
    Icon: Mountain,
  },
];

const outputs = [
  "Vegetation health and crop-stress maps at field-level resolution, updated every five days",
  "Drought and rainfall anomaly signals, dekadal, with historical comparison",
  "Surface-water extent and change under any weather conditions",
  "Flood and fire early-warning indicators",
  "Land-cover and land-degradation tracking, quarterly",
  "Custom queries for any location, time range, or variable combination",
];

const users = [
  {
    title: "Government ministries",
    detail: "Agriculture, environment, water, local government, and defence.",
    Icon: Landmark,
  },
  {
    title: "ZMS, ZINWA, EMA, Agritex",
    detail: "The agencies that already hold pieces of this puzzle.",
    Icon: Building2,
  },
  {
    title: "District and provincial officers",
    detail: "The people making field-level decisions.",
    Icon: Map,
  },
  {
    title: "Researchers and universities",
    detail: "Zimbabwean science needs Zimbabwean data infrastructure.",
    Icon: Microscope,
  },
  {
    title: "Development partners",
    detail: "Teams funding climate, agriculture, and water programmes in Zimbabwe.",
    Icon: FileCheck2,
  },
  {
    title: "Communities",
    detail: "Through the tools and services built on top of neFI.",
    Icon: UsersRound,
  },
];

const currentStatus = [
  "Sentinel-1, Sentinel-2, and CHIRPS rainfall ingestion pipelines operational",
  "Vegetation-index, water-extent, and anomaly-detection processing chains in testing",
  "STAC catalogue and Zarr data-cube architecture defined and being deployed",
  "API layer in development",
];

const nextNeeds = [
  "Integration with ZMS, ZINWA, and EMA data systems",
  "Zimbabwean ground-truth calibration datasets",
  "Institutional hosting and governance framework",
  "Funding for national-scale deployment and long-term operations",
];

const NefiWordmark = ({ className = "" }: { className?: string }) => (
  <span className={className} aria-label="neFI">
    <span>ne</span><span className="text-[#8ed14f]">FI</span>
  </span>
);

const NefiExperience = () => (
  <div className="overflow-hidden rounded-[2rem] border border-[#16351d] bg-white">
    <header className="relative isolate min-h-[42rem] overflow-hidden bg-[#071b0d] px-7 pb-12 pt-9 text-white md:min-h-[46rem] md:px-12 md:pb-14 md:pt-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(113,179,67,0.36),transparent_30%),radial-gradient(circle_at_18%_90%,rgba(39,111,75,0.35),transparent_34%)]" />
      <svg viewBox="0 0 760 620" className="absolute -right-24 top-10 h-[78%] w-[70%] opacity-70" aria-hidden="true">
        <g fill="none" stroke="#9edc72" strokeOpacity="0.22">
          <path d="M86 338C175 196 317 141 474 175C590 200 683 292 701 408" strokeWidth="2" />
          <path d="M52 377C158 185 334 92 526 145C656 181 744 287 756 443" strokeWidth="1" />
          <path d="M132 354C215 248 329 213 440 235C526 252 590 314 616 398" strokeWidth="1.5" />
          <path d="M188 388C251 319 330 294 410 305C480 314 532 355 553 415" strokeWidth="1" />
          <path d="M307 77L282 546M424 68L453 555M174 121L598 508" strokeDasharray="6 12" />
        </g>
        {[[86,338],[175,196],[317,141],[474,175],[590,200],[701,408],[132,354],[329,213],[440,235],[616,398],[188,388],[410,305],[553,415]].map(([x,y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 4 === 0 ? 6 : 3} fill={index % 4 === 0 ? "#b6ed83" : "#6dae58"} />
        ))}
      </svg>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(181,237,131,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(181,237,131,0.22)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-6 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#b6ed83]">
        <span>E01 · Active development</span>
        <span className="hidden text-white/55 sm:block">Zimbabwe · Environmental infrastructure</span>
      </div>

      <div className="relative z-10 mt-24 max-w-4xl md:mt-28">
        <NefiWordmark className="font-display text-[clamp(5.5rem,16vw,11rem)] font-semibold leading-[0.78] tracking-[-0.075em]" />
        <h1 className="mt-10 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
          The environmental nervous system of Zimbabwe.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
          Satellite, weather, and ground observations—fused into one living picture of Zimbabwe’s land, water, and atmosphere. Continuously updated. Freely accessible. Built to outlast any single project, organisation, or political cycle.
        </p>
        <a href="#how-nefi-works" className="mt-9 inline-flex items-center gap-3 rounded-lg bg-[#b6ed83] px-5 py-3 text-sm font-semibold text-[#071b0d] transition hover:bg-white">
          Understand how it works
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </header>

    <section className="grid gap-10 border-b border-black px-7 py-14 md:grid-cols-[0.7fr_1.3fr] md:px-12 md:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">The problem</p>
      <div className="max-w-4xl space-y-6 font-display text-2xl font-semibold leading-snug tracking-[-0.035em] text-black md:text-4xl">
        <p>Zimbabwe’s environmental data exists—but it lives in fragments. Satellite imagery in one system. Weather data in another. River readings in spreadsheets. Field observations in notebooks.</p>
        <p className="text-[#377624]">The signals were there. No single view brought them together in time.</p>
      </div>
    </section>

    <section id="how-nefi-works" className="scroll-mt-28 bg-[#f4faef] px-7 py-14 md:px-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">What neFI does</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-black md:text-6xl">One foundation. Many uses.</h2>
        </div>
        <div className="space-y-7 text-lg leading-8 text-black">
          <p>neFI brings every environmental observation about Zimbabwe into one place, cleans it, aligns it in space and time, and makes it available to anyone who needs it.</p>
          <div className="border-l-4 border-[#8ed14f] pl-6 font-display text-2xl font-semibold leading-snug tracking-[-0.03em]">
            Not a dashboard. Not a report. Not an app.
            <span className="mt-3 block text-[#377624]">The foundation they are built on.</span>
          </div>
          <p>Ministries can see drought spread across a province. District officers can check a dangerous river level. Researchers can retrieve ten years of vegetation data for a watershed.</p>
          <p className="font-semibold">One infrastructure. Many users. No redundant data pipelines.</p>
        </div>
      </div>
    </section>

    <section className="px-7 py-14 md:px-12 md:py-20">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">What flows through it</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-black md:text-6xl">Five observation streams.</h2>
        </div>
        <p className="max-w-md text-base leading-7 text-black">All fused. All queryable. All timestamped and quality-flagged.</p>
      </div>
      <div className="mt-12 divide-y divide-black border-y border-black">
        {observationStreams.map(({ title, detail, Icon }, index) => (
          <article key={title} className="grid gap-4 py-6 md:grid-cols-[4rem_1fr_1.2fr] md:items-center md:gap-8 md:py-8">
            <div className="flex items-center justify-between md:block">
              <span className="font-mono text-xs font-semibold text-[#377624]">0{index + 1}</span>
              <Icon className="h-5 w-5 text-[#377624] md:mt-5" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-black">{title}</h3>
            <p className="text-base leading-7 text-black">{detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-[#071b0d] px-7 py-14 text-white md:px-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Sprout className="h-8 w-8 text-[#b6ed83]" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#b6ed83]">What you can get</p>
        </div>
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Concrete environmental intelligence.</h2>
          <ol className="mt-10 divide-y divide-white/20 border-y border-white/20">
            {outputs.map((output, index) => (
              <li key={output} className="flex gap-5 py-5 text-base leading-7 text-white md:text-lg">
                <span className="font-mono text-xs font-semibold text-[#b6ed83]">0{index + 1}</span>
                {output}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <section className="px-7 py-14 md:px-12 md:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">Who it is for</p>
      <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em] text-black md:text-6xl">The people already doing the work.</h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
        {users.map(({ title, detail, Icon }) => (
          <article key={title} className="min-h-56 bg-white p-6 md:p-8">
            <Icon className="h-6 w-6 text-[#377624]" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em] text-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-black">{detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="border-y border-black bg-[#f4faef] px-7 py-14 md:px-12 md:py-20">
      <div className="max-w-4xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">Where it is now</p>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">Active development, with national infrastructure as the destination.</h2>
        <p className="mt-6 text-lg leading-8 text-black">MathBrooks is building neFI with the explicit intention that it becomes nationally hosted and institutionally governed.</p>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="font-display text-2xl font-semibold text-black">Current status</h3>
          <ul className="mt-6 divide-y divide-black/20 border-y border-black/20">
            {currentStatus.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-7 text-black"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#64a93f]" />{item}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-black">What is needed next</h3>
          <ul className="mt-6 divide-y divide-black/20 border-y border-black/20">
            {nextNeeds.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-7 text-black"><span className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#377624]" />{item}</li>)}
          </ul>
        </div>
      </div>
    </section>

    <section className="grid gap-10 bg-black px-7 py-14 text-white md:grid-cols-[0.7fr_1.3fr] md:px-12 md:py-20">
      <div>
        <Database className="h-8 w-8 text-[#b6ed83]" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#b6ed83]">Our role</p>
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">MathBrooks is building neFI. We are not its long-term owner.</h2>
        <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-white/75">
          <p>National infrastructure must outlast any single organisation. neFI is designed from the start for transition to appropriate national or regional institutional hosting.</p>
          <p>Our job is to get it right, get it running, and hand it over with the same integrity we built it with.</p>
        </div>
      </div>
    </section>

    <section className="px-7 py-14 md:px-12 md:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#377624]">Get involved</p>
      <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em] text-black md:text-6xl">Two ways to strengthen neFI.</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-black p-7 md:p-9">
          <p className="font-mono text-xs font-semibold text-[#377624]">01 · You hold data</p>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-black">Your observations should be part of the picture.</h3>
          <p className="mt-5 text-base leading-7 text-black">River gauges, weather readings, soil measurements, and field reports make neFI stronger. We will handle the technical integration.</p>
        </article>
        <article className="rounded-2xl border border-black bg-[#f4faef] p-7 md:p-9">
          <p className="font-mono text-xs font-semibold text-[#377624]">02 · You need the data</p>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-black">Build, research, or decide on better information.</h3>
          <p className="mt-5 text-base leading-7 text-black">If your work depends on environmental information, we can show you what is available now and what is coming.</p>
        </article>
      </div>
      <a href="mailto:cto@mathbrooks.com" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#071b0d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#377624]">
        cto@mathbrooks.com
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  </div>
);

export default NefiExperience;
