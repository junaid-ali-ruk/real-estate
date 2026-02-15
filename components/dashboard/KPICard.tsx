import { type ColorVariant, colorVariants } from "@/lib/styles";

type KPICardProps = {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: ColorVariant;
};

export function KPICard({ title, value, icon: Icon, color }: KPICardProps) {
  return (
    <div className="bg-background rounded-none border border-border p-8 shadow-editorial transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-8">
        <div
          className={`w-10 h-10 border border-primary/20 flex items-center justify-center ${colorVariants[color]}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Stats</div>
      </div>
      <div className="text-4xl font-heading font-bold tracking-tighter tabular-nums mb-1">
        {value}
      </div>
      <div className="h-px w-8 bg-primary mb-4" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
    </div>
  );
}
