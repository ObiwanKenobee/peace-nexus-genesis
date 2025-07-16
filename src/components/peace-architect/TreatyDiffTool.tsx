import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GitCompare,
  Download,
  Share2,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  Minus,
  Edit,
  History,
  Eye,
  Save,
} from "lucide-react";

interface TreatyVersion {
  id: string;
  version: string;
  author: string;
  timestamp: string;
  status: "draft" | "review" | "approved" | "rejected";
  changes: number;
  description: string;
  agency: string;
}

interface DiffLine {
  type: "added" | "removed" | "modified" | "unchanged";
  lineNumber: number;
  content: string;
  oldContent?: string;
  author?: string;
  timestamp?: string;
  section?: string;
}

const mockVersions: TreatyVersion[] = [
  {
    id: "v1.0",
    version: "1.0 - Initial Draft",
    author: "Ambassador Sarah Chen",
    timestamp: "2024-12-10 14:30",
    status: "draft",
    changes: 0,
    description: "Initial comprehensive framework",
    agency: "UN",
  },
  {
    id: "v1.1",
    version: "1.1 - UN Review",
    author: "Dr. Michael Torres",
    timestamp: "2024-12-11 09:15",
    status: "review",
    changes: 23,
    description: "Added conflict resolution mechanisms",
    agency: "UN",
  },
  {
    id: "v1.2",
    version: "1.2 - AU Amendments",
    author: "Minister Amara Diallo",
    timestamp: "2024-12-11 16:45",
    status: "review",
    changes: 17,
    description: "Regional autonomy provisions",
    agency: "AU",
  },
  {
    id: "v1.3",
    version: "1.3 - Consolidated",
    author: "Ambassador Sarah Chen",
    timestamp: "2024-12-12 11:20",
    status: "approved",
    changes: 8,
    description: "Merged AU amendments with UN framework",
    agency: "UN",
  },
];

const mockDiffContent: DiffLine[] = [
  {
    type: "unchanged",
    lineNumber: 1,
    content: "Article 1: Parties to the Agreement",
    section: "Preamble",
  },
  {
    type: "unchanged",
    lineNumber: 2,
    content:
      "The Government of Sudan and the Sudan People's Liberation Movement-North (SPLM-N)",
    section: "Preamble",
  },
  {
    type: "added",
    lineNumber: 3,
    content:
      "hereby establish this framework for sustainable peace and reconciliation",
    author: "Dr. Michael Torres",
    timestamp: "2024-12-11 09:15",
    section: "Preamble",
  },
  {
    type: "removed",
    lineNumber: 3,
    content: "agree to the following terms",
    section: "Preamble",
  },
  {
    type: "unchanged",
    lineNumber: 4,
    content: "",
    section: "Preamble",
  },
  {
    type: "unchanged",
    lineNumber: 5,
    content: "Article 2: Ceasefire Provisions",
    section: "Ceasefire",
  },
  {
    type: "modified",
    lineNumber: 6,
    content:
      "All hostile activities shall cease immediately upon signature of this agreement",
    oldContent: "All hostile activities shall cease within 48 hours",
    author: "Minister Amara Diallo",
    timestamp: "2024-12-11 16:45",
    section: "Ceasefire",
  },
  {
    type: "added",
    lineNumber: 7,
    content: "Monitoring shall be conducted by joint AU-UN peacekeeping forces",
    author: "Minister Amara Diallo",
    timestamp: "2024-12-11 16:45",
    section: "Ceasefire",
  },
  {
    type: "unchanged",
    lineNumber: 8,
    content: "",
    section: "Ceasefire",
  },
  {
    type: "unchanged",
    lineNumber: 9,
    content: "Article 3: Territorial Arrangements",
    section: "Territory",
  },
  {
    type: "added",
    lineNumber: 10,
    content:
      "Disputed territories shall be administered through joint governance structures",
    author: "Ambassador Sarah Chen",
    timestamp: "2024-12-12 11:20",
    section: "Territory",
  },
  {
    type: "added",
    lineNumber: 11,
    content:
      "Revenue from natural resources shall be shared according to population ratios",
    author: "Ambassador Sarah Chen",
    timestamp: "2024-12-12 11:20",
    section: "Territory",
  },
];

interface TreatyDiffToolProps {
  treatyId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const TreatyDiffTool: React.FC<TreatyDiffToolProps> = ({
  treatyId,
  isOpen = true,
  onClose,
}) => {
  const [selectedVersionA, setSelectedVersionA] = useState("v1.0");
  const [selectedVersionB, setSelectedVersionB] = useState("v1.3");
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">(
    "unified",
  );
  const [filterBy, setFilterBy] = useState<"all" | "changes-only">("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");

