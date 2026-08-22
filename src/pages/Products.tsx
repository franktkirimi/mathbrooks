import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  Cable,
  Check,
  Cpu,
  PhoneCall,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

const problems = [
  {
    number: "01",
    title: "Too much work lives in spreadsheets",
    copy: "Critical processes depend on manual updates, memory, and repeated checking.",
  },
  {
    number: "02",
    title: "Your systems do not talk to each other",
    copy: "Teams move the same information between tools and lose context along the way.",
  },
  {
    number: "03",
    title: "Decisions wait for the data",
    copy: "The information exists, but not in a form people can use at the moment it matters.",
  },
  {
    number: "04",
    title: "Standard software stops short",
    copy: "The workflow is specific, the constraints are real, and a generic setup cannot carry it.",
  },
];

const capabilities = [
  {
    title: "Custom software",
    copy: "Internal platforms, operational tools, and client-facing systems built around the work itself.",
    Icon: Cpu,
  },
  {
    title: "Workflow automation",
    copy: "Approvals, handovers, reminders, and reporting connected into one dependable flow.",
    Icon: Workflow,
  },
  {
    title: "Applied AI and agents",
    copy: "Governed intelligence inside live operations, with clear boundaries and human control.",
    Icon: BrainCircuit,
  },
  {
    title: "Voice and connected systems",
    copy: "Phone, device, and network interactions designed for the conditions where the work happens.",
    Icon: PhoneCall,
  },
];

const deliverySteps = [
  ["01", "Understand", "We map the people, process, constraints, and outcome that matter."],
  ["02", "Choose", "We identify what should be configured, connected, automated, or built."],
  ["03", "Deliver", "We ship the smallest production-ready system and test it under real conditions."],
  ["04", "Strengthen", "We stabilise the workflow, document it, and plan what comes next."],
];

const Products = () => {
  usePageMeta({
    title: "Systems Architecture | MathBrooks",
    description: "Deploy MathBrooks products or commission custom software, automation, AI, and connected infrastructure.",
    canonicalPath: "/solutions",
    keywords: ["MathBrooks solutions", "custom software Zimbabwe", "workflow automation", "applied AI systems"],
  });

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-white px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <AnimatedSection className="relative z-10 max-w-4xl">
            <p className="mb-caption text-primary">Systems architecture</p>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-black">
              Choose the architecture <span className="text-primary">your mission requires.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black md:text-xl md:leading-9">
              Deploy production-ready products or architect custom software, automation, AI, and connected infrastructure around your operating requirements.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link to="/contact">Request Systems Brief <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/solutions/available">Compare Deployable Products</Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-black p-5 text-white shadow-[var(--shadow-overlay)] sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(55,159,155,0.62),transparent_31%),radial-gradient(circle_at_14%_88%,rgba(244,130,67,0.26),transparent_28%)]" />
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/20 pb-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/65">
                  <span>System map · 01</span>
                  <span className="text-[#71d7d5]">Operational outcome</span>
                </div>
                <div className="my-auto space-y-3">
                  {[
                    ["Observe", "People · data · conditions", Boxes],
                    ["Connect", "Tools · devices · workflows", Cable],
                    ["Reason", "Rules · AI · human judgment", BrainCircuit],
                    ["Act", "A system people can use", Bot],
                  ].map(([label, detail, Icon], index) => {
                    const LayerIcon = Icon as typeof Boxes;
                    return (
                      <div key={label as string} className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 rounded-xl border p-4 ${index === 3 ? "border-[#71d7d5] bg-[#71d7d5] text-black" : "border-white/20 bg-white/[0.04]"}`}>
                        <LayerIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        <div>
                          <p className="font-display text-base font-semibold">{label as string}</p>
                          <p className={`mt-1 text-xs ${index === 3 ? "text-black/65" : "text-white/55"}`}>{detail as string}</p>
                        </div>
                        <span className="font-mono text-xs">0{index + 1}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-white/45">Designed around operating conditions</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-y border-black bg-[#f6fbfa] px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-4xl">
            <p className="mb-caption text-primary">Start with the problem</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-6xl">You do not need to arrive with a technical brief.</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black bg-black md:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <article key={problem.number} className="min-h-64 bg-white p-6 md:p-8">
                <p className="font-mono text-xs font-semibold text-primary">{problem.number}</p>
                <h3 className="mt-10 font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-black">{problem.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black">{problem.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="mb-caption text-primary">Choose a starting point</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-6xl">Custom when the workflow is specific. Ready-made when the need repeats.</h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <AnimatedSection>
              <article className="flex min-h-[32rem] h-full flex-col overflow-hidden rounded-[2rem] bg-black p-7 text-white md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#71d7d5]">01 · Custom systems</span>
                  <Cpu className="h-6 w-6 text-white/60" strokeWidth={1.5} />
                </div>
                <div className="mt-auto">
                  <h3 className="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">Built around your operation.</h3>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/70">For processes that cross systems, carry unusual rules, or matter too much to force into a generic setup.</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {["Custom software", "Workflow automation", "Applied AI", "Connected technology"].map((item) => <li key={item} className="flex items-center gap-2 text-sm text-white"><Check className="h-4 w-4 text-[#71d7d5]" />{item}</li>)}
                  </ul>
                  <Link to="/services" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white">Architect a Custom System <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <article className="flex min-h-[32rem] h-full flex-col overflow-hidden rounded-[2rem] border border-black bg-[#dff5f2] p-7 text-black md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">02 · Deployable products</span>
                  <Boxes className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div className="mt-auto">
                  <h3 className="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">Start from something proven.</h3>
                  <p className="mt-6 max-w-xl text-base leading-8 text-black">For repeatable needs across people, customers, finance, projects, inventory, reporting, and everyday operations.</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {["HR and payroll", "CRM", "Finance", "Operations"].map((item) => <li key={item} className="flex items-center gap-2 text-sm text-black"><Check className="h-4 w-4 text-primary" />{item}</li>)}
                  </ul>
                  <Link to="/solutions/available" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-black">Compare Deployable Products <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-y border-black bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <AnimatedSection>
              <p className="mb-caption text-primary">What we can bring together</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-6xl">One system can use several kinds of technology.</h2>
            </AnimatedSection>
            <div className="grid gap-px overflow-hidden rounded-xl border border-black bg-black sm:grid-cols-2">
              {capabilities.map(({ title, copy, Icon }) => (
                <article key={title} className="bg-white p-6 md:p-8">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em] text-black">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#71d7d5]">How we work</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">Enough process to reduce risk. Enough speed to make progress.</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/25 bg-white/25 md:grid-cols-4">
            {deliverySteps.map(([number, title, copy]) => (
              <article key={number} className="min-h-64 bg-black p-6 md:p-8">
                <p className="font-mono text-xs font-semibold text-[#71d7d5]">{number}</p>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28">
        <AnimatedSection className="mx-auto max-w-5xl text-center">
          <p className="mb-caption text-primary">Your next step</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-6xl">Bring us the problem—not the specification.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black">We will help determine whether the right answer is an available solution, a custom system, or a combination of both.</p>
          <Button asChild size="lg" className="mt-9">
            <Link to="/contact">Request Systems Brief <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </AnimatedSection>
      </section>
    </SiteLayout>
  );
};

export default Products;
