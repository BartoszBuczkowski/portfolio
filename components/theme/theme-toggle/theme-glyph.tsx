export function ThemeGlyph({ id, src }: { id: string; src: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <use href={`${src}#${id}`} width="24" height="24" />
    </svg>
  );
}
