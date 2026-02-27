"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  TrendingUp,
  Landmark,
  Wallet,
  ChevronRight,
  Calculator,
  BookOpen,
  Sparkles,
  Map as MapIcon,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Search } from "@/components/layout/search";

// ─── Nav config ────────────────────────────────────────────────────────────────

const calculatorCategories = [
  {
    title: "Wealth & Growth",
    icon: TrendingUp,
    items: [
      {
        title: "Compound Interest",
        href: "/calculators/compound-interest",
        description: "See the power of compounding over time.",
        badge: "Popular",
      },
      {
        title: "Investment Calculator",
        href: "/calculators/investment-calculator",
        description: "Project returns on any investment.",
      },
      {
        title: "Net Worth",
        href: "/calculators/net-worth-calculator",
        description: "Track your total financial picture.",
      },
    ],
  },
  {
    title: "Retirement & Tax",
    icon: Landmark,
    items: [
      {
        title: "401(k) Calculator",
        href: "/calculators/401k-calculator",
        description: "Optimize your employer-sponsored savings.",
        badge: "New",
      },
      {
        title: "Roth IRA Calculator",
        href: "/calculators/roth-ira-calculator",
        description: "Roth vs. Traditional tax-efficiency analysis.",
      },
      {
        title: "Tax Bracket Calculator",
        href: "/calculators/tax-bracket-calculator",
        description: "Estimate your federal income tax burden.",
      },
    ],
  },
  {
    title: "Debt & Home",
    icon: Wallet,
    items: [
      {
        title: "Mortgage Calculator",
        href: "/calculators/mortgage-calculator",
        description: "Estimate monthly home ownership costs.",
        badge: "Popular",
      },
      {
        title: "Debt Payoff",
        href: "/calculators/debt-payoff-calculator",
        description: "Snowball vs avalanche — which wins for you.",
      },
      {
        title: "Budget Planner",
        href: "/calculators/budget-planner",
        description: "Build and track your monthly budget.",
      },
    ],
  },
];

const mainLinks = [
  { title: "Health Score", href: "/score", icon: Sparkles },
  { title: "Sidekick", href: "/sidekick", icon: Brain },
  { title: "Strategy", href: "/strategy", icon: Sparkles },
  { title: "Roadmaps", href: "/roadmaps", icon: MapIcon },
  { title: "State Taxes", href: "/matrix", icon: Landmark },
  { title: "Guides", href: "/guides", icon: BookOpen },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Calculator className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base tracking-tight text-foreground">
            WealthPath
          </span>
        </Link>

        {/* Desktop nav — center */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>

              {/* Calculators mega menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground bg-transparent hover:bg-muted/50">
                  Calculators
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-4">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {calculatorCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.title}>
                            {/* Category header */}
                            <div className="flex items-center gap-1.5 px-2 py-1.5 mb-1">
                              <Icon className="h-3.5 w-3.5 text-primary" />
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {cat.title}
                              </span>
                            </div>
                            {/* Items */}
                            <ul className="space-y-0.5">
                              {cat.items.map((item) => (
                                <DropdownItem key={item.title} {...item} />
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <Separator className="mb-3" />
                    {/* Footer row */}
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs text-muted-foreground">
                        40+ free calculators for the US tax system
                      </p>
                      <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" asChild>
                        <Link href="/calculators">
                          View all
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Main links */}
              {mainLinks.slice(0, 5).map((link) => (
                <NavigationMenuItem key={link.title}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium bg-transparent hover:bg-muted/50",
                        pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div className="hidden sm:block">
            <Search />
          </div>

          {/* Theme toggle — desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* CTA — desktop */}
          <Button variant="cta" size="sm" className="hidden md:flex gap-1.5 font-bold uppercase tracking-tighter" asChild>
            <Link href="/score">
              <Sparkles className="size-3.5" />
              Check My Score
            </Link>
          </Button>

          {/* Mobile sheet trigger */}
          <div className="lg:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <MobileSheet pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Desktop dropdown item ─────────────────────────────────────────────────────

type DropdownItemProps = {
  title: string;
  href: string;
  description: string;
  badge?: string;
};

const DropdownItem = React.forwardRef<HTMLAnchorElement, DropdownItemProps>(
  ({ title, href, description, badge }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className="flex flex-col gap-0.5 rounded-lg p-2.5 hover:bg-muted transition-colors group"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-none">
              {title}
            </span>
            {badge && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 font-semibold"
              >
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-1">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
);
DropdownItem.displayName = "DropdownItem";

// ─── Mobile sheet ──────────────────────────────────────────────────────────────

function MobileSheet({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[380px] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-left">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <Calculator className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight text-foreground">WealthPath</span>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Calculator categories */}
          {calculatorCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="space-y-2">
                {/* Category label */}
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {cat.title}
                  </span>
                </div>
                {/* Items */}
                <div className="space-y-0.5">
                  {cat.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <Separator />

          {/* View all calculators */}
          <Button variant="outline" className="w-full justify-between" asChild>
            <Link href="/calculators">
              All Calculators
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>

          {/* Main links */}
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t">
          <Button className="w-full gap-2 font-black uppercase tracking-widest" asChild>
            <Link href="/score">
              <Sparkles className="h-4 w-4" />
              Check My Wealth Score
            </Link>
          </Button>
          <p className="text-center text-[10px] text-muted-foreground mt-3 font-bold uppercase tracking-widest opacity-60">
            Takes 60 seconds · No signup
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}