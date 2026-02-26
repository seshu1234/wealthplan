'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, LayoutGrid } from 'lucide-react'
import { CalculatorOutput } from '@/lib/calculator/engine'

interface OutputBuilderProps {
  value: CalculatorOutput[]
  onChange: (value: CalculatorOutput[]) => void
  availableVariables?: string[]
}

export function OutputBuilder({ value = [], onChange, availableVariables = [] }: OutputBuilderProps) {
  const addOutput = () => {
    const newOutput: CalculatorOutput = {
      id: `result_${Date.now()}`,
      label: 'New Result',
      formula: '',
      format: 'number',
      variant: 'neutral',
    }
    onChange([...value, newOutput])
  }

  const removeOutput = (id: string) => {
    onChange(value.filter((o) => o.id !== id))
  }

  const updateOutput = (id: string, updates: Partial<CalculatorOutput>) => {
    onChange(value.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Result Cards ({value.length})
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={addOutput}>
          <Plus className="h-4 w-4 mr-2" />
          Add Result
        </Button>
      </div>

      {availableVariables.length > 0 && (
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 border">
          <span className="font-semibold">Available variables: </span>
          {availableVariables.map((v) => (
            <code key={v} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded mx-0.5">{v}</code>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {value.map((output) => (
          <div key={output.id} className="p-4 border rounded-xl bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-medium">
                <LayoutGrid className="h-4 w-4" />
                <span className="text-xs font-mono">{output.id}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-red-500"
                onClick={() => removeOutput(output.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Result ID</Label>
                <Input
                  value={output.id}
                  onChange={(e) => updateOutput(output.id, { id: e.target.value })}
                  placeholder="e.g., futureValue"
                  className="h-8 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Display Label</Label>
                <Input
                  value={output.label}
                  onChange={(e) => updateOutput(output.id, { label: e.target.value })}
                  placeholder="e.g., Future Value"
                  className="h-8"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Formula for this result</Label>
              <Textarea
                value={output.formula || ''}
                onChange={(e) => updateOutput(output.id, { formula: e.target.value })}
                placeholder="e.g., monthly_investment * years * 12"
                className="font-mono text-sm h-16 resize-none"
              />
              <p className="text-[10px] text-muted-foreground">
                JS math expression. Leave blank to use the main logic formula.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Format</Label>
                <Select
                  value={output.format}
                  onValueChange={(val: 'currency' | 'percent' | 'number') => updateOutput(output.id, { format: val })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Currency ($)</SelectItem>
                    <SelectItem value="percent">Percent (%)</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Color Variant</Label>
                <Select
                  value={output.variant}
                  onValueChange={(val: 'neutral' | 'positive' | 'negative') => updateOutput(output.id, { variant: val })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="positive">Positive (Green)</SelectItem>
                    <SelectItem value="negative">Negative (Red)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!value.length && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            No results defined. Add at least one to show calculations.
          </p>
        </div>
      )}
    </div>
  )
}
