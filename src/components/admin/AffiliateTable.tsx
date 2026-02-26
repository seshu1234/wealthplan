// components/dashboard/AffiliateTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface AffiliateTableProps {
  affiliates: any[]
}

export function AffiliateTable({ affiliates }: AffiliateTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Clicks</TableHead>
            <TableHead>Conversion</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {affiliates?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No affiliates found.
              </TableCell>
            </TableRow>
          ) : (
            affiliates.map((affiliate) => (
              <TableRow key={affiliate.id}>
                <TableCell className="font-medium">{affiliate.name}</TableCell>
                <TableCell>
                  <Badge variant={affiliate.status === 'active' ? 'default' : 'secondary'}>
                    {affiliate.status}
                  </Badge>
                </TableCell>
                <TableCell>{affiliate.total_clicks || 0}</TableCell>
                <TableCell>{affiliate.conversion_rate || '0%'}</TableCell>
                <TableCell className="text-right">${affiliate.revenue || 0}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
