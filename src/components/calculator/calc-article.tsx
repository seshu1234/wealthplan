/**
 * CalcArticle — styled content wrapper for the educational sections
 * below calculators. Uses explicit Tailwind classes so it looks
 * great even without @tailwindcss/typography.
 *
 * Usage:
 *   <CalcArticle>
 *     <h2>What Is Compound Interest?</h2>
 *     <p>...</p>
 *   </CalcArticle>
 */
export function CalcArticle({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      mt-16 pt-10 border-t
      space-y-0
      [&>h2]:text-xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-foreground
      [&>h2]:mt-10 [&>h2]:mb-3 [&>h2:first-child]:mt-0
      [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-foreground
      [&>h3]:mt-6 [&>h3]:mb-2
      [&>p]:text-[0.95rem] [&>p]:leading-7 [&>p]:text-muted-foreground [&>p]:mb-4
      [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:mb-5 [&>ul]:pl-0
      [&>ul>li]:relative [&>ul>li]:pl-5 [&>ul>li]:text-sm [&>ul>li]:leading-6 [&>ul>li]:text-muted-foreground
      [&>ul>li]:before:content-['→'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-[hsl(var(--accent-brand))] [&>ul>li]:before:font-bold
      [&>ol]:list-none [&>ol]:space-y-2 [&>ol]:mb-5 [&>ol]:pl-0 [&>ol]:counter-reset-[item]
      [&>ol>li]:relative [&>ol>li]:pl-7 [&>ol>li]:text-sm [&>ol>li]:leading-6 [&>ol>li]:text-muted-foreground
      [&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:top-0
      [&>ol>li]:before:w-5 [&>ol>li]:before:h-5 [&>ol>li]:before:rounded-full
      [&>ol>li]:before:bg-[hsl(var(--accent-brand)/0.12)] [&>ol>li]:before:text-[hsl(var(--accent-brand))]
      [&>ol>li]:before:text-xs [&>ol>li]:before:font-bold [&>ol>li]:before:flex [&>ol>li]:before:items-center [&>ol>li]:before:justify-center
      [&_strong]:text-foreground [&_strong]:font-semibold
      [&_a]:text-[hsl(var(--accent-brand))] [&_a]:underline-offset-4 [&_a:hover]:underline
    ">
      {children}
    </div>
  )
}

/**
 * InfoBox — highlighted callout block inside CalcArticle.
 * Use for tips, warnings, or key takeaways.
 */
export function InfoBox({ children, variant = 'tip' }: {
  children: React.ReactNode
  variant?: 'tip' | 'note' | 'warning'
}) {
  const styles = {
    tip: 'bg-[hsl(var(--accent-brand)/0.08)] border-[hsl(var(--accent-brand)/0.3)] text-foreground',
    note: 'bg-muted border-border text-muted-foreground',
    warning: 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-200',
  }
  const icons = { tip: '💡', note: 'ℹ️', warning: '⚠️' }

  return (
    <div className={`flex gap-3 rounded-xl border px-4 py-3 my-5 text-sm leading-6 ${styles[variant]}`}>
      <span className="shrink-0 text-base">{icons[variant]}</span>
      <div>{children}</div>
    </div>
  )
}

/**
 * DataTable — clean comparison table inside CalcArticle.
 */
export function DataTable({ headers, rows }: {
  headers: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
