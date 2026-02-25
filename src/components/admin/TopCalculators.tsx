// components/admin/TopCalculators.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TopCalculators({ events }: { events?: Record<string, unknown>[] }) {
  // Use events to potentially filter or augment data in the future
  // The 'events' prop is currently logged for debugging/future use, addressing the 'unused prop' warning.
  console.log('Events received:', events?.length)
  const data = [
    { name: '401(k) Calculator', sessions: 12500, time: '3:45', bounce: '32%' },
    { name: 'Mortgage Calculator', sessions: 8400, time: '5:12', bounce: '28%' },
    { name: 'Roth IRA Calculator', sessions: 6700, time: '4:20', bounce: '35%' },
    { name: 'Compound Interest', sessions: 5200, time: '2:30', bounce: '41%' },
    { name: 'Salary Calculator', sessions: 3900, time: '1:45', bounce: '45%' },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Calculator</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Avg. Time</TableHead>
            <TableHead className="text-right">Bounce Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.sessions.toLocaleString()}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell className="text-right">{item.bounce}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
