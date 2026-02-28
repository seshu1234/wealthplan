/**
 * Dynamic Calculator Engine
 * Handles parsing and execution of calculator logic based on JSON configuration.
 * Supports per-output formulas and dynamic chart data generation.
 */

export type CalculatorInput = {
  id: string;
  label: string;
  type: 'slider' | 'number' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  defaultValue: number | string;
  unit?: string;
  tooltip?: string;
};

export type CalculatorOutput = {
  id: string;
  label: string;
  formula?: string;
  format: 'currency' | 'percent' | 'number';
  variant?: 'positive' | 'negative' | 'neutral';
  tooltip?: string;
  ignoreInflation?: boolean;
};

export type CalculatorChart = {
  id: string;
  type: 'area' | 'bar' | 'line' | 'pie';
  title: string;
  loopKey: string; // e.g. 'years'
  series: {
    label: string;
    dataKey: string;
    formula: string;
    color?: string;
    scenarioId?: string; // If set, only render this series when the scenario is active
    stackId?: string; // Used to group series into a stacked area chart vs overlay
  }[];
};

export type CalculatorScenario = {
  id: string;
  label: string;
  description?: string;
  inputs?: CalculatorInput[]; // Additional inputs that configure this scenario when active
};

export type CalculatorConfig = {
  inputs: CalculatorInput[];
  logic: {
    type: 'formula' | 'preset';
    formula?: string;
    presetId?: string;
  };
  outputs: CalculatorOutput[];
  charts?: CalculatorChart[];
  presets?: { id: string; label: string; values: Record<string, number | string> }[];
  currency?: string; // e.g., 'USD', 'EUR', 'GBP', 'INR'
  milestones?: { value: number; label: string; color?: string }[];
  showPieChart?: boolean; // Toggles the Invested vs Return Pie Chart
  content?: {
    intro?: string;
    highlight?: string;
    howToUse?: string[];
    explanation?: { title: string; body: string };
    deepDive?: { title: string; body: string };
    keyNumbers?: { label: string; value: string; source: string }[];
    faq?: { question: string; answer: string }[];
  };
  scenarios?: CalculatorScenario[]; // Scenario toggles for Step-Up, Lump Sum, etc.
  whatIf?: {
    goalSeeker?: { targetOutputId: string; adjustableInputId: string };
    crashSimulator?: boolean; // Injects crash_year and crash_percent into context
    taxImpact?: boolean;      // Injects tax_rate into context
  };
  healthIntegration?: {
    showWealthPathScore?: boolean;
    diversificationWarning?: boolean;
    emergencyFundCheck?: { monthlyExpensesInputId: string };
    debtToIncomeCheck?: { monthlyDebtInputId: string; monthlyIncomeInputId: string };
  };
};

export interface CalculationResult {
  outputs: Record<string, number | string>;
  charts: Record<string, Record<string, number | string>[]>;
}

/**
 * Execute a calculation based on inputs and logic configuration.
 */
