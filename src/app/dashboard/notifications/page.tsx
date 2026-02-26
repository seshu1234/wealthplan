'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Check, AlertCircle, Info, CheckCircle, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  created_at: string
}

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle className="h-4 w-4 text-emerald-500" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
}

const typeBadgeVariants: Record<string, string> = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications')
      if (!res.ok) throw new Error('Failed to fetch notifications')
      const data = await res.json()
      setNotifications(data)
    } catch {
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const unreadCount = notifications.filter(n => !n.read).length
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  const markAllRead = async () => {
    try {
      const res = await fetch('/api/notifications', { method: 'PATCH' })
      if (!res.ok) throw new Error('Failed to mark all as read')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      toast.success('All notifications marked as read')
    } catch {
      toast.error('Failed to mark all as read')
    }
  }

  const markRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Failed to mark as read')
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch {
      toast.error('Failed to mark as read')
    }
  }

  const removeNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete notification')
      setNotifications(prev => prev.filter(n => n.id !== id))
      toast.success('Notification deleted')
    } catch {
      toast.error('Failed to delete notification')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {loading ? 'Loading notifications...' : unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread {unreadCount > 0 && <Badge variant="secondary" className="ml-1">{unreadCount}</Badge>}
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                <Check className="h-4 w-4 mr-1" /> Mark all read
              </Button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground">Fetching your notifications...</p>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              {filter === 'unread' ? "You've read all your notifications." : "You don't have any notifications yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(notification => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-sm ${!notification.read ? 'border-l-4 border-l-primary bg-primary/[0.02]' : 'opacity-75'}`}
            >
              <CardContent className="flex items-start gap-4 py-4">
                <div className="mt-0.5">{typeIcons[notification.type]}</div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${typeBadgeVariants[notification.type]}`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                  <p className="text-[11px] text-muted-foreground/60">{timeAgo(notification.created_at)}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!notification.read && (
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markRead(notification.id)}>
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => removeNotification(notification.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
