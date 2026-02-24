import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQItem {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: FAQItem[] }) {
  if (!items || items.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-semibold text-foreground">{item.q}</h3>
            <p className="text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
