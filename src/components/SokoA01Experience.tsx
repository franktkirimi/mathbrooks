const fieldStories = [
  {
    title: "Crop inspection.",
    detail: "Reading the field, one row at a time.",
    image: "/soko-a01-crop-inspection-v4.png",
    position: "object-[66%_center]",
  },
  {
    title: "Precision application.",
    detail: "Putting careful work close to the crop—not the worker.",
    image: "/soko-a01-precision-application-v4.png",
    position: "object-[48%_center]",
  },
  {
    title: "Irrigation & soil sensing.",
    detail: "Checking the conditions that keep a field moving.",
    image: "/soko-a01-irrigation-soil-v4.png",
    position: "object-[67%_center]",
  },
];

const SokoA01Experience = () => {
  return (
    <>
      <figure className="relative min-h-[680px] overflow-hidden rounded-[2.5rem] bg-[#101211] shadow-[0_32px_80px_hsl(var(--foreground)/0.14)] lg:min-h-[760px]">
        <img
          src="/soko-a01-hazardous-work-v2.png"
          alt="Soko A01, a humanoid industrial robot, carefully handling a process vessel in a hazardous work environment."
          className="absolute inset-0 h-full w-full object-cover object-[63%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,8,0.96)_0%,rgba(6,8,8,0.87)_28%,rgba(6,8,8,0.34)_55%,rgba(6,8,8,0.04)_78%)]" />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-7 text-white md:p-12">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#f48243]">Research programme · 01</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-7xl">Soko A01</h2>
            <p className="mt-6 max-w-sm text-xl font-medium leading-8 md:text-2xl">A humanoid general hand for difficult work.</p>
            <p className="mt-3 max-w-sm text-base font-light leading-6 text-white/72">Being developed to help reduce people’s exposure to risk in demanding labour—across farms, mines, and hazardous environments.</p>
          </div>

          <figcaption className="flex items-end justify-between border-t border-white/20 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/72">
            <span>01 — Soko A01</span>
            <span className="hidden text-[#f48243] sm:inline">MathBrooks Things</span>
          </figcaption>
        </div>
      </figure>

      <div className="mt-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-primary">Soko A01 in agriculture</p>
            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">In the field.</h3>
          </div>
          <p className="hidden max-w-xs text-right text-base font-light leading-6 text-muted-foreground md:block">The same capable machine, configured for the work at hand.</p>
        </div>

        <div className="space-y-7">
          {fieldStories.map((story, index) => (
            <figure key={story.title} className="group relative min-h-[450px] overflow-hidden rounded-[2rem] bg-[#26302b] md:min-h-[560px]">
              <img src={story.image} alt={`Soko A01 in an agricultural field: ${story.title.replace(".", "")}`} className={`absolute inset-0 h-full w-full object-cover ${story.position}`} loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,12,0.76)_0%,rgba(10,15,12,0.38)_37%,rgba(10,15,12,0.02)_70%)]" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-7 text-white md:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5a170]">0{index + 2} — Field work</p>
                  <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{story.title}</h4>
                  <p className="mt-3 max-w-sm text-base font-light leading-6 text-white/78">{story.detail}</p>
                </div>
                <span className="hidden rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/85 sm:block">Soko A01</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.17em] text-primary">Soko A01</p>
        <h3 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">One humanoid general hand. Many kinds of work. Less risk to people.</h3>
        <p className="mt-6 text-base font-light text-muted-foreground">MathBrooks Things — Researching useful machines for the real world.</p>
      </div>
    </>
  );
};

export default SokoA01Experience;
