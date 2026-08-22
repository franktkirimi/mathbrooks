import {
  AudioLines,
  BrainCircuit,
  Cpu,
  Database,
  Languages,
  MessageSquareText,
  Network,
  UsersRound,
} from "lucide-react";

const researchTracks = [
  {
    number: "01",
    title: "Consented local-language datasets",
    detail:
      "Ethical text and audio collections drawn from local news, literature, radio, podcasts, and everyday speech—with regional dialects represented deliberately.",
    Icon: Database,
  },
  {
    number: "02",
    title: "Code-switching evaluation",
    detail:
      "Benchmarks for the fluid movement between Shona, Ndebele, Zimbabwean English, and street language, including idioms, references, and context-specific reasoning.",
    Icon: MessageSquareText,
  },
  {
    number: "03",
    title: "Speech, translation, and voice",
    detail:
      "ASR and text-to-speech systems tuned to Zimbabwean accents and phonetics, making natural voice a practical interface for essential digital services.",
    Icon: AudioLines,
  },
  {
    number: "04",
    title: "Efficient, low-connectivity models",
    detail:
      "Quantisation, edge computing, and lightweight architectures designed for low-end phones, intermittent connectivity, and constrained power environments.",
    Icon: Cpu,
  },
  {
    number: "05",
    title: "Cultural context and local knowledge",
    detail:
      "Local knowledge structures that help models account for social cues, history, agricultural practice, and the reasoning behind what people mean—not only what they say.",
    Icon: BrainCircuit,
  },
];

const outcomes = [
  "Open-source models",
  "Developer APIs",
  "Consented datasets",
  "Evaluation benchmarks",
  "Voice-first interfaces",
  "On-device intelligence",
];

const collaborators = [
  {
    label: "Expertise",
    copy: "Computational linguists, NLP engineers, data scientists, anthropologists, and language practitioners.",
  },
  {
    label: "Data",
    copy: "Partners with consented text, audio, or linguistic corpora in Zimbabwean languages and mixed-language settings.",
  },
  {
    label: "Operating environments",
    copy: "Organisations where language systems can be evaluated responsibly under real conditions and with real users.",
  },
];

const languageSignals = ["SHONA", "NDEBELE", "ENGLISH", "NDAU", "CHEWA", "KALANGA"];

const IlwimiExperience = () => (
  <div className="overflow-hidden rounded-[2rem] border border-black bg-white">
    <header className="relative isolate min-h-[38rem] overflow-hidden bg-black px-7 pb-10 pt-9 text-white md:min-h-[44rem] md:px-12 md:pb-14 md:pt-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(63,179,176,0.42),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(244,130,67,0.24),transparent_25%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/20 pb-6">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[#71d7d5]">
          <Languages className="h-4 w-4" aria-hidden="true" />
          L01 · Research in formation
        </div>
        <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.15em] text-white/55 sm:block">Zimbabwe language intelligence</span>
      </div>

      <div className="relative z-10 mt-20 max-w-4xl md:mt-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#71d7d5]">Inclusive language intelligence</p>
        <h1 className="mt-5 font-display text-[clamp(4.8rem,14vw,10rem)] font-semibold leading-[0.82] tracking-[-0.07em]">Ilwimi<span className="text-[#71d7d5]">.</span></h1>
        <p className="mt-8 max-w-2xl font-display text-2xl font-medium leading-tight tracking-[-0.035em] text-white md:text-4xl">
          AI that speaks our reality.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
          Language and speech systems built around how Zimbabweans actually speak, write, work, and reason.
        </p>
        <p className="mt-6 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#71d7d5]">
          Named for the Ndebele word for tongue or language
        </p>
      </div>

      <div aria-hidden="true" className="absolute -bottom-8 right-4 hidden w-[42%] rotate-[-8deg] grid-cols-2 gap-3 opacity-80 md:grid">
        {languageSignals.map((language, index) => (
          <span key={language} className={`border px-4 py-5 font-mono text-xs font-semibold tracking-[0.14em] ${index === 1 || index === 4 ? "border-[#71d7d5] bg-[#71d7d5] text-black" : "border-white/30 bg-black/30 text-white"}`}>
            {language}
          </span>
        ))}
      </div>
    </header>

    <section className="grid gap-10 border-b border-black px-7 py-14 md:grid-cols-[0.7fr_1.3fr] md:px-12 md:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">The research question</p>
      <div>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-5xl">
          Can useful AI understand Zimbabwean languages, code-switching, local knowledge, and everyday context?
        </h2>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-black">
          Ilwimi investigates whether models can follow the natural movement between Shona, Ndebele, Zimbabwean English, and local street language—while understanding idioms, proverbs, cultural references, and unspoken social cues.
        </p>
      </div>
    </section>

    <section className="grid gap-10 bg-[#f4fbfa] px-7 py-14 md:grid-cols-2 md:px-12 md:py-20">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why it matters</p>
        <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">
          Language should not become a barrier to intelligence.
        </h2>
      </div>
      <div className="space-y-6 text-base leading-8 text-black md:text-lg">
        <p>Mainstream AI is largely trained on Global North data. Applied here, it can be linguistically limited and culturally tone-deaf.</p>
        <p>When systems cannot understand local accents, dialects, or mixed-language communication, people lose access to information and local builders lose the foundation for useful products in education, health, agriculture, and public services.</p>
        <p>Ilwimi is not simply translating words. It is research into digital inclusion and the preservation of linguistic knowledge in the age of AI.</p>
      </div>
    </section>

    <section className="px-7 py-14 md:px-12 md:py-20">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">Initial research scope</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-black md:text-6xl">Five connected tracks.</h2>
        </div>
        <p className="max-w-md text-base leading-7 text-black">From responsible data collection to models that can work on an ordinary phone, each track addresses a condition required for locally useful language intelligence.</p>
      </div>

      <div className="mt-12 divide-y divide-black border-y border-black">
        {researchTracks.map(({ number, title, detail, Icon }) => (
          <article key={number} className="grid gap-5 py-7 md:grid-cols-[5rem_1fr_1.35fr] md:items-start md:gap-8 md:py-9">
            <div className="flex items-center justify-between md:block">
              <span className="font-mono text-xs font-semibold text-primary">{number}</span>
              <Icon className="h-5 w-5 text-primary md:mt-8" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-black">{title}</h3>
            <p className="text-base leading-7 text-black">{detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-black px-7 py-14 text-white md:px-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Network className="h-8 w-8 text-[#71d7d5]" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#71d7d5]">Intended outcome</p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">A trusted language-intelligence layer for Zimbabwe.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">The outcome is infrastructure that local developers, startups, and public services can build on: from voice-based farming advice and health information in Shona to customer-service systems that understand Zimbabwean English.</p>
          <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/20 bg-white/20 md:grid-cols-3">
            {outcomes.map((outcome) => <div key={outcome} className="bg-black px-4 py-5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white">{outcome}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="px-7 py-14 md:px-12 md:py-20">
      <div className="flex items-center gap-3">
        <UsersRound className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">Research with us</p>
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl">The future of AI should include the people it is meant to serve.</h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-black bg-black md:grid-cols-3">
        {collaborators.map((item) => (
          <article key={item.label} className="bg-white p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-black">{item.label}</h3>
            <p className="mt-4 text-sm leading-7 text-black">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default IlwimiExperience;