  const versionA = mockVersions.find((v) => v.id === selectedVersionA);
  const versionB = mockVersions.find((v) => v.id === selectedVersionB);

  const sections = Array.from(
    new Set(mockDiffContent.map((line) => line.section).filter(Boolean)),
  );

  const filteredContent = mockDiffContent.filter((line) => {
    if (filterBy === "changes-only" && line.type === "unchanged") return false;
    if (selectedSection !== "all" && line.section !== selectedSection)
      return false;
    return true;
  });

  const getLineIcon = (type: DiffLine["type"]) => {
    switch (type) {
      case "added":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "removed":
        return <Minus className="h-4 w-4 text-red-600" />;
      case "modified":
        return <Edit className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getLineStyles = (type: DiffLine["type"]) => {
    switch (type) {
      case "added":
        return "bg-green-50 dark:bg-green-950/20 border-l-4 border-l-green-500";
      case "removed":
        return "bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-500";
      case "modified":
        return "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500";
      default:
        return "hover:bg-muted/50";
    }
  };

  const getChangesSummary = () => {
    const changes = mockDiffContent.filter((line) => line.type !== "unchanged");
    const added = changes.filter((line) => line.type === "added").length;
    const removed = changes.filter((line) => line.type === "removed").length;
    const modified = changes.filter((line) => line.type === "modified").length;

    return { added, removed, modified, total: changes.length };
  };

  const summary = getChangesSummary();

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
              <GitCompare className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Treaty Diff Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Compare treaty versions and track collaborative changes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-3 w-3" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-3 w-3" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Version Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Base Version</Label>
              <Select
                value={selectedVersionA}
                onValueChange={setSelectedVersionA}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{version.agency}</Badge>
                        <span>{version.version}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {versionA && (
                <div className="text-xs text-muted-foreground">
                  By {versionA.author} • {versionA.timestamp}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Compare Version</Label>
              <Select
                value={selectedVersionB}
                onValueChange={setSelectedVersionB}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{version.agency}</Badge>
                        <span>{version.version}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {versionB && (
                <div className="text-xs text-muted-foreground">
                  By {versionB.author} • {versionB.timestamp}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label className="text-sm">View:</Label>
                <Select
                  value={viewMode}
                  onValueChange={(value: "side-by-side" | "unified") =>
                    setViewMode(value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unified">Unified</SelectItem>
                    <SelectItem value="side-by-side">Side by Side</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Label className="text-sm">Filter:</Label>
                <Select
                  value={filterBy}
                  onValueChange={(value: any) => setFilterBy(value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lines</SelectItem>
                    <SelectItem value="changes-only">Changes Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Label className="text-sm">Section:</Label>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section!}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Changes Summary */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <Plus className="h-3 w-3" />
                <span>{summary.added} added</span>
              </div>
              <div className="flex items-center space-x-1 text-red-600">
                <Minus className="h-3 w-3" />
                <span>{summary.removed} removed</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <Edit className="h-3 w-3" />
                <span>{summary.modified} modified</span>
              </div>
            </div>
          </div>

          {/* Diff Content */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Document Changes</h3>
                <Badge variant="outline">{summary.total} total changes</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="font-mono text-sm">
                  {filteredContent.map((line, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 px-4 py-2 hover:bg-muted/30 ${getLineStyles(line.type)}`}
                    >
                      {/* Line Number */}
                      <div className="w-12 text-right text-muted-foreground text-xs pt-0.5">
                        {line.lineNumber}
                      </div>

                      {/* Change Icon */}
                      <div className="w-5 pt-0.5">{getLineIcon(line.type)}</div>

                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        {line.type === "modified" && line.oldContent && (
                          <div className="text-red-600 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded text-sm">
                            - {line.oldContent}
                          </div>
                        )}
                        <div
                          className={`${
                            line.type === "added"
                              ? "text-green-600"
                              : line.type === "removed"
                                ? "text-red-600"
                                : line.type === "modified"
                                  ? "text-blue-600"
                                  : ""
                          }`}
                        >
                          {line.type === "added" && "+ "}
                          {line.type === "removed" && "- "}
                          {line.content || " "}
                        </div>

                        {/* Author and timestamp for changes */}
                        {line.type !== "unchanged" && line.author && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{line.author}</span>
                            <Clock className="h-3 w-3" />
                            <span>{line.timestamp}</span>
                            {line.section && (
                              <>
                                <FileText className="h-3 w-3" />
                                <span>{line.section}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <History className="mr-2 h-3 w-3" />
                Version History
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-3 w-3" />
                Preview Merged
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-3 w-3" />
                Generate Report
              </Button>
              <Button className="peace-gradient">
                <Save className="mr-2 h-3 w-3" />
                Accept Changes
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatyDiffTool;
