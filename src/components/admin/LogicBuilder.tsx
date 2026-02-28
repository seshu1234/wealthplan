'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

interface LogicValue {
  type: 'formula' | 'preset'
  formula?: string
  presetId?: string
}

interface LogicBuilderProps {
  value: LogicValue
  onChange: (value: LogicValue) => void
  availableVariables: string[]
}

export function LogicBuilder({ value, onChange, availableVariables }: LogicBuilderProps) {
  // Add safety check for undefined value
  const safeValue = value || { type: 'formula', formula: '' };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Calculation Method</Label>
        <Select 
          value={safeValue.type} 
          onValueChange={(val: string) => onChange({ ...safeValue, type: val as LogicValue['type'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formula">Custom Formula (JS Expression)</SelectItem>
            <SelectItem value="preset">Pre-defined Template</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {safeValue.type === 'formula' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Mathematical Formula</Label>
            <Textarea
              value={safeValue.formula}
              onChange={(e) => onChange({ ...safeValue, formula: e.target.value })}
              placeholder="e.g., principal * Math.pow(1 + rate/100, years)"
              className="font-mono h-32"
            />
            <p className="text-xs text-muted-foreground">
              Supports standard JavaScript math. Example: <code className="bg-muted px-1 rounded">a * b / c</code>
            </p>
          </div>

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle className="text-xs uppercase font-bold tracking-tight">Available Variables</AlertTitle>
            <AlertDescription className="text-xs font-mono flex flex-wrap gap-2 mt-2">
              {availableVariables.length > 0 ? (
                availableVariables.map((v) => (
                  <span key={v} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                    {v}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground italic text-[10px]">Define input IDs to use them here.</span>
              )}
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="space-y-4">
          <Label>Select Template</Label>
          <Select 
            value={safeValue.presetId} 
            onValueChange={(val: string) => onChange({ ...safeValue, presetId: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a preset..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compound_interest">Compound Interest (Advanced)</SelectItem>
              <SelectItem value="mortgage">Mortgage Repayment</SelectItem>
              <SelectItem value="tax_bracket">US Federal Tax Brackets</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground italic">
            Presets automatically handle complex loops and logic.
          </p>
        </div>
      )}
    </div>
  )
}
