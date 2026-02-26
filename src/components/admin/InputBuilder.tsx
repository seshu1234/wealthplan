'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { CalculatorInput } from '@/lib/calculator/engine'

interface InputBuilderProps {
  value: CalculatorInput[]
  onChange: (value: CalculatorInput[]) => void
}

export function InputBuilder({ value = [], onChange }: InputBuilderProps) {
  const addField = () => {
    const newField: CalculatorInput = {
      id: `field_${Date.now()}`,
      label: 'New Field',
      type: 'number',
      defaultValue: 0,
      unit: '',
    }
    onChange([...value, newField])
  }

  const removeField = (id: string) => {
    onChange(value.filter((f) => f.id !== id))
  }

  const updateField = (id: string, updates: Partial<CalculatorInput>) => {
    onChange(value.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Input Fields ({value.length})
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={addField}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-3">
        {value.map((field) => (
          <div key={field.id} className="flex gap-4 p-4 border rounded-xl bg-card shadow-sm group">
            <div className="flex items-center text-muted-foreground cursor-grab">
              <GripVertical className="h-5 w-5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
              <div className="space-y-1.5">
                <Label className="text-xs">ID (Variable Name)</Label>
                <Input 
                  value={field.id} 
                  onChange={(e) => updateField(field.id, { id: e.target.value })}
                  placeholder="e.g., principal"
                  className="h-8"
                />
              </div>
              
              <div className="space-y-1.5 flex-[2]">
                <Label className="text-xs">Display Label</Label>
                <Input 
                  value={field.label} 
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  placeholder="e.g., Initial Investment"
                  className="h-8"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Type</Label>
                <Select 
                  value={field.type} 
                  onValueChange={(val: any) => updateField(field.id, { type: val })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="slider">Slider</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Unit</Label>
                <Input 
                  value={field.unit} 
                  onChange={(e) => updateField(field.id, { unit: e.target.value })}
                  placeholder="$, %, yrs"
                  className="h-8"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Default Value</Label>
                <Input 
                  type="number"
                  value={field.defaultValue} 
                  onChange={(e) => updateField(field.id, { defaultValue: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  className="h-8"
                />
              </div>

              {field.type === 'slider' && (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Min</Label>
                    <Input 
                      type="number"
                      value={field.min} 
                      onChange={(e) => updateField(field.id, { min: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Max</Label>
                    <Input 
                      type="number"
                      value={field.max} 
                      onChange={(e) => updateField(field.id, { max: parseFloat(e.target.value) || 0 })}
                      placeholder="100"
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Step</Label>
                    <Input 
                      type="number"
                      value={field.step} 
                      onChange={(e) => updateField(field.id, { step: parseFloat(e.target.value) || 1 })}
                      placeholder="1"
                      className="h-8"
                    />
                  </div>
                </>
              )}
            </div>

            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeField(field.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {!value.length && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted/50">
            <p className="text-sm text-muted-foreground">
              No input fields defined. Click &quot;Add Field&quot; to begin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
