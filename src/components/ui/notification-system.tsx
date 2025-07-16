import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Shield,
  Users,
  Globe,
  Heart,
  X,
  MoreHorizontal,
  Settings,
  Volume2,
  VolumeX,
  Filter,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Notification {
  id: string;
  type:
    | "conflict_alert"
    | "peace_achievement"
    | "dao_proposal"
    | "system"
    | "project"
    | "network"
    | "emergency";
  title: string;
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high" | "urgent";
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    region?: string;
    projectId?: string;
    proposalId?: string;
    userId?: string;
    organizationId?: string;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onAction: (notification: Notification) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onAction,
  soundEnabled = true,
  onToggleSound,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "conflict_alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "peace_achievement":
        return <Heart className="h-4 w-4 text-green-500" />;
      case "dao_proposal":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "project":
        return <Globe className="h-4 w-4 text-purple-500" />;
      case "network":
        return <Users className="h-4 w-4 text-indigo-500" />;
      case "emergency":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "system":
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "border-red-500 bg-red-50 dark:bg-red-950/20";
      case "high":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "medium":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/20";
      case "low":
      default:
        return "border-gray-300 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
    const variants = {
      urgent: "destructive",
      high: "destructive",
      medium: "default",
      low: "secondary",
    } as const;

    return (
      <Badge variant={variants[priority]} className="text-xs">
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const today = new Date().toDateString();
      const notificationDate = new Date(notification.timestamp).toDateString();
      const key = notificationDate === today ? "Today" : "Earlier";

      if (!groups[key]) groups[key] = [];
      groups[key].push(notification);
      return groups;
    },
    {} as Record<string, Notification[]>,
  );

  // Play notification sound for new notifications
  useEffect(() => {
    if (soundEnabled && notifications.length > 0) {
      const latestNotification = notifications[0];
      if (
        !latestNotification.read &&
        latestNotification.priority === "urgent"
      ) {
        // In a real app, this would play an actual sound
        console.log("🔔 Urgent notification sound");
      }
    }
  }, [notifications, soundEnabled]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative peace-gradient-hover transition-all duration-200"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 max-h-[600px] p-0"
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Peace Notifications</h3>
            <div className="flex items-center space-x-2">
              {onToggleSound && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleSound}
                  className="h-8 w-8 p-0"
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                disabled={unreadCount === 0}
                className="h-8 px-2 text-xs"
              >
                Mark all read
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              {
                key: "conflict_alert",
                label: "Conflicts",
                count: notifications.filter((n) => n.type === "conflict_alert")
                  .length,
              },
              {
                key: "dao_proposal",
                label: "DAO",
                count: notifications.filter((n) => n.type === "dao_proposal")
                  .length,
              },
              {
                key: "peace_achievement",
                label: "Peace",
                count: notifications.filter(
                  (n) => n.type === "peace_achievement",
                ).length,
              },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "default" : "ghost"}
                size="sm"
                className="text-xs whitespace-nowrap"
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-96">
          {Object.keys(groupedNotifications).length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filter === "unread"
                  ? "No unread notifications"
                  : "No notifications"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Peace notifications will appear here
              </p>
            </div>
          ) : (
            <div className="p-2">
              {Object.entries(groupedNotifications).map(
                ([group, groupNotifications]) => (
                  <div key={group} className="mb-4">
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {groupNotifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={onMarkAsRead}
                          onDismiss={onDismiss}
                          onAction={onAction}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={() => {
                setIsOpen(false);
                // Navigate to full notifications page
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAction: (notification: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDismiss,
  onAction,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      onAction(notification);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={cn(
        "group p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
        notification.read ? "opacity-60" : "",
        notification.priority === "urgent" ? "ring-2 ring-red-500/20" : "",
        "hover:border-primary/30",
      )}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {notification.type === "conflict_alert" &&
            notification.priority === "urgent" && (
              <div className="relative">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div className="absolute -inset-1 bg-red-500/20 rounded-full animate-ping" />
              </div>
            )}
          {!(
            notification.type === "conflict_alert" &&
            notification.priority === "urgent"
          ) && (
            <div className="p-1 rounded-full bg-secondary/50">
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4
                  className={cn(
                    "text-sm font-medium",
                    !notification.read && "font-semibold",
                  )}
                >
                  {notification.title}
                </h4>
                {getPriorityBadge(notification.priority)}
              </div>

              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  isExpanded ? "" : "line-clamp-2",
                )}
              >
                {notification.message}
              </p>

              {notification.metadata && (
                <div className="mt-2 flex items-center space-x-3 text-xs text-muted-foreground">
                  {notification.metadata.region && (
                    <span className="flex items-center space-x-1">
                      <Globe className="h-3 w-3" />
                      <span>{notification.metadata.region}</span>
                    </span>
                  )}
                  <span>
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}

              {notification.actionText && notification.actionUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction(notification);
                  }}
                >
                  {notification.actionText}
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                >
                  <CheckCircle className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!notification.read && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
      )}
    </div>
  );
};

// Toast notification component for urgent alerts
interface ToastNotificationProps {
  notification: Notification;
  onDismiss: () => void;
  onAction: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  notification,
  onDismiss,
  onAction,
}) => {
  useEffect(() => {
    // Auto-dismiss non-urgent notifications after 5 seconds
    if (notification.priority !== "urgent") {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.priority, onDismiss]);

  return (
    <Card
      className={cn(
        "fixed top-4 right-4 w-96 z-50 shadow-lg border-l-4",
        notification.priority === "urgent"
          ? "border-l-red-500 shadow-red-500/20"
          : "border-l-primary",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onDismiss}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {notification.message}
            </p>
            {notification.actionText && (
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={onAction} className="h-7 text-xs">
                  {notification.actionText}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onDismiss}
                  className="h-7 text-xs"
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSystem;

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "conflict_alert":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "peace_achievement":
      return <Heart className="h-4 w-4 text-green-500" />;
    case "dao_proposal":
      return <Users className="h-4 w-4 text-blue-500" />;
    case "project":
      return <Globe className="h-4 w-4 text-purple-500" />;
    case "network":
      return <Users className="h-4 w-4 text-indigo-500" />;
    case "emergency":
      return <Shield className="h-4 w-4 text-red-600" />;
    case "system":
    default:
      return <Info className="h-4 w-4 text-gray-500" />;
  }
}
