export function HeroBackground() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 80% 70% at 50% 45%,
            transparent 0%,
            transparent 35%,
            var(--background) 75%,
            var(--background) 100%
          )`,
        }}
      />
    </>
  );
}
