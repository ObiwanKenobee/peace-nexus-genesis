import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Copy,
  Save,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Meta tags from the SEO profile
const defaultMetaTags = {
  title: "PAXIS: PeaceTech Stack for a Post-War World",
  description:
    "Build positive peace with PAXIS — the open-source full-stack ecosystem for conflict resolution, disarmament, commons sharing, and global diplomacy powered by AI, blockchain, and community.",
  keywords:
    "peacetech, positive peace, conflict AI, blockchain for peace, VR diplomacy, Peace DAO, PeaceCoin, disarmament tech, empathy engine, trust protocol",
  author: "Wild Panther, PAXIS Initiative",
  ogTitle: "PAXIS: Engineering Peace for the 21st Century",
  ogDescription:
    "PAXIS is an open-source ecosystem for peacebuilders. Powered by blockchain, AI, and cultural intelligence. Make war obsolete.",
  ogImage: "https://paxis.global/og-cover.jpg",
  ogUrl: "https://paxis.global",
};

const coreKeywords = [
  {
    primary: "Peacetech",
    secondary: "Disarmament blockchain",
    longTail: "how to build a peace DAO",
  },
  {
    primary: "Conflict resolution AI",
    secondary: "Water conflict tech",
    longTail: "open-source peace tools for youth",
  },
  {
    primary: "Peace DAO",
    secondary: "VR empathy lab",
    longTail: "nuclear disarmament tech stack",
  },
  {
    primary: "Commons exchange",
    secondary: "AI mediator",
    longTail: "PAXIS PeaceCoin earn peace",
  },
  {
    primary: "Trust networks",
    secondary: "Web3 diplomacy",
    longTail: "decentralized diplomacy tools Africa",
  },
];

const targetRegions = [
  {
    region: "East Africa",
    countries: ["South Sudan", "Ethiopia", "DRC"],
    priority: "High",
  },
  {
    region: "Middle East",
    countries: ["Palestine", "Yemen", "Syria"],
    priority: "High",
  },
  {
    region: "South Asia",
    countries: ["Afghanistan", "Pakistan"],
    priority: "High",
  },
  {
    region: "Sahel Belt",
    countries: ["Mali", "Chad", "Niger"],
    priority: "Medium",
  },
  {
    region: "Caucasus & Balkans",
    countries: ["Georgia", "Armenia", "Bosnia"],
    priority: "Medium",
  },
];

const languages = [
  "Arabic",
  "Swahili",
  "Hindi",
  "Farsi",
  "French",
  "Russian",
  "Amharic",
  "Pashto",
  "Mandarin",
  "Somali",
];

