import Image from "next/image";

type UnivioG4nIconProps = {
  className?: string;
  imageClassName?: string;
};

export function UnivioG4nIcon({ className }: UnivioG4nIconProps) {
  return (
    <div className={className}>
      <Image
        src="/univio_g4n.webp"
        alt="Univio G4N"
        width={512}
        height={512}
        className={"size-full object-contain brightness-0 dark:invert"}
      />
    </div>
  );
}
