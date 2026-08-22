import SiteLayout from "@/components/site/SiteLayout";
import { thingsProjects } from "@/content/thingsProjects";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowUpRight, Bot, Languages, Network, Satellite, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const projectIcons = {
  "soko-a01": Bot,
  tessera: Network,
  "zimbabwe-language-intelligence": Languages,
  "zimbabwe-earth-intelligence": Satellite,
  "resilient-energy-intelligence": Zap,
};

const Things = () => {
  usePageMeta({
    title: "MathBrooks Things | Research Portfolio",
    description: "MathBrooks Things is our research portfolio for embodied intelligence, inclusive language intelligence, national environmental data, and resilient infrastructure.",
    canonicalPath: "/research",
    keywords: ["MathBrooks Things", "Zimbabwe research", "SOKO A01", "Ilwimi", "neFI", "Zimbabwe environmental data", "energy intelligence"],
  });

  return (
    <SiteLayout>
      <div className="px-6 pb-28 pt-28 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <section className="border-b border-border pb-14 pt-8 md:pb-20 md:pt-14">
            <p className="mb-caption text-primary">Researching future infrastructure</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              MathBrooks Things
            </h1>
            <p className="mt-7 max-w-3xl text-xl font-medium leading-8 text-foreground md:text-2xl md:leading-9">
              Researching technologies for the physical, digital, and environmental systems shaping our future.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              We explore ambitious problems in robotics, African language intelligence, climate resilience, energy, and critical infrastructure—starting from conditions experienced here and building for wider relevance.
            </p>
          </section>

          <section className="pt-16 md:pt-24" aria-labelledby="research-portfolio">
            <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
              <div>
                <p className="mb-caption text-primary">Research portfolio</p>
                <h2 id="research-portfolio" className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-foreground md:text-6xl">
                  What we are exploring.
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-muted-foreground md:text-right">
                Active programmes sit alongside research directions that are still being formed and tested.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {thingsProjects.map((project, index) => {
                const Icon = projectIcons[project.slug as keyof typeof projectIcons];
                const isSoko = project.slug === "soko-a01";
                const isTessera = project.slug === "tessera";
                const isIlwimi = project.slug === "zimbabwe-language-intelligence";
                const isNefi = project.slug === "zimbabwe-earth-intelligence";
                const hasDarkArtwork = isSoko || isTessera || isIlwimi || isNefi;

                return (
                  <Link
                    key={project.slug}
                    to={`/research/${project.slug}`}
                    className="group relative flex min-h-[31rem] flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-overlay)] md:p-9"
                  >
                    {isSoko ? (
                      <>
                        <img
                          src="/soko-a01-hazardous-work-v2.png"
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-[62%_center] transition duration-700 group-hover:scale-[1.025]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,7,0.24)_0%,rgba(4,8,7,0.82)_58%,rgba(4,8,7,0.98)_100%)]" />
                      </>
                    ) : isTessera ? (
                      <div className="absolute inset-0 overflow-hidden bg-[#071011]">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(113,215,213,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(113,215,213,0.055)_1px,transparent_1px)] bg-[size:42px_42px]" />
                        <svg viewBox="0 0 600 500" className="absolute inset-0 h-full w-full opacity-75" aria-hidden="true">
                          <g fill="none" stroke="#75c8c7" strokeOpacity="0.22" strokeWidth="2">
                            <path d="M65 110L195 65L300 160L445 92L545 188M65 110L145 270L300 160M145 270L88 410L252 450L386 338L545 188M300 160L386 338L520 425" />
                          </g>
                          <path d="M65 110L145 270L88 410L252 450L386 338L545 188" fill="none" stroke="#65d8d6" strokeWidth="4" strokeDasharray="9 13" className="tessera-route-flow" />
                          {[[65,110],[195,65],[300,160],[445,92],[545,188],[145,270],[88,410],[252,450],[386,338],[520,425]].map(([x,y], nodeIndex) => <rect key={`${x}-${y}`} x={x-11} y={y-11} width="22" height="22" rx="5" fill={nodeIndex === 2 ? "#3d2020" : "#0e1c1d"} stroke={nodeIndex === 2 ? "#f16f67" : "#75c8c7"} />)}
                        </svg>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(7,16,17,0.34)_50%,rgba(7,16,17,0.98)_100%)]" />
                      </div>
                    ) : isIlwimi ? (
                      <div className="absolute inset-0 overflow-hidden bg-black">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(63,179,176,0.48),transparent_32%),radial-gradient(circle_at_12%_70%,rgba(244,130,67,0.2),transparent_30%)]" />
                        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:46px_46px]" />
                        <div className="absolute right-5 top-24 grid rotate-[-7deg] grid-cols-2 gap-2 font-mono text-[0.62rem] font-semibold tracking-[0.13em] text-white/75">
                          {["SHONA", "NDEBELE", "ENGLISH", "NDAU"].map((language, languageIndex) => (
                            <span key={language} className={`border px-3 py-3 ${languageIndex === 1 ? "border-[#71d7d5] bg-[#71d7d5] text-black" : "border-white/25 bg-black/25"}`}>{language}</span>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_8%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.98)_100%)]" />
                      </div>
                    ) : isNefi ? (
                      <div className="absolute inset-0 overflow-hidden bg-[#071b0d]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(142,209,79,0.35),transparent_34%),radial-gradient(circle_at_12%_74%,rgba(39,111,75,0.42),transparent_34%)]" />
                        <svg viewBox="0 0 600 500" className="absolute -right-16 top-10 h-[72%] w-[92%] opacity-75" aria-hidden="true">
                          <g fill="none" stroke="#b6ed83" strokeOpacity="0.22">
                            <path d="M35 355C114 205 260 144 406 190C501 220 559 290 582 395" strokeWidth="2" />
                            <path d="M5 390C100 174 279 78 459 155C553 195 608 290 615 430" />
                            <path d="M92 365C167 259 278 221 380 250C451 270 506 324 521 397" strokeWidth="1.5" />
                            <path d="M150 395C211 330 285 309 354 324C412 337 455 373 469 420" />
                          </g>
                          {[[35,355],[114,205],[260,144],[406,190],[501,220],[582,395],[92,365],[278,221],[380,250],[521,397]].map(([x,y], pointIndex) => <circle key={`${x}-${y}`} cx={x} cy={y} r={pointIndex % 3 === 0 ? 5 : 3} fill="#b6ed83" />)}
                        </svg>
                        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(181,237,131,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(181,237,131,0.2)_1px,transparent_1px)] [background-size:46px_46px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_8%,rgba(7,27,13,0.24)_48%,rgba(7,27,13,0.99)_100%)]" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,hsl(var(--card))_0%,hsl(var(--secondary))_100%)]">
                        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-primary/15" />
                        <div className="absolute -right-8 -top-4 h-44 w-44 rounded-full border border-primary/20" />
                        <div className="absolute bottom-24 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                      </div>
                    )}

                    <div className={`relative z-10 flex items-center justify-between ${hasDarkArtwork ? "text-white" : "text-foreground"}`}>
                      <span className={`mb-caption ${isSoko ? "text-[#f5a170]" : isTessera || isIlwimi ? "text-[#71d7d5]" : isNefi ? "text-[#b6ed83]" : "text-primary"}`}>
                        {project.code} · {project.domain}
                      </span>
                      <Icon className={`h-6 w-6 ${hasDarkArtwork ? "text-white/70" : "text-primary"}`} strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    <div className="relative z-10 mt-auto">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                        hasDarkArtwork
                          ? "border-white/25 bg-black/20 text-white/80"
                          : project.status === "Active programme"
                            ? "border-primary/25 bg-primary/5 text-primary"
                            : "border-border bg-background/70 text-muted-foreground"
                      }`}>
                        {project.status}
                      </span>
                      <h3 className={`mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-4xl ${hasDarkArtwork ? "text-white" : "text-foreground"}`}>
                        {project.name}
                      </h3>
                      {project.expansion && (
                        <p className={`mt-3 text-sm font-medium tracking-[0.02em] ${hasDarkArtwork ? "text-white/70" : "text-foreground/70"}`}>{project.expansion}</p>
                      )}
                      <p className={`mt-4 max-w-md text-base leading-7 ${hasDarkArtwork ? "text-white/75" : "text-muted-foreground"}`}>
                        {project.summary}
                      </p>
                      <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${hasDarkArtwork ? "text-white" : "text-primary"}`}>
                        Explore project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-20 grid gap-8 border-t border-border pt-12 md:mt-28 md:grid-cols-[0.8fr_1.2fr] md:pt-16">
            <p className="mb-caption text-primary">How Things works</p>
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
                Build evidence before making claims.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                Each programme begins as a question. We investigate the data, engineering, safety, and operating conditions required to turn that question into operational capability. Programme labels make the difference between active work and a direction still taking shape clear.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Things;
