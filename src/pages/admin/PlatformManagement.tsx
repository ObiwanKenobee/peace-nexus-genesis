import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Database,
  Network,
  Shield,
  Globe,
  Server,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const systemServices = [
  {
    name: "Frontend Application",
    status: "running",
    uptime: "99.9%",
    url: "https://paxis.global",
  },
  {
    name: "Backend API",
    status: "running",
    uptime: "99.8%",
    url: "https://api.paxis.global",
  },
  {
    name: "GraphQL Endpoint",
    status: "running",
    uptime: "99.7%",
    url: "https://api.paxis.global/graphql",
  },
  {
    name: "Database",
    status: "running",
    uptime: "99.9%",
    url: "PostgreSQL Cluster",
  },
  {
    name: "Redis Cache",
    status: "running",
    uptime: "99.6%",
    url: "Redis Cluster",
  },
  {
    name: "IPFS Gateway",
    status: "maintenance",
    uptime: "98.2%",
    url: "https://ipfs.paxis.global",
  },
];

const cdnRegions = [
  { region: "North America", status: "active", nodes: 12, latency: "45ms" },
  { region: "Europe", status: "active", nodes: 8, latency: "52ms" },
  { region: "Asia Pacific", status: "active", nodes: 6, latency: "68ms" },
  { region: "Africa", status: "limited", nodes: 3, latency: "95ms" },
  { region: "South America", status: "active", nodes: 4, latency: "78ms" },
  { region: "Middle East", status: "planned", nodes: 0, latency: "N/A" },
];

export default function PlatformManagement() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Management</h1>
          <p className="text-gray-600 mt-1">
            System configuration and platform settings
          </p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="cdn">CDN & Hosting</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Services Status */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5" />
                <span>System Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          service.status === "running"
                            ? "bg-green-500"
                            : service.status === "maintenance"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">
                          {service.url}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Uptime: {service.uptime}
                        </div>
                        <Badge
                          variant={
                            service.status === "running"
                              ? "secondary"
                              : service.status === "maintenance"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CDN & Hosting */}
        <TabsContent value="cdn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>CDN Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cdnRegions.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{region.region}</div>
                      <Badge
                        variant={
                          region.status === "active"
                            ? "secondary"
                            : region.status === "limited"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {region.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Nodes: {region.nodes}</div>
                      <div>Latency: {region.latency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hosting Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Multi-CDN + IPFS</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Primary hosting with IPFS fallback
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Decentralized Mirror</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Handshake + ENS domains
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Tor Mirror</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    paxisglobal.onion (planned)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Network className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">DNS Management</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Global DNS with failover
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Platform Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="PAXIS" />
                  </div>
                  <div>
                    <Label htmlFor="primary-domain">Primary Domain</Label>
                    <Input id="primary-domain" defaultValue="paxis.global" />
                  </div>
                  <div>
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input
                      id="api-endpoint"
                      defaultValue="https://api.paxis.global"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-gray-500">
                        Enable daily automated backups
                      </p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Analytics Tracking</Label>
                      <p className="text-sm text-gray-500">
                        Enable usage analytics
                      </p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={analyticsEnabled}
                      onCheckedChange={setAnalyticsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance">Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">
                        Show maintenance page to users
                      </p>
                    </div>
                    <Switch
                      id="maintenance"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>System Maintenance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Database Operations</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Run Database Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Optimize Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Check Database Integrity
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Cache Operations</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear CDN Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Flush Redis Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Rebuild IPFS Index
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Maintenance Notice
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Next scheduled maintenance: Sunday, 2:00 AM UTC (Database
                  optimization)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
