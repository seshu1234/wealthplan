'use client'

import { Plus, Trash, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalculatorChart } from '@/lib/calculator/engine'

interface ChartBuilderProps {
  value?: CalculatorChart[]
  inputs: string[] // List of available input IDs
  onChange: (value: CalculatorChart[]) => void
}

export function ChartBuilder({ value = [], inputs, onChange }: ChartBuilderProps) {
  const addChart = () => {
    const newChart: CalculatorChart = {
      id: `chart-${Date.now()}`,
      type: 'area',
      title: 'Growth Over Time',
      loopKey: inputs[0] || '',
      series: [
        {
          label: 'Total Value',
          dataKey: 'value',
          formula: '0',
          color: 'hsl(142, 71%, 45%)',
        },
      ],
    }
    onChange([...value, newChart])
  }

  const removeChart = (id: string) => {
    onChange(value.filter((c) => c.id !== id))
  }

  const updateChart = (id: string, updates: Partial<CalculatorChart>) => {
    onChange(value.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const addSeries = (chartId: string) => {
    onChange(
      value.map((c) => {
        if (c.id === chartId) {
          return {
            ...c,
            series: [
              ...c.series,
              {
                label: 'New Series',
                dataKey: `series-${Date.now()}`,
                formula: '0',
                color: 'hsl(221, 83%, 53%)',
              },
            ],
          }
        }
        return c
      })
    )
  }

  const removeSeries = (chartId: string, dataKey: string) => {
    onChange(
      value.map((c) => {
        if (c.id === chartId) {
          return {
            ...c,
            series: c.series.filter((s) => s.dataKey !== dataKey),
          }
        }
        return c
      })
    )
  }

  const updateSeries = (chartId: string, dataKey: string, updates: Partial<CalculatorChart['series'][0]>) => {
    onChange(
      value.map((c) => {
        if (c.id === chartId) {
          return {
            ...c,
            series: c.series.map((s) => (s.dataKey === dataKey ? { ...s, ...updates } : s)),
          }
        }
        return c
      })
    )
  }

  return (
    <div className="space-y-6">
      {value.map((chart) => (
        <Card key={chart.id} className="relative group border-2 border-muted/50">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <Label>Chart Title</Label>
                  <Input
                    value={chart.title}
                    onChange={(e) => updateChart(chart.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Chart Type</Label>
                  <Select
                    value={chart.type}
                    onValueChange={(v: 'area' | 'bar' | 'line' | 'pie') => updateChart(chart.id, { type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area">Area Chart (Growth)</SelectItem>
                      <SelectItem value="bar">Bar Chart (Comparison)</SelectItem>
                      <SelectItem value="line">Line Chart (Trend)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive transition-opacity ml-2"
                onClick={() => removeChart(chart.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Loop Variable (X-Axis)</Label>
              <Select
                value={chart.loopKey}
                onValueChange={(v) => updateChart(chart.id, { loopKey: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input for X-axis" />
                </SelectTrigger>
                <SelectContent>
                  {inputs.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                This determines how many points are plotted (e.g., if set to &apos;years&apos;, it plots points 1 to years)
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                  <BarChart3 className="h-4 w-4" /> Series Definitions
                </h4>
                <Button variant="outline" size="sm" onClick={() => addSeries(chart.id)}>
                  <Plus className="h-3 w-3 mr-1" /> Add Series
                </Button>
              </div>

              {chart.series.map((s) => (
                <div key={s.dataKey} className="grid grid-cols-12 gap-3 items-end border bg-muted/30 p-3 rounded-lg">
                  <div className="col-span-3 space-y-1.5">
                    <Label className="text-[10px] uppercase font-bold">Label</Label>
                    <Input
                      value={s.label}
                      onChange={(e) => updateSeries(chart.id, s.dataKey, { label: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-3 space-y-1.5">
                    <Label className="text-[10px] uppercase font-bold">Data Key (Unique)</Label>
                    <Input
                      value={s.dataKey}
                      onChange={(e) => updateSeries(chart.id, s.dataKey, { dataKey: e.target.value })}
                      className="h-8 text-sm font-mono"
                    />
                  </div>
                  <div className="col-span-5 space-y-1.5">
                    <Label className="text-[10px] uppercase font-bold">Formula (Use &apos;i&apos; for current step)</Label>
                    <Input
                      value={s.formula}
                      onChange={(e) => updateSeries(chart.id, s.dataKey, { formula: e.target.value })}
                      className="h-8 text-sm font-mono"
                      placeholder="e.g. monthly_investment * i * 12"
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeSeries(chart.id, s.dataKey)}
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {value.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl border-muted bg-muted/5">
          <BarChart3 className="h-10 w-10 text-muted-foreground/30 mb-4" />
          <h3 className="font-semibold text-lg text-muted-foreground">No Charts Configured</h3>
          <p className="text-sm text-muted-foreground/60 mb-6">Every calculator should have at least one chart.</p>
          <Button onClick={addChart}>
            <Plus className="h-4 w-4 mr-2" /> Add Growth Chart
          </Button>
        </div>
      )}

      {value.length > 0 && (
        <Button variant="outline" className="w-full border-dashed" onClick={addChart}>
          <Plus className="h-4 w-4 mr-2" /> Add Another Chart
        </Button>
      )}
    </div>
  )
}
