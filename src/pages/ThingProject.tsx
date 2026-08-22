import IlwimiExperience from "@/components/IlwimiExperience";
import NefiExperience from "@/components/NefiExperience";
import SokoA01Experience from "@/components/SokoA01Experience";
import TesseraExperience from "@/components/TesseraExperience";
import SiteLayout from "@/components/site/SiteLayout";
import { getThingsProject, thingsProjects } from "@/content/thingsProjects";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowLeft, ArrowRight, Bot, Languages, Network, Satellite, Zap } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const projectIcons = {
  "soko-a01": Bot,
  tessera: Network,
  "zimbabwe-language-intelligence": Languages,
  "zimbabwe-earth-intelligence": Satellite,
  "resilient-energy-intelligence": Zap,
};

const ThingProject = () => {
  const { slug } = useParams();
  const project = getThingsProject(slug);

  usePageMeta({
    title: project ? `${project.name} | MathBrooks Things` : "MathBrooks Things",
    description: project?.summary ?? "Explore the MathBrooks Things research portfolio.",
    canonicalPath: project ? `/research/${project.slug}` : "/research",
    keywords: project ? ["MathBrooks Things", project.name, project.domain] : ["MathBrooks Things"],
  });

  if (!project) return <Navigate to="/research" replace />;

  const Icon = projectIcons[project.slug as keyof typeof projectIcons];
  const isSoko = project.slug === "soko-a01";
  const isTessera = project.slug === "tessera";
  const isIlwimi = project.slug === "zimbabwe-language-intelligence";
  const isNefi = project.slug === "zimbabwe-earth-intelligence";

  return (
    <SiteLayout>
      <div className="px-6 pb-28 pt-28 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Things projects
          </Link>

          <nav className="mt-8 overflow-x-auto border-y border-border" aria-label="Things research projects">
            <div className="flex min-w-max gap-8">
              {thingsProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/research/${item.slug}`}
                  aria-current={item.slug === project.slug ? "page" : undefined}
                  className={`relative py-4 text-sm font-semibold transition-colors ${
                    item.slug === project.slug ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-2 font-mono text-xs">{item.code}</span>
                  {item.shortName}
                  {item.slug === project.slug && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
                </Link>
              ))}
            </div>
          </nav>

          {isSoko ? (
            <div className="mt-10 md:mt-14">
              <SokoA01Experience />
            </div>
          ) : isTessera ? (
            <div className="mt-10 md:mt-14">
              <TesseraExperience />
            </div>
          ) : isIlwimi ? (
            <div className="mt-10 md:mt-14">
              <IlwimiExperience />
            </div>
          ) : isNefi ? (
            <div className="mt-10 md:mt-14">
              <NefiExperience />
            </div>
          ) : (
            <>
              <header className="grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-20">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="mb-caption text-primary">{project.code} · {project.domain}</span>
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl">
                    {project.name}
                  </h1>
                  <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-foreground md:text-2xl md:leading-9">
                    {project.summary}
                  </p>
                </div>
                <div className="relative hidden aspect-square max-w-sm justify-self-end overflow-hidden rounded-full border border-primary/15 bg-secondary md:block">
                  <div className="absolute inset-[14%] rounded-full border border-primary/20" />
                  <div className="absolute inset-[29%] rounded-full border border-primary/25" />
                  <Icon className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-primary" strokeWidth={1} aria-hidden="true" />
                </div>
              </header>

              <section className="rounded-[2rem] bg-[#0b1515] p-7 text-white md:p-12" aria-labelledby="research-question">
                <p className="mb-caption text-[#67c9c7]">The research question</p>
                <h2 id="research-question" className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  {project.question}
                </h2>
              </section>

              <div className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
                <section>
                  <p className="mb-caption text-primary">Why it matters</p>
                  <p className="mt-5 text-lg leading-8 text-foreground md:text-xl md:leading-9">{project.whyItMatters}</p>
                </section>
                <section>
                  <p className="mb-caption text-primary">Initial research scope</p>
                  <ol className="mt-5 divide-y divide-border border-y border-border">
                    {project.researchAreas.map((area, index) => (
                      <li key={area} className="flex gap-5 py-4 text-base leading-7 text-foreground">
                        <span className="font-mono text-xs font-semibold text-primary">0{index + 1}</span>
                        {area}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              <section className="grid gap-8 border-y border-border py-12 md:grid-cols-[0.8fr_1.2fr] md:py-16">
                <p className="mb-caption text-primary">Intended outcome</p>
                <p className="font-display text-2xl font-semibold leading-snug tracking-[-0.035em] text-foreground md:text-4xl">
                  {project.intendedOutcome}
                </p>
              </section>
            </>
          )}

          {!isNefi && (
            <section className="mt-20 flex flex-col justify-between gap-6 rounded-[2rem] bg-secondary p-7 md:mt-28 md:flex-row md:items-center md:p-10">
              <div>
                <p className="mb-caption text-primary">Research with us</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em] text-foreground md:text-3xl">
                  Have relevant expertise, data, or a real operating environment?
                </h2>
              </div>
              <Link to="/contact" className="button-primary shrink-0">
                Request Systems Brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          )}
        </div>
      </div>
    </SiteLayout>
  );
};

export default ThingProject;
