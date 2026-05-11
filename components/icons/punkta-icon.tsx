import Image from "next/image";

type PunktaPlIconProps = {
  className?: string;
};

export function PunktaPlIcon({ className }: PunktaPlIconProps) {
  return (
    <div className={className}>
      <Image
        src="/logo-punkta-pl.png"
        alt="Punkta.pl"
        width={320}
        height={107}
        className="size-full object-contain brightness-0 dark:invert"
      />
    </div>
  );
}
