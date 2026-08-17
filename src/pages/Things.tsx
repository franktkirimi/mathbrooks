import SokoA01Experience from "@/components/SokoA01Experience";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";

const Things = () => {
  usePageMeta({
    title: "MathBrooks Things | Research for the real world",
    description: "MathBrooks Things is our research wing, focused on practical hardware and intelligent software for real-world problems. Meet Soko A01, a humanoid general hand designed to help reduce risk in demanding work.",
    canonicalPath: "/things",
    keywords: ["MathBrooks Things", "Soko A01", "industrial humanoid robot", "field robotics", "hazardous work robotics"],
  });

  return (
    <SiteLayout>
      <div className="px-6 pb-28 pt-28 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <section className="max-w-4xl pb-10 pt-8 md:pb-12 md:pt-14">
            <h1 className="font-body text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">MathBrooks Things</h1>
            <p className="mt-5 max-w-2xl text-xl font-medium leading-8 text-foreground md:text-2xl md:leading-9">Our research wing, currently focused on bringing hardware and software together.</p>
          </section>
          <SokoA01Experience />
          <section className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
            <p className="mx-auto max-w-2xl text-base font-light leading-7 text-muted-foreground md:text-lg md:leading-8">We start with real conditions and explore useful tools that can reduce risk while keeping people in control. Soko A01 is our first humanoid research programme.</p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Things;
