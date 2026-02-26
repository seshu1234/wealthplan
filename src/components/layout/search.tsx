'use client'

import * as React from 'react'
import {
  Calculator,
  FileText,
  Search as SearchIcon,
  TrendingUp,
  Landmark,
  Wallet,
  Sparkles,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

const searchItems = [
  {
    group: "Wealth & Growth",
    items: [
      { id: "compound", title: "Compound Interest", href: "/calculators/compound-interest", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
      { id: "investment", title: "Investment Calculator", href: "/calculators/investment-calculator", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
      { id: "networth", title: "Net Worth", href: "/calculators/net-worth-calculator", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    group: "Retirement & Tax",
    items: [
      { id: "401k", title: "401(k) Calculator", href: "/calculators/401k-calculator", icon: <Landmark className="mr-2 h-4 w-4" /> },
      { id: "ira", title: "Roth IRA Calculator", href: "/calculators/roth-ira-calculator", icon: <Landmark className="mr-2 h-4 w-4" /> },
      { id: "tax", title: "Tax Bracket Calculator", href: "/calculators/tax-bracket-calculator", icon: <Landmark className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    group: "Debt & Home",
    items: [
      { id: "mortgage", title: "Mortgage Calculator", href: "/calculators/mortgage-calculator", icon: <Wallet className="mr-2 h-4 w-4" /> },
      { id: "debt", title: "Debt Payoff", href: "/calculators/debt-payoff-calculator", icon: <Wallet className="mr-2 h-4 w-4" /> },
      { id: "budget", title: "Budget Planner", href: "/calculators/budget-planner", icon: <Wallet className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    group: "Resources",
    items: [
      { id: "guides", title: "Financial Guides", href: "/guides", icon: <FileText className="mr-2 h-4 w-4" /> },
      { id: "blog", title: "Market Insights", href: "/blog", icon: <FileText className="mr-2 h-4 w-4" /> },
      { id: "plan", title: "AI Financial Plan", href: "/plan", icon: <Sparkles className="mr-2 h-4 w-4" /> },
    ]
  }
]

export function Search() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 bg-muted/50 border-border/40 hover:bg-muted transition-all duration-300 rounded-xl group"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        <span className="hidden xl:inline-flex text-[11px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-80">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex border-border/40">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a calculator name or goal..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchItems.map((group) => (
            <React.Fragment key={group.group}>
              <CommandGroup heading={group.group}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
