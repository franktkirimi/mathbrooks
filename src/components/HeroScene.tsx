const HeroScene = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, hsl(var(--primary) / 0.12) 0%, transparent 34%), radial-gradient(circle at 82% 22%, hsl(var(--primary) / 0.16) 0%, transparent 28%), radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.08) 0%, transparent 38%)",
        }}
      />

      <div
        className="absolute left-[6%] top-[14%] h-[18rem] w-[18rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 72%)",
          animation: "orbFloat1 18s ease-in-out infinite",
        }}
      />

      <div
        className="absolute right-[-4rem] top-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.16) 0%, transparent 72%)",
          animation: "orbFloat2 20s ease-in-out infinite",
        }}
      />

    </div>
  );
};

export default HeroScene;
