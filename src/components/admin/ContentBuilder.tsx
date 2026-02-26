'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export interface CalculatorContent {
  intro: string
  howToUse: string[]
  explanation: { title: string; body: string }
  deepDive: { title: string; body: string }
  keyNumbers: { label: string; value: string; source: string }[]
  faq: { question: string; answer: string }[]
}

interface ContentBuilderProps {
  value: CalculatorContent
  onChange: (value: CalculatorContent) => void
  inputLabels?: string[]
}

const DEFAULT_CONTENT: CalculatorContent = {
  intro: '',
  howToUse: [],
  explanation: { title: '', body: '' },
  deepDive: { title: '', body: '' },
  keyNumbers: [],
  faq: [],
}

function SectionHeader({ title, subtitle, isOpen, onToggle }: {
  title: string; subtitle: string; isOpen: boolean; onToggle: () => void
}) {
  return (
    <CollapsibleTrigger asChild onClick={onToggle}>
      <button type="button" className="flex items-center justify-between w-full p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left">
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    </CollapsibleTrigger>
  )
}

export function ContentBuilder({ value, onChange, inputLabels = [] }: ContentBuilderProps) {
  const content = { ...DEFAULT_CONTENT, ...value }
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ intro: true })

  const toggle = (key: string) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  const update = (patch: Partial<CalculatorContent>) => onChange({ ...content, ...patch })

  return (
    <div className="space-y-3">
      {/* ── Intro ── */}
      <Collapsible open={openSections.intro}>
        <SectionHeader title="Introduction" subtitle="60 words max — include primary keyword in first sentence" isOpen={!!openSections.intro} onToggle={() => toggle('intro')} />
        <CollapsibleContent className="pt-3 px-1">
          <Textarea
            value={content.intro}
            onChange={(e) => update({ intro: e.target.value })}
            placeholder="Calculate your SIP returns and see how monthly investments grow over time..."
            className="resize-none h-24"
          />
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            {content.intro.split(/\s+/).filter(Boolean).length}/60 words
          </p>
        </CollapsibleContent>
      </Collapsible>

      {/* ── How to Use ── */}
      <Collapsible open={openSections.howToUse}>
        <SectionHeader title="How to Use This Calculator" subtitle="Numbered steps — one per input field" isOpen={!!openSections.howToUse} onToggle={() => toggle('howToUse')} />
        <CollapsibleContent className="pt-3 px-1 space-y-2">
          {inputLabels.length > 0 && content.howToUse.length === 0 && (
            <Button
              type="button" variant="outline" size="sm"
              onClick={() => update({ howToUse: inputLabels.map(l => `Enter your ${l.toLowerCase()}`) })}
            >
              Auto-generate from input fields
            </Button>
          )}
          {content.howToUse.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-muted-foreground mt-2 w-5 shrink-0">{i + 1}.</span>
              <Input
                value={step}
                onChange={(e) => {
                  const updated = [...content.howToUse]
                  updated[i] = e.target.value
                  update({ howToUse: updated })
                }}
                className="h-8"
              />
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-red-500"
                onClick={() => update({ howToUse: content.howToUse.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => update({ howToUse: [...content.howToUse, ''] })}>
            <Plus className="h-3 w-3 mr-1" /> Add Step
          </Button>
        </CollapsibleContent>
      </Collapsible>

      {/* ── Explanation ── */}
      <Collapsible open={openSections.explanation}>
        <SectionHeader title="What Is [Topic]?" subtitle="3 paragraphs with a real dollar-amount example" isOpen={!!openSections.explanation} onToggle={() => toggle('explanation')} />
        <CollapsibleContent className="pt-3 px-1 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Section Title</Label>
            <Input
              value={content.explanation.title}
              onChange={(e) => update({ explanation: { ...content.explanation, title: e.target.value } })}
              placeholder="e.g., What Is a Systematic Investment Plan?"
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Body</Label>
            <Textarea
              value={content.explanation.body}
              onChange={(e) => update({ explanation: { ...content.explanation, body: e.target.value } })}
              placeholder="Write 3 paragraphs explaining the concept..."
              className="resize-none h-40"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* ── Deep Dive ── */}
      <Collapsible open={openSections.deepDive}>
        <SectionHeader title="Deep Dive Section" subtitle="2–3 paragraphs on a specific sub-topic" isOpen={!!openSections.deepDive} onToggle={() => toggle('deepDive')} />
        <CollapsibleContent className="pt-3 px-1 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Section Title</Label>
            <Input
              value={content.deepDive.title}
              onChange={(e) => update({ deepDive: { ...content.deepDive, title: e.target.value } })}
              placeholder="e.g., How SIP Compounding Works"
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Body</Label>
            <Textarea
              value={content.deepDive.body}
              onChange={(e) => update({ deepDive: { ...content.deepDive, body: e.target.value } })}
              placeholder="Explain the specific topic in detail..."
              className="resize-none h-32"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* ── Key Numbers ── */}
      <Collapsible open={openSections.keyNumbers}>
        <SectionHeader title="2025 Key Numbers" subtitle="Table of important figures with sources" isOpen={!!openSections.keyNumbers} onToggle={() => toggle('keyNumbers')} />
        <CollapsibleContent className="pt-3 px-1 space-y-2">
          {content.keyNumbers.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
              <div className="space-y-1">
                {i === 0 && <Label className="text-[10px]">Label</Label>}
                <Input value={item.label} className="h-8" placeholder="e.g., 401(k) Limit"
                  onChange={(e) => {
                    const updated = [...content.keyNumbers]
                    updated[i] = { ...item, label: e.target.value }
                    update({ keyNumbers: updated })
                  }} />
              </div>
              <div className="space-y-1">
                {i === 0 && <Label className="text-[10px]">Value</Label>}
                <Input value={item.value} className="h-8" placeholder="e.g., $23,500"
                  onChange={(e) => {
                    const updated = [...content.keyNumbers]
                    updated[i] = { ...item, value: e.target.value }
                    update({ keyNumbers: updated })
                  }} />
              </div>
              <div className="space-y-1">
                {i === 0 && <Label className="text-[10px]">Source</Label>}
                <Input value={item.source} className="h-8" placeholder="e.g., IRS.gov"
                  onChange={(e) => {
                    const updated = [...content.keyNumbers]
                    updated[i] = { ...item, source: e.target.value }
                    update({ keyNumbers: updated })
                  }} />
              </div>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500"
                onClick={() => update({ keyNumbers: content.keyNumbers.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => update({ keyNumbers: [...content.keyNumbers, { label: '', value: '', source: '' }] })}>
            <Plus className="h-3 w-3 mr-1" /> Add Row
          </Button>
        </CollapsibleContent>
      </Collapsible>

      {/* ── FAQ ── */}
      <Collapsible open={openSections.faq}>
        <SectionHeader title="FAQ" subtitle="5 questions from Google People Also Ask" isOpen={!!openSections.faq} onToggle={() => toggle('faq')} />
        <CollapsibleContent className="pt-3 px-1 space-y-3">
          {content.faq.map((item, i) => (
            <div key={i} className="p-3 border rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-[10px]">Question {i + 1}</Label>
                  <Input value={item.question} className="h-8"
                    placeholder="e.g., How much should I invest monthly in SIP?"
                    onChange={(e) => {
                      const updated = [...content.faq]
                      updated[i] = { ...item, question: e.target.value }
                      update({ faq: updated })
                    }} />
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500 shrink-0 mt-5"
                  onClick={() => update({ faq: content.faq.filter((_, j) => j !== i) })}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Textarea value={item.answer} className="resize-none h-16"
                placeholder="Answer..."
                onChange={(e) => {
                  const updated = [...content.faq]
                  updated[i] = { ...item, answer: e.target.value }
                  update({ faq: updated })
                }} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => update({ faq: [...content.faq, { question: '', answer: '' }] })}>
            <Plus className="h-3 w-3 mr-1" /> Add FAQ
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
