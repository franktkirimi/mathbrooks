import { useTheme } from "@/hooks/useTheme";

const HeroScene = () => {
  const { isDark } = useTheme();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 18% 18%, hsl(var(--primary) / 0.12) 0%, transparent 34%), radial-gradient(circle at 82% 22%, hsl(var(--primary) / 0.16) 0%, transparent 28%), radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.08) 0%, transparent 38%)"
            : "radial-gradient(circle at 18% 18%, hsl(var(--primary) / 0.08) 0%, transparent 32%), radial-gradient(circle at 82% 22%, hsl(var(--primary) / 0.1) 0%, transparent 24%), radial-gradient(circle at 50% 100%, hsl(192 68% 82% / 0.2) 0%, transparent 34%)",
        }}
      />

      <div
        className="absolute left-[6%] top-[14%] h-[18rem] w-[18rem] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 72%)"
            : "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 72%)",
          animation: "orbFloat1 18s ease-in-out infinite",
        }}
      />

      <div
        className="absolute right-[-4rem] top-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, hsl(var(--primary) / 0.16) 0%, transparent 72%)"
            : "radial-gradient(circle, hsl(192 68% 78% / 0.18) 0%, transparent 72%)",
          animation: "orbFloat2 20s ease-in-out infinite",
        }}
      />

      {!isDark ? (
        <>
          <div
            className="absolute right-[8%] top-[18%] hidden h-[18rem] w-[18rem] rounded-[2.8rem] backdrop-blur-sm lg:block"
            style={{
              border: "1px solid rgb(148 163 184 / 0.18)",
              background: "linear-gradient(180deg, rgb(255 255 255 / 0.78), rgb(248 250 252 / 0.44))",
              boxShadow: "0 30px 90px rgba(148,163,184,0.18)",
            }}
          />
          <div
            className="absolute right-[16%] top-[26%] hidden h-[14rem] w-[14rem] rounded-[2.4rem] lg:block"
            style={{
              border: "1px solid rgb(148 163 184 / 0.16)",
              background: "linear-gradient(180deg, rgb(255 255 255 / 0.68), rgb(241 245 249 / 0.38))",
            }}
          />
          <div
            className="absolute bottom-[10%] left-[40%] hidden h-28 w-28 rounded-[2rem] lg:block"
            style={{
              border: "1px solid rgb(148 163 184 / 0.14)",
              background: "rgb(255 255 255 / 0.58)",
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default HeroScene;
