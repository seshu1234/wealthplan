import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function ResultGrid({ children, columns = 2 }: ResultGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-2 md:grid-cols-3",
        columns === 4 && "grid-cols-2 md:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}
