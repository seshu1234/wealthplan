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
};

export type CalculatorOutput = {
  id: string;
  label: string;
  formula?: string;
  format: 'currency' | 'percent' | 'number';
  variant?: 'positive' | 'negative' | 'neutral';
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
  }[];
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
  content?: {
    intro?: string;
    howToUse?: string[];
    explanation?: { title: string; body: string };
    deepDive?: { title: string; body: string };
    keyNumbers?: { label: string; value: string; source: string }[];
    faq?: { question: string; answer: string }[];
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
  const { logic } = config;
  const outputs: Record<string, number | string> = {};
  const charts: Record<string, Record<string, number | string>[]> = {};

  const vars = Object.keys(values);
  const args = vars.map(v => values[v]);

  // 1. Calculate Outputs
  if (logic.type === 'formula') {
    for (const output of config.outputs) {
      const formula = output.formula || logic.formula;
      if (!formula) continue;

      try {
        const fn = new Function(...vars, `return ${formula}`);
        const result = fn(...args);
        outputs[output.id] = typeof result === 'number' && isFinite(result) ? result : 0;
      } catch {
        outputs[output.id] = 0;
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
        
        // Context for formula: original inputs + 'i' as current loop value
        const loopVars = [...vars, 'i'];
        
        for (const s of chart.series) {
          try {
            const fn = new Function(...loopVars, `return ${s.formula}`);
            const result = fn(...args, i);
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
