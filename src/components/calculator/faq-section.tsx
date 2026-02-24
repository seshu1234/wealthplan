import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FaqSection({ items, title = "Frequently Asked Questions" }: FaqSectionProps) {
  if (!items || items.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-semibold text-foreground">{item.question}</h3>
            <p className="text-sm text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
