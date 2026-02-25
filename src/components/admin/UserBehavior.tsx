// components/admin/UserBehavior.tsx
import { Progress } from '@/components/ui/progress'

export function UserBehavior({ events }: { events?: Record<string, unknown>[] }) {
  // Use events to potentially calculate behavior metrics in the future
  console.log('Events received:', events?.length)
  const behaviors = [
    { label: 'Mobile Users', value: 65 },
    { label: 'Desktop Users', value: 30 },
    { label: 'Tablet Users', value: 5 },
    { label: 'Returning Visitors', value: 42 },
    { label: 'Calculated Results', value: 78 },
  ]

  return (
    <div className="space-y-6">
      {behaviors.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-muted-foreground">{item.value}%</span>
          </div>
          <Progress value={item.value} className="h-2" />
        </div>
      ))}
    </div>
  )
}
