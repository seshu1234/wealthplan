import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "positive" | "negative" | "muted";
}

export function ResultCard({ label, value, sublabel, variant = "default" }: ResultCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "positive": return "text-[hsl(var(--accent-brand))]";
      case "negative": return "text-red-500";
      case "muted": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  return (
    <div className="bg-muted rounded-lg p-4 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className={cn("text-2xl font-bold tabular-nums", getVariantStyles())}>
        {value}
      </p>
      {sublabel && (
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
