import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  Key,
  Users,
  Activity,
  Clock,
  MapPin,
  Ban,
  Eye,
  Download,
  RefreshCw,
  Filter,
} from "lucide-react";

interface SecurityLog {
  id: string;
  timestamp: Date;
  event: string;
  user: string;
  ip: string;
  location: string;
  status: "success" | "warning" | "danger";
  details: string;
}

interface LoginAttempt {
  id: string;
  timestamp: Date;
  email: string;
  ip: string;
  location: string;
  userAgent: string;
  status: "success" | "failed";
  attempts: number;
}

const mockSecurityLogs: SecurityLog[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T10:30:00"),
    event: "Admin Login",
    user: "admin@paxis.global",
    ip: "192.168.1.100",
    location: "New York, US",
    status: "success",
    details: "Successful admin login",
  },
  {
    id: "2",
    timestamp: new Date("2024-01-15T09:45:00"),
    event: "Failed Login Attempt",
    user: "unknown@suspicious.com",
    ip: "45.123.45.67",
    location: "Unknown",
    status: "danger",
    details: "Multiple failed login attempts detected",
  },
  {
    id: "3",
    timestamp: new Date("2024-01-15T09:15:00"),
    event: "User Permission Change",
    user: "moderator@paxis.global",
    ip: "192.168.1.105",
    location: "London, UK",
    status: "warning",
    details: "User role changed from user to moderator",
  },
  {
    id: "4",
    timestamp: new Date("2024-01-15T08:30:00"),
    event: "System Backup",
    user: "system",
    ip: "localhost",
    location: "Server",
    status: "success",
    details: "Automated system backup completed",
  },
];

const mockLoginAttempts: LoginAttempt[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T10:30:00"),
    email: "admin@paxis.global",
    ip: "192.168.1.100",
    location: "New York, US",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    attempts: 1,
  },
  {
    id: "2",
    timestamp: new Date("2024-01-15T10:25:00"),
    email: "admin@paxis.global",
    ip: "45.123.45.67",
    location: "Unknown",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    status: "failed",
    attempts: 5,
  },
  {
    id: "3",
    timestamp: new Date("2024-01-15T09:45:00"),
    email: "moderator@paxis.global",
    ip: "192.168.1.105",
    location: "London, UK",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success",
    attempts: 1,
  },
];

const securitySettings = {
  twoFactorAuth: true,
  passwordComplexity: true,
  sessionTimeout: 30,
  ipWhitelist: true,
  bruteForceProtection: true,
  accountLockout: true,
  auditLogging: true,
  secureHeaders: true,
};

export default function SecurityManagement() {
  const [logs, setLogs] = useState<SecurityLog[]>(mockSecurityLogs);
  const [loginAttempts, setLoginAttempts] =
    useState<LoginAttempt[]>(mockLoginAttempts);
  const [logFilter, setLogFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "danger":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = logs.filter(
    (log) => logFilter === "all" || log.status === logFilter,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Management</h1>
          <p className="text-gray-600 mt-1">
            Authentication, authorization, and security monitoring
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+2 from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked IPs</CardTitle>
            <Ban className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Auto-blocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-gray-500">Excellent</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Security Logs</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        {/* Security Logs */}
        <TabsContent value="logs" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last hour</SelectItem>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="danger">Danger</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1">
                  <Input placeholder="Search logs..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logs List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Security Events ({filteredLogs.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="font-medium">{log.event}</div>
                        <div className="text-sm text-gray-500">
                          {log.details}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center space-x-4 mt-1">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {log.user}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {log.ip} ({log.location})
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {log.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Authentication */}
        <TabsContent value="authentication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Login Attempts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Recent Login Attempts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loginAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {attempt.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {attempt.ip} • {attempt.location}
                        </div>
                        <div className="text-xs text-gray-400">
                          {attempt.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {attempt.attempts > 1 && (
                          <Badge variant="outline">
                            {attempt.attempts} attempts
                          </Badge>
                        )}
                        <Badge
                          className={
                            attempt.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {attempt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Active Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      user: "admin@paxis.global",
                      ip: "192.168.1.100",
                      location: "New York, US",
                      duration: "2h 30m",
                    },
                    {
                      user: "moderator@paxis.global",
                      ip: "192.168.1.105",
                      location: "London, UK",
                      duration: "45m",
                    },
                    {
                      user: "user@paxis.global",
                      ip: "192.168.1.110",
                      location: "Berlin, DE",
                      duration: "15m",
                    },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {session.user}
                        </div>
                        <div className="text-xs text-gray-500">
                          {session.ip} • {session.location}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {session.duration}
                        </span>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Authentication Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    defaultChecked={securitySettings.twoFactorAuth}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="password-complexity">
                      Password Complexity
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enforce strong password requirements
                    </p>
                  </div>
                  <Switch
                    id="password-complexity"
                    defaultChecked={securitySettings.passwordComplexity}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue={securitySettings.sessionTimeout}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <p className="text-sm text-gray-500">
                      Restrict access to known IPs
                    </p>
                  </div>
                  <Switch
                    id="ip-whitelist"
                    defaultChecked={securitySettings.ipWhitelist}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Protection Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="brute-force">Brute Force Protection</Label>
                    <p className="text-sm text-gray-500">
                      Auto-block suspicious IPs
                    </p>
                  </div>
                  <Switch
                    id="brute-force"
                    defaultChecked={securitySettings.bruteForceProtection}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="account-lockout">Account Lockout</Label>
                    <p className="text-sm text-gray-500">
                      Lock accounts after failed attempts
                    </p>
                  </div>
                  <Switch
                    id="account-lockout"
                    defaultChecked={securitySettings.accountLockout}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-gray-500">
                      Log all administrative actions
                    </p>
                  </div>
                  <Switch
                    id="audit-logging"
                    defaultChecked={securitySettings.auditLogging}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="secure-headers">Security Headers</Label>
                    <p className="text-sm text-gray-500">
                      Enable HSTS, CSP, and other headers
                    </p>
                  </div>
                  <Switch
                    id="secure-headers"
                    defaultChecked={securitySettings.secureHeaders}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blocked IP Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    ip: "45.123.45.67",
                    reason: "Multiple failed login attempts",
                    blocked: "2 hours ago",
                  },
                  {
                    ip: "89.234.56.78",
                    reason: "Suspicious activity detected",
                    blocked: "6 hours ago",
                  },
                  {
                    ip: "123.45.67.89",
                    reason: "Brute force attack",
                    blocked: "1 day ago",
                  },
                ].map((blocked, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">{blocked.ip}</div>
                      <div className="text-xs text-gray-500">
                        {blocked.reason}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {blocked.blocked}
                      </span>
                      <Button variant="outline" size="sm">
                        Unblock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Real-time Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span className="text-green-600">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span className="text-yellow-600">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disk Usage</span>
                    <span className="text-green-600">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Load</span>
                    <span className="text-green-600">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-yellow-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    High CPU usage detected
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    All security checks passed
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Activity className="w-4 h-4 mr-2" />
                    System backup in progress
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Live Logs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Block IP Address
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Force Password Reset
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
