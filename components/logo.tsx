export function Logo() {
  const name = "Bartosz Buczkowski";
  const location = "Rzeszów, Poland";

  return (
    <div>
      <p className="font-semibold tracking-tight text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground tech-stack-glitch">{location.toUpperCase()}</p>
    </div>
  );
}
