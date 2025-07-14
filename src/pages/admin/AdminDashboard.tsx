import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Globe,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "SEO Health Score",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: Search,
    color: "text-green-600",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Global Reach",
    value: "23 Countries",
    change: "+3",
    trend: "up",
    icon: Globe,
    color: "text-purple-600",
  },
  {
    title: "Organic Traffic",
    value: "45.2K",
    change: "+18%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

const recentActivities = [
  {
    type: "seo",
    message: "Meta tags updated for /governance page",
    time: "2 minutes ago",
    status: "success",
  },
  {
    type: "user",
    message: "New moderator role assigned to user #1247",
    time: "15 minutes ago",
    status: "info",
  },
  {
    type: "system",
    message: "CDN cache cleared for all regions",
    time: "1 hour ago",
    status: "success",
  },
  {
    type: "security",
    message: "Failed login attempts detected from suspicious IP",
    time: "2 hours ago",
    status: "warning",
  },
];

const quickActions = [
  {
    title: "Update Meta Tags",
    description: "Manage SEO meta tags and Open Graph data",
    href: "/admin/seo/meta-tags",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Manage Keywords",
    description: "Update target keywords and search rankings",
    href: "/admin/seo/keywords",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "User Permissions",
    description: "Assign roles and manage user access",
    href: "/admin/users",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Global Settings",
    description: "Configure multilingual and geo settings",
    href: "/admin/global",
    icon: Globe,
    color: "bg-orange-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span
                    className={`${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  asChild
                >
                  <Link to={action.href}>
                    <div className={`${action.color} rounded-lg p-2 mr-3`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-gray-500">
                        {action.description}
                      </div>
                    </div>
                  </Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === "success" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {activity.status === "warning" && (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  {activity.status === "info" && (
                    <Activity className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Frontend Status</div>
                <div className="text-xs text-gray-500">
                  All systems operational
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Backend API</div>
                <div className="text-xs text-gray-500">Response time: 45ms</div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Healthy
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">CDN Status</div>
                <div className="text-xs text-gray-500">
                  Global distribution active
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
