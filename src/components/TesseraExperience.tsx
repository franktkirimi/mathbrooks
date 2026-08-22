import {
  Activity,
  Bluetooth,
  Cpu,
  Radio,
  Router,
  Satellite,
  ShieldCheck,
  TriangleAlert,
  Wifi,
  Zap,
} from "lucide-react";

const failureModes = [
  {
    title: "One failure can isolate a region.",
    copy: "Central towers and fixed fibre routes create critical points that can disappear through power loss, damage, or distance.",
  },
  {
    title: "Static routes react too slowly.",
    copy: "Moving vehicles, metal structures, weather, and changing terrain can make yesterday’s best path unusable.",
  },
  {
    title: "Closed hardware limits deployment.",
    copy: "Tightly coupled network systems make it difficult to combine the radios and edge devices already available.",
  },
];

const capabilities = [
  { icon: Activity, title: "Dynamic routing", copy: "Continuously searches for a better path as nodes move, weaken, or disappear." },
  { icon: Cpu, title: "Edge intelligence", copy: "Designed to make routing decisions close to the network on low-power hardware." },
  { icon: Radio, title: "Protocol hopping", copy: "Explores hand-offs between Wi-Fi, Bluetooth, RF, and satellite links." },
  { icon: ShieldCheck, title: "Priority traffic", copy: "Aims to protect critical messages when bandwidth becomes constrained." },
];

const layers = [
  {
    number: "01",
    name: "Sensory layer",
    label: "Observe",
    copy: "Collects signal quality, battery health, movement, compute availability, and packet loss from every node.",
  },
  {
    number: "02",
    name: "Tessera brain",
    label: "Decide",
    copy: "Uses reinforcement learning to evaluate topology and choose the next hop for each packet.",
  },
  {
    number: "03",
    name: "Control plane",
    label: "Understand",
    copy: "Gives operators a live topology, network health, priority controls, and manual overrides.",
  },
];

const deployments = [
  {
    name: "Rural connectivity",
    copy: "Solar-powered nodes pass connectivity from home to home until traffic reaches a fibre or satellite gateway.",
  },
  {
    name: "Disaster response",
    copy: "Teams, vehicles, drones, and temporary radios form a network that can reorganise when infrastructure is lost.",
  },
  {
    name: "Industrial operations",
    copy: "Robots and sensors maintain routes through warehouses, mines, and other environments where interference constantly changes.",
  },
];

const phases = [
  {
    phase: "Phase 01",
    title: "Simulate",
    copy: "Train and test routing behaviour inside a virtual 100-node network, including moving and failed nodes.",
  },
  {
    phase: "Phase 02",
    title: "Emulate",
    copy: "Run the model across a small cluster of low-power physical devices and deliberately introduce interference.",
  },
  {
    phase: "Phase 03",
    title: "Deploy",
    copy: "Measure latency, packet delivery, energy use, and resilience with a real operating partner in the field.",
  },
];

