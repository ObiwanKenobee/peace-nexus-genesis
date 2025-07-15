import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Languages,
  MapPin,
  Settings,
  Network,
  Clock,
  Flag,
} from "lucide-react";

const supportedLanguages = [
  {
    code: "en",
    name: "English",
    native: "English",
    status: "active",
    coverage: "100%",
  },
  {
    code: "ar",
    name: "Arabic",
    native: "العربية",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "sw",
    name: "Swahili",
    native: "Kiswahili",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिन्दी",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "fa",
    name: "Farsi",
    native: "فارسی",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "fr",
    name: "French",
    native: "Français",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "ru",
    name: "Russian",
    native: "Русский",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "am",
    name: "Amharic",
    native: "አማርኛ",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "ps",
    name: "Pashto",
    native: "پښتو",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "zh",
    name: "Mandarin",
    native: "中文",
    status: "planned",
    coverage: "0%",
  },
  {
    code: "so",
    name: "Somali",
    native: "Soomaali",
    status: "planned",
    coverage: "0%",
  },
];

const conflictZones = [
  {
    region: "East Africa",
    countries: ["South Sudan", "Ethiopia", "DRC"],
    priority: "High",
    localization: "Planned",
  },
  {
    region: "Middle East",
    countries: ["Palestine", "Yemen", "Syria"],
    priority: "High",
    localization: "Planned",
  },
  {
    region: "South Asia",
    countries: ["Afghanistan", "Pakistan"],
    priority: "High",
    localization: "In Progress",
  },
  {
    region: "Sahel Belt",
    countries: ["Mali", "Chad", "Niger"],
    priority: "Medium",
    localization: "Planned",
  },
  {
    region: "Caucasus & Balkans",
    countries: ["Georgia", "Armenia", "Bosnia"],
    priority: "Medium",
    localization: "Future",
  },
];

const timezones = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Africa/Cairo",
  "Africa/Nairobi",
];

export default function GlobalSettings() {
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [defaultTimezone, setDefaultTimezone] = useState("UTC");
  const [rtlSupport, setRtlSupport] = useState(true);
  const [autoDetectLocation, setAutoDetectLocation] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global Settings</h1>
          <p className="text-gray-600 mt-1">
            Multilingual, geo-targeting, and regional configuration
          </p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="languages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="cdn">CDN Config</TabsTrigger>
        </TabsList>

        {/* Language Management */}
        <TabsContent value="languages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span>Language Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="default-lang">Default Language</Label>
                  <Select
                    value={defaultLanguage}
                    onValueChange={setDefaultLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages
                        .filter((lang) => lang.status === "active")
                        .map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name} ({lang.native})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rtl-support">RTL Support</Label>
                    <p className="text-sm text-gray-500">
                      Enable right-to-left languages
                    </p>
                  </div>
                  <Switch
                    id="rtl-support"
                    checked={rtlSupport}
                    onCheckedChange={setRtlSupport}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Supported Languages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {supportedLanguages.map((lang) => (
                    <div key={lang.code} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{lang.name}</div>
                        <Badge
                          variant={
                            lang.status === "active"
                              ? "secondary"
                              : lang.status === "in-progress"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {lang.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {lang.native}
                      </div>
                      <div className="text-xs text-gray-500">
                        Coverage: {lang.coverage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Targeting */}
        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>High-Priority Conflict Zones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflictZones.map((zone, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Flag className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{zone.region}</div>
                          <div className="text-sm text-gray-500">
                            {zone.countries.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            zone.priority === "High" ? "default" : "secondary"
                          }
                        >
                          {zone.priority} Priority
                        </Badge>
                        <Badge variant="outline">{zone.localization}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-detect">
                      Auto-detect User Location
                    </Label>
                    <p className="text-sm text-gray-500">
                      Automatically detect user's region for content
                      localization
                    </p>
                  </div>
                  <Switch
                    id="auto-detect"
                    checked={autoDetectLocation}
                    onCheckedChange={setAutoDetectLocation}
                  />
                </div>

                <div>
                  <Label htmlFor="default-timezone">Default Timezone</Label>
                  <Select
                    value={defaultTimezone}
                    onValueChange={setDefaultTimezone}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization Settings */}
        <TabsContent value="localization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Localization Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Translation Priorities</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">
                        Phase 1: Core Content
                      </div>
                      <div className="text-xs text-gray-500">
                        Home, DAO, Tools pages
                      </div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">
                        Phase 2: Documentation
                      </div>
                      <div className="text-xs text-gray-500">
                        Whitepaper, API docs
                      </div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">
                        Phase 3: Community
                      </div>
                      <div className="text-xs text-gray-500">
                        Stories, testimonials
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Cultural Adaptation</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">
                        Religious Sensitivity
                      </div>
                      <div className="text-xs text-gray-500">
                        Respect local customs and beliefs
                      </div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">Color Schemes</div>
                      <div className="text-xs text-gray-500">
                        Adapt to regional preferences
                      </div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm">Number Formats</div>
                      <div className="text-xs text-gray-500">
                        Local currency and date formats
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CDN Configuration */}
        <TabsContent value="cdn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>CDN & Edge Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Edge Locations</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 border rounded">
                      <span>North America</span>
                      <Badge variant="secondary">12 nodes</Badge>
                    </div>
                    <div className="flex justify-between p-2 border rounded">
                      <span>Europe</span>
                      <Badge variant="secondary">8 nodes</Badge>
                    </div>
                    <div className="flex justify-between p-2 border rounded">
                      <span>Asia Pacific</span>
                      <Badge variant="secondary">6 nodes</Badge>
                    </div>
                    <div className="flex justify-between p-2 border rounded">
                      <span>Africa</span>
                      <Badge variant="outline">3 nodes</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Cache Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cache-ttl">Cache TTL (hours)</Label>
                      <Input
                        id="cache-ttl"
                        type="number"
                        defaultValue="24"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="purge-frequency">
                        Auto-purge Frequency
                      </Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
