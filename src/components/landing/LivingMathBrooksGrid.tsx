import { useReducedMotion } from "@/hooks/useReducedMotion";

const LivingMathBrooksGrid = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="human-signal-visual relative mx-auto aspect-[7/6] w-full max-w-[46rem] select-none lg:h-full lg:max-w-none">
      <svg viewBox="0 0 700 600" preserveAspectRatio="xMidYMid slice" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id="mb-signal-spectrum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#62e8e5" />
            <stop offset="0.34" stopColor="#3488ff" />
            <stop offset="0.65" stopColor="#7557ff" />
            <stop offset="0.84" stopColor="#ff667f" />
            <stop offset="1" stopColor="#ffb34a" />
          </linearGradient>
          <linearGradient id="mb-signal-cool" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0ca9b6" />
            <stop offset="0.55" stopColor="#48dfe0" />
            <stop offset="1" stopColor="#5068ff" />
          </linearGradient>
          <filter id="mb-signal-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        <g className={reducedMotion ? "opacity-90" : "mb-signal-ribbons"}>
          <path d="M690 -55C580 57 615 151 512 215C414 272 425 342 520 406C598 459 639 514 692 655" fill="none" stroke="url(#mb-signal-spectrum)" strokeWidth="138" strokeLinecap="round" opacity="0.42" filter="url(#mb-signal-blur)" />
          <path d="M708 -52C586 64 612 156 506 221C403 284 431 350 529 413C608 465 652 523 703 655" fill="none" stroke="url(#mb-signal-spectrum)" strokeWidth="90" strokeLinecap="round" opacity="0.96" />
          <path d="M665 -42C538 73 563 173 475 238C397 295 416 369 493 430C555 480 597 526 632 650" fill="none" stroke="url(#mb-signal-cool)" strokeWidth="30" strokeLinecap="round" opacity="0.88" />
          <path d="M693 64C608 124 589 180 534 223" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        </g>

      </svg>
    </div>
  );
};

export default LivingMathBrooksGrid;