export default function SEODashboard() {
  const [metaTags, setMetaTags] = useState(defaultMetaTags);
  const [selectedPage, setSelectedPage] = useState("/");

  const pages = [
    { path: "/", title: "Home", description: "Peace manifesto + CTA" },
    {
      path: "/dao",
      title: "Join PeaceDAO",
      description: "DAO governance and participation",
    },
    {
      path: "/tools",
      title: "AI, blockchain, VR tools",
      description: "Platform tools overview",
    },
    {
      path: "/docs",
      title: "Documentation",
      description: "Whitepaper, protocols, architecture",
    },
    {
      path: "/coin",
      title: "PeaceCoin",
      description: "PeaceCoin info + how to earn",
    },
    {
      path: "/vr-labs",
      title: "VR Labs",
      description: "Empathy education experiences",
    },
    {
      path: "/contribute",
      title: "Contribute",
      description: "Developers, peacebuilders",
    },
    {
      path: "/stories",
      title: "Stories",
      description: "Impact reports + global testimonials",
    },
    { path: "/api", title: "API Docs", description: "Open API docs + Swagger" },
  ];

  const handleMetaTagChange = (field: string, value: string) => {
    setMetaTags((prev) => ({ ...prev, [field]: value }));
  };

  const copyMetaHTML = () => {
    const metaHTML = `<title>${metaTags.title}</title>
<meta name="description" content="${metaTags.description}" />
<meta name="keywords" content="${metaTags.keywords}" />
<meta name="author" content="${metaTags.author}" />

<!-- Open Graph -->
<meta property="og:title" content="${metaTags.ogTitle}">
<meta property="og:description" content="${metaTags.ogDescription}">
<meta property="og:image" content="${metaTags.ogImage}">
<meta property="og:url" content="${metaTags.ogUrl}">
<meta property="og:type" content="website">`;

    navigator.clipboard.writeText(metaHTML);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🧠 SEO Engine</h1>
          <p className="text-gray-600 mt-1">
            PAXIS Global Peace Technology Platform
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            SEO Health: 87%
          </Badge>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="meta-tags" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="meta-tags">Meta Tags</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="geo-targeting">Geo-Targeting</TabsTrigger>
          <TabsTrigger value="structured-data">Schema.org</TabsTrigger>
          <TabsTrigger value="crawler">Crawler Engine</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Meta Tags Management */}
        <TabsContent value="meta-tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Meta Tags Editor</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Page Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="page-select">Select Page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose page to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map((page) => (
                        <SelectItem key={page.path} value={page.path}>
                          {page.title} ({page.path})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={copyMetaHTML}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy HTML
                  </Button>
                </div>
              </div>

              {/* Basic Meta Tags */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={metaTags.title}
                    onChange={(e) =>
                      handleMetaTagChange("title", e.target.value)
                    }
                    placeholder="Enter page title"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Length: {metaTags.title.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    value={metaTags.description}
                    onChange={(e) =>
                      handleMetaTagChange("description", e.target.value)
                    }
                    placeholder="Enter meta description"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Length: {metaTags.description.length}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={metaTags.keywords}
                    onChange={(e) =>
                      handleMetaTagChange("keywords", e.target.value)
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              {/* Open Graph Tags */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Open Graph Tags</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input
                      id="og-title"
                      value={metaTags.ogTitle}
                      onChange={(e) =>
                        handleMetaTagChange("ogTitle", e.target.value)
                      }
                      placeholder="Open Graph title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og-description">OG Description</Label>
                    <Textarea
                      id="og-description"
                      value={metaTags.ogDescription}
                      onChange={(e) =>
                        handleMetaTagChange("ogDescription", e.target.value)
                      }
                      placeholder="Open Graph description"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="og-image">OG Image URL</Label>
                      <Input
                        id="og-image"
                        value={metaTags.ogImage}
                        onChange={(e) =>
                          handleMetaTagChange("ogImage", e.target.value)
                        }
                        placeholder="https://paxis.global/og-cover.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="og-url">OG URL</Label>
                      <Input
                        id="og-url"
                        value={metaTags.ogUrl}
                        onChange={(e) =>
                          handleMetaTagChange("ogUrl", e.target.value)
                        }
                        placeholder="https://paxis.global"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords Management */}
        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Core Keywords Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coreKeywords.map((keywordSet, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border rounded-lg"
                  >
                    <div>
                      <Label className="text-xs font-medium text-gray-500">
                        PRIMARY
                      </Label>
                      <Input value={keywordSet.primary} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-500">
                        SECONDARY
                      </Label>
                      <Input value={keywordSet.secondary} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-500">
                        LONG-TAIL
                      </Label>
                      <Input value={keywordSet.longTail} className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geo-Targeting */}
        <TabsContent value="geo-targeting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Target Regions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {targetRegions.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{region.region}</div>
                        <div className="text-sm text-gray-500">
                          {region.countries.join(", ")}
                        </div>
                      </div>
                      <Badge
                        variant={
                          region.priority === "High" ? "default" : "secondary"
                        }
                      >
                        {region.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multilingual Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span className="text-sm">{lang}</span>
                      <Badge variant="outline" className="text-xs">
                        Planned
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Structured Data */}
        <TabsContent value="structured-data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schema.org Structured Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "PAXIS",
  "url": "https://paxis.global",
  "logo": "https://paxis.global/logo.svg",
  "sameAs": [
    "https://twitter.com/paxisdao",
    "https://github.com/paxisdao",
    "https://discord.gg/paxis"
  ],
  "description": "PAXIS is an open-source peace tech stack that uses blockchain, AI, VR, and trust-based systems to build post-conflict infrastructure and make war obsolete.",
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress", 
      "addressRegion": "Global",
      "addressCountry": "World"
    }
  },
  "founder": {
    "@type": "Person",
    "name": "Wild Panther"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Domain Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">42</div>
                <div className="text-sm text-gray-500">
                  Target: 50+ by Q2 2025
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Indexed Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">23</div>
                <div className="text-sm text-gray-500">
                  Target: 50+ by Q4 2025
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">45.2K</div>
                <div className="text-sm text-gray-500">
                  Target: 100K+ by Q1 2026
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
