"use client";

import { useState, useMemo } from "react";
import { SliderField } from "@/components/calculator/slider-field";
import { ResultGrid } from "@/components/calculator/result-grid";
import { ResultCard } from "@/components/calculator/result-card";
import { GrowthChart } from "@/components/calculator/growth-chart";
import { calculateCompoundInterest, CompoundInterestInputs } from "@/lib/calculations/compound-interest";
import { formatCurrency } from "@/lib/format";

export function CompoundInterestCalc() {
  const [inputs, setInputs] = useState<CompoundInterestInputs>({
    principal: 10000,
    monthlyContribution: 500,
    annualRate: 7,
    years: 20,
    frequency: "monthly",
  });

  const updateInput = (key: keyof CompoundInterestInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => calculateCompoundInterest(inputs), [inputs]);

  const chartData = useMemo(() => {
    return results.yearlySchedule.map((data) => ({
      name: "Year " + data.year,
      Total: data.balance,
      Principal: data.totalContributions,
      Interest: data.totalInterest,
    }));
  }, [results]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6 bg-muted/30 p-6 rounded-xl border">
        <SliderField
          label="Initial Investment"
          value={inputs.principal}
          onChange={(val) => updateInput("principal", val)}
          min={0}
          max={1000000}
          step={1000}
          formatValue={(val) => formatCurrency(val)}
        />
        
        <SliderField
          label="Monthly Contribution"
          value={inputs.monthlyContribution}
          onChange={(val) => updateInput("monthlyContribution", val)}
          min={0}
          max={10000}
          step={50}
          formatValue={(val) => formatCurrency(val)}
        />

        <SliderField
          label="Expected Annual Return"
          value={inputs.annualRate}
          onChange={(val) => updateInput("annualRate", val)}
          min={0}
          max={20}
          step={0.1}
          formatValue={(val) => val + "%"}
        />

        <SliderField
          label="Years to Grow"
          value={inputs.years}
          onChange={(val) => updateInput("years", val)}
          min={1}
          max={50}
          step={1}
          formatValue={(val) => val + " years"}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Compound Frequency</label>
          <select 
            value={inputs.frequency}
            onChange={(e) => setInputs(prev => ({ ...prev, frequency: e.target.value as CompoundInterestInputs["frequency"] }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="annually">Annually</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <ResultGrid columns={3}>
          <ResultCard
            label="Final Balance"
            value={formatCurrency(results.finalBalance)}
            sublabel="Total value of your investment after the selected time period."
            variant="positive"
          />
          <ResultCard
            label="Total Contributions"
            value={formatCurrency(results.totalContributions)}
            sublabel="The amount of money you put in out of your own pocket."
          />
          <ResultCard
            label="Total Interest Earned"
            value={formatCurrency(results.totalInterest)}
            sublabel="The amount of money your money made for you."
            variant="positive"
          />
        </ResultGrid>

        <div className="bg-background rounded-xl p-6 border shadow-sm flex-1 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Investment Growth Over Time</h3>
          <GrowthChart 
            data={chartData} 
            dataKeys={[{ key: 'Principal', fillOpacity: 0.2 }, { key: 'Interest', fillOpacity: 0.8 }]} 
            format="currency" 
          />
        </div>
      </div>
    </div>
  );
}
