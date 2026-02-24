import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AffiliateCTA() {
  return (
    <Card className="border-[hsl(var(--accent-brand))] bg-[hsl(var(--accent-brand-muted))] dark:bg-[hsl(var(--accent-brand-muted-dark))]">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground">Ready to start investing?</p>
          <p className="text-sm text-muted-foreground">
            Open a Roth IRA with Fidelity — no minimums, no fees.
          </p>
        </div>
        <Button variant="default" className="w-full sm:w-auto" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Open Account →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
