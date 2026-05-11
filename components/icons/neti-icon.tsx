import { cn } from "@/lib/utils";
import Image from "next/image";

type NetiIconProps = {
  className?: string;
  imageClassName?: string;
};

export function NetiIcon({ className, imageClassName }: NetiIconProps) {
  return (
    <div className={className}>
      <Image
        src="/neti.webp"
        alt="Neti"
        width={512}
        height={512}
        className={cn("object-contain brightness-0 dark:invert", imageClassName)}
      />
    </div>
  );
}