const MeshGraphic = ({ compact = false }: { compact?: boolean }) => (
  <svg viewBox="0 0 720 560" className="h-full w-full" role="img" aria-label="A mesh network rerouting data around a failed node">
    <defs>
      <linearGradient id={compact ? "tessera-route-compact" : "tessera-route"} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#64dfdc" />
        <stop offset="0.55" stopColor="#3a9ea8" />
        <stop offset="1" stopColor="#5f67ff" />
      </linearGradient>
      <filter id={compact ? "tessera-glow-compact" : "tessera-glow"} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </defs>

    <g stroke="#7da8aa" strokeOpacity="0.2" strokeWidth="2">
      <path d="M92 133L242 82L366 173L520 100L632 206" />
      <path d="M92 133L156 298L324 276L366 173" />
      <path d="M156 298L110 451L286 474L324 276" />
      <path d="M324 276L468 365L632 206" />
      <path d="M286 474L468 365L612 474" />
      <path d="M520 100L468 365" />
    </g>

    <path
      d="M92 133L156 298L110 451L286 474L468 365L632 206"
      fill="none"
      stroke={`url(#${compact ? "tessera-route-compact" : "tessera-route"})`}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.22"
      filter={`url(#${compact ? "tessera-glow-compact" : "tessera-glow"})`}
    />
    <path
      d="M92 133L156 298L110 451L286 474L468 365L632 206"
      className="tessera-route-flow"
      fill="none"
      stroke={`url(#${compact ? "tessera-route-compact" : "tessera-route"})`}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="10 13"
    />

    <g>
      {[
        [92, 133], [242, 82], [366, 173], [520, 100], [632, 206], [156, 298], [324, 276], [110, 451], [286, 474], [468, 365], [612, 474],
      ].map(([x, y], index) => {
        const failed = index === 6;
        return (
          <g key={`${x}-${y}`}>
            <rect x={x - 18} y={y - 18} width="36" height="36" rx="8" fill={failed ? "#2a1919" : "#101d1e"} stroke={failed ? "#f16f67" : "#75c8c7"} strokeOpacity={failed ? 0.9 : 0.72} />
            {failed ? (
              <path d={`M${x - 7} ${y - 7}L${x + 7} ${y + 7}M${x + 7} ${y - 7}L${x - 7} ${y + 7}`} stroke="#f16f67" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <rect x={x - 4} y={y - 4} width="8" height="8" rx="2" fill="#71d7d5" />
            )}
          </g>
        );
      })}
    </g>

    {!compact && (
      <g className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em]">
        <text x="347" y="319" fill="#f58a82">Node lost</text>
        <text x="422" y="411" fill="#79d9d7">Route recovered</text>
      </g>
    )}
  </svg>
);

