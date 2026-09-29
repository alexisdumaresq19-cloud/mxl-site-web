import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-sm font-medium text-mxl-blue-light">{eyebrow}</p>
      <h2
        id={id}
        className="mt-2 bg-linear-to-br from-white via-white to-white/40 bg-clip-text pb-1 text-3xl font-semibold tracking-tight text-balance text-transparent md:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-balance text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}
