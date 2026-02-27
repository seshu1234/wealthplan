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

  // 1. Calculate Outputs
  if (logic.type === 'formula') {
    for (const output of config.outputs) {
      const formula = (output.formula || logic.formula)?.trim();
      if (!formula) continue;

      try {
        const validVars = Object.keys(currentContext).filter(v => /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(v));
        // Create a function that takes 'ctx' and returns the formula result.
        // We destructure only valid variables into the local scope.
        const fnBody = `
          try {
            const { ${validVars.join(', ')} } = ctx;
            return Number(${formula});
          } catch (e) {
            return 0;
          }
        `;
        const fn = new Function('ctx', fnBody);
        const result = fn(currentContext);
        
        if (result === undefined || isNaN(result as number)) {
          console.warn(`[Engine] Formula result is NaN or undefined for [${output.id}]:`, { result, formula, contextKeys: validVars });
        }
        
        const finalVal = typeof result === 'number' && isFinite(result) ? result : 0;
        outputs[output.id] = finalVal;
        
        // Add THIS output to context so LATER outputs can use it!
        // Trim ID to prevent ReferenceErrors if DB has trailing spaces
        currentContext[output.id.trim()] = finalVal;
      } catch (err) {
        console.error(`Calculation Error in output [${output.id}]:`, err, { formula });
        outputs[output.id] = 0;
        // MUST add to context even on failure to prevent ReferenceErrors in dependent formulas
        currentContext[output.id] = 0;
      }
    }
  }

  // 2. Generate Chart Data
  if (config.charts) {
    for (const chart of config.charts) {
      const loopMax = Number(values[chart.loopKey]) || 0;
      if (loopMax <= 0 || loopMax > 100) continue; // Safety limits

      const data: Record<string, number | string>[] = [];
      for (let i = 1; i <= loopMax; i++) {
        const point: Record<string, number | string> = { [chart.loopKey]: i };
        const ctx = { ...currentContext, i };
        const validVars = Object.keys(ctx).filter(v => /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(v));
        
        
        for (const s of chart.series) {
          try {
            const formula = s.formula?.trim();
            if (!formula) continue;

            // Reuse validVars from parent loop scope
            const fnBody = `
              try {
                const { ${validVars.join(', ')} } = ctx;
                return Number(${formula});
              } catch (e) {
                return 0;
              }
            `;
            const fn = new Function('ctx', fnBody);
            const result = fn(ctx);
            
            point[s.dataKey] = typeof result === 'number' && isFinite(result) ? Math.round(result) : 0;
          } catch (err) {
            console.error(`Chart Calculation Error [${s.dataKey}]:`, err);
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
