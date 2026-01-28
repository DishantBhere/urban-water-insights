import { Bell, X, AlertTriangle, Info, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { SystemNotification } from '@/hooks/useWebSocket';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationPanelProps {
  notifications: SystemNotification[];
  onClear: () => void;
}

const NotificationPanel = ({ notifications, onClear }: NotificationPanelProps) => {
  const getIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="panel-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-info/20">
            <Bell className="h-5 w-5 text-info" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {notifications.length} active {notifications.length === 1 ? 'notification' : 'notifications'}
            </p>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <ScrollArea className="h-64">
          <div className="space-y-3 pr-4">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  'p-3 rounded-lg border transition-all animate-in slide-in-from-right-5',
                  notification.type === 'success' && 'bg-success/10 border-success/30',
                  notification.type === 'warning' && 'bg-warning/10 border-warning/30',
                  notification.type === 'alert' && 'bg-destructive/10 border-destructive/30',
                  notification.type === 'info' && 'bg-info/10 border-info/30'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-foreground text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            System alerts will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