const TesseraExperience = () => (
  <>
    <section className="overflow-hidden rounded-[2.5rem] bg-[#071011] text-white shadow-[0_32px_90px_rgba(4,17,18,0.22)]">
      <div className="grid min-h-[690px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex flex-col justify-between p-7 md:p-12 lg:p-14">
          <div>
            <div className="flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[#71d7d5]">
              <Router className="h-4 w-4" aria-hidden="true" />
              N01 · Resilient networks
            </div>
            <h1 className="mt-8 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.055em] md:text-8xl">Tessera<span className="text-[#71d7d5]">™</span></h1>
            <p className="mt-6 max-w-md font-display text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl">The autonomous brain for self-healing networks.</p>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65 md:text-lg md:leading-8">A proposed software layer that helps decentralized devices find a new route when the network around them changes.</p>
          </div>

          <div className="mt-12 border-t border-white/15 pt-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/50">
            MathBrooks Things · Research in formation
          </div>
        </div>

        <div className="relative min-h-[480px] border-t border-white/10 bg-[radial-gradient(circle_at_55%_44%,rgba(29,126,133,0.25),transparent_48%),linear-gradient(145deg,#091415,#050a0b)] lg:min-h-full lg:border-l lg:border-t-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(117,200,199,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(117,200,199,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 p-4 md:p-8"><MeshGraphic /></div>
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55 backdrop-blur md:left-8 md:top-8">
            <span className="size-1.5 rounded-sm bg-[#f16f67]" /> Node 07 unavailable
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-12 py-24 md:grid-cols-[0.82fr_1.18fr] md:py-32">
      <div>
        <p className="mb-caption text-primary">The problem</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Most networks depend on something staying still.</h2>
      </div>
      <div className="divide-y divide-border border-y border-border">
        {failureModes.map((item, index) => (
          <article key={item.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-5">
            <span className="font-mono text-xs font-semibold text-primary">0{index + 1}</span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-foreground md:text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="rounded-[2.5rem] border border-border bg-card p-7 md:p-12">
      <div className="max-w-3xl">
        <p className="mb-caption text-primary">The Tessera idea</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Intelligence between the radio and the application.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Tessera is conceived as a hardware-agnostic routing layer. It observes the network, decides where a packet should go next, and adapts that decision as conditions change.</p>
      </div>

      <div className="mt-12 grid gap-3 rounded-[1.6rem] border border-border bg-secondary p-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:p-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">
          {[
            [Wifi, "Wi-Fi"], [Bluetooth, "Bluetooth"], [Radio, "RF"], [Satellite, "Satellite"],
          ].map(([Icon, label]) => (
            <div key={label as string} className="flex items-center gap-2 rounded-xl bg-card px-3 py-3 text-sm font-semibold text-foreground shadow-card">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {label as string}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground md:px-3">Physical radios →</div>
        <div className="rounded-2xl bg-[#081314] p-6 text-white shadow-overlay">
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#71d7d5]">Routing intelligence</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">Tessera brain</p>
          <p className="mt-3 text-sm leading-6 text-white/60">Topology + node health + traffic demand → next hop</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-2xl border border-border bg-background p-5">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.025em] text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <div>
          <p className="mb-caption text-primary">How it is structured</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Observe. Decide. Understand.</h2>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted-foreground">Three layers turn raw network conditions into routing decisions that an operator can see and, when necessary, override.</p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {layers.map((layer) => (
          <article key={layer.number} className="relative overflow-hidden rounded-[2rem] bg-[#0a1415] p-7 text-white md:min-h-[25rem] md:p-8">
            <span className="font-mono text-xs font-semibold text-[#71d7d5]">{layer.number} / {layer.label}</span>
            <div className="mt-24 md:mt-36">
              <h3 className="font-display text-3xl font-semibold tracking-[-0.04em]">{layer.name}</h3>
              <p className="mt-4 text-base leading-7 text-white/62">{layer.copy}</p>
            </div>
            <div className="absolute -right-12 -top-12 size-40 rotate-12 rounded-[2rem] border border-[#71d7d5]/20" />
          </article>
        ))}
      </div>
    </section>

    <section className="overflow-hidden rounded-[2.5rem] bg-[#071011] text-white">
      <div className="grid lg:grid-cols-2">
        <div className="p-7 md:p-12">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[#71d7d5]">A network that can recover</p>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">A path disappears. Another path forms.</h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/62">The first research milestone is a simulation where an operator can remove a virtual node and watch traffic find a viable route around it.</p>
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            <Zap className="h-4 w-4 text-[#71d7d5]" aria-hidden="true" /> Development target · Phase 01
          </div>
        </div>
        <div className="min-h-[430px] border-t border-white/10 bg-[radial-gradient(circle_at_center,rgba(35,137,143,0.24),transparent_54%)] p-4 lg:border-l lg:border-t-0 md:p-8">
          <MeshGraphic compact />
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <p className="mb-caption text-primary">Where it could matter</p>
      <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Built for places where connectivity cannot be taken for granted.</h2>
      <div className="mt-12 divide-y divide-border border-y border-border">
        {deployments.map((item, index) => (
          <article key={item.name} className="grid gap-5 py-7 md:grid-cols-[4rem_0.65fr_1.35fr] md:items-start md:py-9">
            <span className="font-mono text-xs font-semibold text-primary">0{index + 1}</span>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{item.name}</h3>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="rounded-[2.5rem] bg-secondary p-7 md:p-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-caption text-primary">Development path</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-foreground md:text-6xl">Simulate. Emulate. Deploy.</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <TriangleAlert className="h-4 w-4" aria-hidden="true" /> Research plan · not a deployment claim
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {phases.map((item) => (
          <article key={item.phase} className="rounded-2xl border border-border bg-card p-6 md:p-7">
            <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.15em] text-primary">{item.phase}</p>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground">{item.title}</h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="py-24 text-center md:py-32">
      <p className="mb-caption text-primary">The ambition</p>
      <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground md:text-7xl">Keep people connected when the infrastructure around them changes.</h2>
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Tessera is MathBrooks research into network resilience: transforming complex routing intelligence into infrastructure that operators can understand and communities can depend on.</p>
    </section>
  </>
);

export default TesseraExperience;