export function executeCalculation(
  config: CalculatorConfig,
  values: Record<string, number | string>
): CalculationResult {
  const logic = config.logic || { type: 'formula', formula: '' };
  const outputs: Record<string, number | string> = {};
  const charts: Record<string, Record<string, number | string>[]> = {};

  if (!config.outputs) return { outputs, charts };

  // context starting with inputs, ensuring ALL config inputs are present even if missing from 'values'
  const currentContext: Record<string, number | string | boolean> = { ...values };
  
  // 0. Pre-populate all relevant IDs with 0 to prevent ReferenceErrors in formulas
  config.inputs?.forEach(input => {
    if (currentContext[input.id] === undefined) {
      currentContext[input.id] = input.defaultValue ?? 0;
    }
  });
  config.outputs?.forEach(output => {
    if (currentContext[output.id] === undefined) {
      currentContext[output.id] = 0;
    }
  });
  config.scenarios?.forEach(scen => {
    const scenarioKey = `scenario_${scen.id}`;
    if (currentContext[scenarioKey] === undefined) {
      currentContext[scenarioKey] = 0; // Default to inactive
    }
    scen.inputs?.forEach(input => {
      if (currentContext[input.id] === undefined) {
        currentContext[input.id] = input.defaultValue ?? 0;
      }
    });
  });

  // Inject scenario inputs into context
  config.scenarios?.forEach(scen => {
    const isActive = !!currentContext[`scenario_${scen.id}`];
    scen.inputs?.forEach(input => {
      if (isActive) {
        if (currentContext[input.id] === undefined) {
          currentContext[input.id] = input.defaultValue ?? 0;
        }
      } else {
        // If inactive, force to 0 so formulas don't crash
        currentContext[input.id] = 0;
      }
    });
  });

  // 1. Pre-scan all formulas to identify every variable used
  const allFormulas = [
    ...(config.outputs?.map(o => o.formula || logic.formula) || []),
    ...(config.charts?.flatMap(c => c.series.map(s => s.formula)) || [])
  ];
  
  const variableRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
  const discoveredVars = new Set<string>();
  allFormulas.forEach(f => {
    if (!f) return;
    let match;
    while ((match = variableRegex.exec(f)) !== null) {
      discoveredVars.add(match[1]);
    }
  });

  // Remove common JS keywords and built-ins from discovered variables
  const jsBuiltIns = new Set(['Math', 'Number', 'Array', 'ctx', 'i', 'undefined', 'null', 'NaN', 'scenario_irregular', 'scenario_step_up', 'scenario_lump_sum']);
  discoveredVars.forEach(v => {
    if (jsBuiltIns.has(v)) discoveredVars.delete(v);
  });

  // 2. Ensure ALL discovered variables exist in context (default to 0)
  discoveredVars.forEach(v => {
    if (currentContext[v] === undefined) {
      currentContext[v] = 0;
    }
  });
  // 1. Calculate Outputs
  if (logic.type === 'formula') {
    // Helper to evaluate formula in a sandbox
    const evaluate = (formula: string, ctx: Record<string, number | string | boolean>) => {
      try {
        // Create a proxy that defaults to 0 for unknown variables
        const proxy = new Proxy(ctx as Record<string, unknown>, {
          get: (target, prop) => {
            if (prop === 'Math') return Math;
            if (prop === 'Number') return Number;
            if (prop === 'ctx') return target;
            if (prop in target) return target[prop as string];
            // If it starts with scenario_, default to 0
            if (typeof prop === 'string' && prop.startsWith('scenario_')) return 0;
            return 0; // Default fallback
          }
        });
        const fn = new Function('ctx', `with(ctx) { return Number(${formula}) }`);
        const result = fn(proxy);
        return typeof result === 'number' && isFinite(result) ? result : 0;
      } catch {
        return 0;
      }
    };

    for (const output of config.outputs) {
      const formula = (output.formula || logic.formula)?.trim();
      if (!formula) continue;

      const result = evaluate(formula, currentContext as Record<string, number | string | boolean>);
      outputs[output.id] = result;
      currentContext[output.id] = result;
    }
  }

  // 2. Generate Chart Data
  if (config.charts) {
    for (const chart of config.charts) {
      const loopMax = Number(currentContext[chart.loopKey]) || 0;
      if (loopMax <= 0 || loopMax > 120) continue;

      const data: Record<string, number | string>[] = [];
      for (let i = 1; i <= loopMax; i++) {
        const point: Record<string, number | string> = { [chart.loopKey]: i };
        const ctx: Record<string, unknown> = { ...currentContext as Record<string, unknown>, i };
        
        for (const s of chart.series) {
          const formula = s.formula?.trim();
          if (!formula) continue;

          // Inline evaluation with proxy for charts
          try {
            const proxy = new Proxy(ctx, {
              get: (target, prop) => {
                if (prop === 'Math') return Math;
                if (prop === 'Number') return Number;
                if (prop === 'i') return target.i;
                if (prop in target) return target[prop as string];
                return 0;
              }
            });
            const fn = new Function('ctx', `with(ctx) { return Number(${formula}) }`);
            const result = fn(proxy);
            point[s.dataKey] = typeof result === 'number' && isFinite(result) ? Math.round(result) : 0;
          } catch {
            point[s.dataKey] = 0;
          }
        }
        data.push(point);
      }
      charts[chart.id] = data;
    }
  }

  return { outputs, charts };
}
