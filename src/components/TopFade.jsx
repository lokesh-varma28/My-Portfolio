export default function TopFade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 h-32 z-40"
      style={{
        background:
          'linear-gradient(to bottom, var(--page-bg) 0%, var(--page-bg) 50%, color-mix(in srgb, var(--page-bg) 80%, transparent) 75%, transparent 100%)',
      }}
    />
  );
}
