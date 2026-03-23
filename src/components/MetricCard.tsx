import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  detail?: string;
  index?: number;
}

export function MetricCard({ label, value, icon: Icon, detail, index = 0 }: MetricCardProps) {
  return (
    <div
      className="rounded-lg border border-border bg-card p-5 opacity-0 animate-fade-in group hover:border-primary/30 transition-colors duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground font-mono">
            {value}
          </p>
          {detail && (
            <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
          )}
        </div>
        <div className="rounded-md bg-secondary p-2 group-hover:bg-primary/10 transition-colors duration-200">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
}
