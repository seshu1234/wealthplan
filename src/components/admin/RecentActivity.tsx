// components/admin/RecentActivity.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const activities = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: '',
      initials: 'JD'
    },
    action: 'published a new calculator',
    target: 'Mortgage Calculator',
    time: '2 hours ago'
  },
  {
    id: 2,
    user: {
      name: 'Sarah Smith',
      avatar: '',
      initials: 'SS'
    },
    action: 'updated content',
    target: 'Retirement Planning Guide',
    time: '5 hours ago'
  },
  {
    id: 3,
    user: {
      name: 'Admin',
      avatar: '',
      initials: 'AD'
    },
    action: 'added a new affiliate link',
    target: 'Vanguard Personal Advisor',
    time: '1 day ago'
  },
  {
    id: 4,
    user: {
      name: 'John Doe',
      avatar: '',
      initials: 'JD'
    },
    action: 'deleted draft',
    target: 'Boat Loan Calculator',
    time: '2 days ago'
  }
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-bold">{activity.user.name}</span>{' '}
              <span className="text-muted-foreground">{activity.action}</span>{' '}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
