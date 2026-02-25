// components/admin/CalculatorPreview.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CalculatorPreviewProps {
  config: any
}

export function CalculatorPreview({ config }: CalculatorPreviewProps) {
  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground italic">
          Live Preview (Work in Progress)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          {/* Component icon or similar */}
        </div>
        <h3 className="font-semibold mb-1">Calculator UI Mockup</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">
          Previewing with {config.inputs?.length || 0} inputs and {config.results?.length || 0} results.
        </p>
      </CardContent>
    </Card>
  )
}
