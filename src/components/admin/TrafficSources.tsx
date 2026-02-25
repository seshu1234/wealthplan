// components/admin/TrafficSources.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TrafficSources({ events }: { events?: Record<string, unknown>[] }) {
  // Use events to potentially filter or augment data in the future
  console.log('Events received:', events?.length)
  const data = [
    { source: 'Google / Organic', sessions: 25400, transactions: 120, revenue: '$4,500' },
    { source: 'Direct', sessions: 12100, transactions: 85, revenue: '$2,800' },
    { source: 'Twitter / Social', sessions: 4500, transactions: 32, revenue: '$1,200' },
    { source: 'Newsletter / Email', sessions: 3200, transactions: 45, revenue: '$1,800' },
    { source: 'Referral', sessions: 2100, transactions: 15, revenue: '$600' },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.source}>
              <TableCell className="font-medium">{item.source}</TableCell>
              <TableCell>{item.sessions.toLocaleString()}</TableCell>
              <TableCell>{item.transactions}</TableCell>
              <TableCell className="text-right">{item.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
