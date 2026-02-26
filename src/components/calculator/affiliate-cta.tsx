import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAffiliate } from "@/config/affiliate-map";
import { ExternalLink } from "lucide-react";

interface AffiliateCTAProps {
  calculatorId: string;
}

export function AffiliateCTA({ calculatorId }: AffiliateCTAProps) {
  const offer = getAffiliate(calculatorId);

  return (
    <Card className="border-[hsl(var(--accent-brand))] bg-[hsl(var(--accent-brand-muted))] dark:bg-[hsl(var(--accent-brand-muted-dark))]">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground">{offer.title}</p>
            {offer.badge && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--accent-brand))] text-white shrink-0">
                {offer.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{offer.description}</p>
        </div>
        <Button variant="default" className="w-full sm:w-auto shrink-0" asChild>
          <a href={offer.href} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2">
            {offer.cta}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
