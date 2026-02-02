import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const codeSnippets = [
  "import torch",
  "model = AutoModel.from_pretrained('mathbrooks-7b')",
  "optimizer = torch.optim.AdamW(model.parameters(), lr=3e-5)",
  "loss = criterion(outputs, labels)",
  "predictions = model.generate(**inputs, max_new_tokens=512)",
  "df = pd.read_csv('telemetry.csv')",
  "pipeline = Pipeline([('scaler', StandardScaler()), ('clf', XGBClassifier())])",
  "async def ingest(stream: AsyncIterator):",
  "torch.distributed.init_process_group('nccl')",
  "embeddings = encoder.encode(documents, batch_size=64)",
  "yield from map(transform, batch)",
  "cache.set(f'pred:{farm_id}', result, ttl=3600)",
  "metrics = evaluate(y_true, y_pred, average='macro')",
  "conn = asyncpg.connect(dsn=DATABASE_URL)",
  "scheduler = CosineAnnealingLR(optimizer, T_max=100)",
  "grads = torch.autograd.grad(loss, params)",
  "with torch.cuda.amp.autocast():",
  "response = await client.chat.completions.create(",
  "np.random.seed(42)",
  "for epoch in range(num_epochs):",
];

const FloatingCode = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans: HTMLSpanElement[] = [];
    let running = true;

    // Zones that avoid the center content area
    const pickPosition = () => {
      const zone = Math.random();
      if (zone < 0.25) {
        // Top strip
        return { left: Math.random() * 90 + 5, top: Math.random() * 18 + 2 };
      } else if (zone < 0.5) {
        // Bottom strip
        return { left: Math.random() * 90 + 5, top: Math.random() * 18 + 80 };
      } else if (zone < 0.75) {
        // Left strip
        return { left: Math.random() * 15 + 2, top: Math.random() * 60 + 20 };
      } else {
        // Right strip
        return { left: Math.random() * 15 + 83, top: Math.random() * 60 + 20 };
      }
    };

    const spawnSnippet = () => {
      if (!running || !container) return;

      const pos = pickPosition();
      const span = document.createElement("span");
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      span.textContent = snippet;
      span.style.cssText = `
        position: absolute;
        white-space: nowrap;
        font-family: 'Courier New', monospace;
        font-size: ${10 + Math.random() * 3}px;
        color: hsl(var(--primary));
        opacity: 0;
        pointer-events: none;
        left: ${pos.left}%;
        top: ${pos.top}%;
        animation: codeFloat ${6 + Math.random() * 4}s ease-in-out forwards;
      `;

      container.appendChild(span);
      spans.push(span);

      span.addEventListener("animationend", () => {
        span.remove();
        const idx = spans.indexOf(span);
        if (idx > -1) spans.splice(idx, 1);
      });

      const next = 800 + Math.random() * 1500;
      if (running) setTimeout(spawnSnippet, next);
    };

    // Stagger initial spawns
    setTimeout(spawnSnippet, 500);
    setTimeout(spawnSnippet, 1200);
    setTimeout(spawnSnippet, 2000);

    return () => {
      running = false;
      spans.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          }}
        />
        {/* Breathing grid */}
        <div
          className="absolute inset-0"
          style={{
            animation: "breatheGrid 8s ease-in-out infinite",
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Floating code snippets */}
        <FloatingCode />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Brand mark */}
        <div className="mb-8 md:mb-16 animate-fade-in-up">
          <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
            MathBrooks
          </span>
        </div>

        {/* Headline — large, uppercase, tight */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold uppercase leading-[1.1] tracking-tight mb-6 md:mb-8 animate-fade-in-up-delay-1">
          Simplifying Complex Problems
          <br />
          <span className="text-gradient-accent glow-text">
            with Intelligent Software
          </span>
        </h1>

        {/* Subtext — single line, light */}
        <p className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14 animate-fade-in-up-delay-2">
          MathBrooks builds intelligent systems and autonomous AI for industries
          that power economies — from Africa to the world.
        </p>

        {/* CTA — thin outline, subtle hover glow */}
        <div className="animate-fade-in-up-delay-3">
          <Button
            variant="outline"
            size="lg"
            className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all duration-300 animate-pulse-glow"
            onClick={() =>
              document
                .getElementById("systems")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Our Vision
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground/60" />
      </div>
    </section>
  );
};

export default Hero;
