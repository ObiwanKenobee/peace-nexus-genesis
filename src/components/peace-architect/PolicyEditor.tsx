import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PenTool,
  Users,
  MessageSquare,
  Save,
  Download,
  Share2,
  Eye,
  Lock,
  Unlock,
  Brain,
  History,
  Plus,
  Settings,
  Globe,
  Flag,
  FileText,
  Clock,
  User,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Edit,
  MoreHorizontal,
  RefreshCw,
  Zap,
  Target,
  Scale,
} from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  organization: string;
  role: "author" | "reviewer" | "observer";
  avatar?: string;
  isOnline: boolean;
  lastSeen: string;
  cursorPosition?: number;
  permissions: string[];
}

interface Comment {
  id: string;
  author: Collaborator;
  content: string;
  timestamp: string;
  position: number;
  resolved: boolean;
  replies: Comment[];
  type: "suggestion" | "question" | "concern" | "approval";
}

interface AIAssistance {
  type: "grammar" | "clarity" | "legal" | "diplomatic" | "precedent";
  suggestion: string;
  confidence: number;
  position: number;
  reasoning: string;
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  author: string;
  lastModified: string;
  status: "draft" | "review" | "approved" | "locked";
  wordCount: number;
}

const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Ambassador Sarah Chen",
    organization: "United Nations",
    role: "author",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    lastSeen: "Now",
    cursorPosition: 245,
    permissions: ["edit", "comment", "approve"],
  },
  {
    id: "2",
    name: "Dr. Michael Torres",
    organization: "African Union",
    role: "reviewer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    lastSeen: "2 minutes ago",
    cursorPosition: 158,
    permissions: ["comment", "suggest"],
  },
  {
    id: "3",
    name: "Minister Amara Diallo",
    organization: "European Union",
    role: "author",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    isOnline: false,
    lastSeen: "1 hour ago",
    permissions: ["edit", "comment"],
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    author: mockCollaborators[1],
    content:
      "This clause needs clarification regarding enforcement mechanisms. What happens if parties violate these terms?",
    timestamp: "2024-12-12 14:30",
    position: 450,
    resolved: false,
    replies: [],
    type: "question",
  },
  {
    id: "2",
    author: mockCollaborators[2],
    content:
      "Excellent framework for resource sharing. This aligns well with EU peace-building principles.",
    timestamp: "2024-12-12 15:15",
    position: 1200,
    resolved: false,
    replies: [],
    type: "approval",
  },
];

const mockSections: DocumentSection[] = [
  {
    id: "preamble",
    title: "Preamble",
    content:
      "We, the representatives of the parties to this agreement, recognizing the urgent need for sustainable peace and reconciliation...",
    author: "Ambassador Sarah Chen",
    lastModified: "2024-12-12 16:20",
    status: "approved",
    wordCount: 156,
  },
  {
    id: "definitions",
    title: "Definitions",
    content:
      "For the purposes of this agreement, the following terms shall have the meanings ascribed to them...",
    author: "Dr. Michael Torres",
    lastModified: "2024-12-12 15:45",
    status: "review",
    wordCount: 89,
  },
  {
    id: "ceasefire",
    title: "Ceasefire Provisions",
    content:
      "All parties agree to an immediate and comprehensive cessation of hostilities...",
    author: "Minister Amara Diallo",
    lastModified: "2024-12-12 16:10",
    status: "draft",
    wordCount: 234,
  },
];

const aiSuggestions: AIAssistance[] = [
  {
    type: "diplomatic",
    suggestion:
      "Consider using 'mutually agree' instead of 'agree' for stronger diplomatic language",
    confidence: 89,
    position: 156,
    reasoning:
      "Diplomatic protocols favor explicit mutual agreement language in peace treaties",
  },
  {
    type: "legal",
    suggestion:
      "Add specific timeline for implementation to ensure enforceability",
    confidence: 94,
    position: 445,
    reasoning:
      "Legal precedent shows that vague timelines lead to implementation disputes",
  },
  {
    type: "precedent",
    suggestion:
      "Similar language was successfully used in the 2019 Sudan Peace Agreement",
    confidence: 87,
    position: 678,
    reasoning:
      "Historical analysis of successful peace agreements in the region",
  },
];

interface PolicyEditorProps {
  documentId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const PolicyEditor: React.FC<PolicyEditorProps> = ({
  documentId,
  isOpen = true,
  onClose,
}) => {
  const [selectedSection, setSelectedSection] = useState("preamble");
  const [editorContent, setEditorContent] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [showAI, setShowAI] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showCollaborators, setShowCollaborators] = useState(true);
  const [documentTitle, setDocumentTitle] = useState(
    "Sudan Comprehensive Peace Framework",
  );
  const [autoSave, setAutoSave] = useState(true);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const currentSection = mockSections.find((s) => s.id === selectedSection);

  useEffect(() => {
    if (currentSection) {
      setEditorContent(currentSection.content);
    }
  }, [selectedSection, currentSection]);

  useEffect(() => {
    if (autoSave && isEditing) {
      const timer = setTimeout(() => {
        // Auto-save logic here
        console.log("Auto-saving document...");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [editorContent, autoSave, isEditing]);

  const handleSave = () => {
    // Save logic here
    console.log("Saving document...");
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() && editorRef.current) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: mockCollaborators[0],
        content: newComment,
        timestamp: new Date().toISOString(),
        position: editorRef.current.selectionStart,
        resolved: false,
        replies: [],
        type: "suggestion",
      };
      // Add comment logic here
      setNewComment("");
    }
  };

  const getStatusColor = (status: DocumentSection["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      case "locked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCollaboratorColor = (collaborator: Collaborator) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
    ];
    return colors[parseInt(collaborator.id) % colors.length];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <Card className="border-b rounded-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <PenTool className="h-5 w-5 text-white" />
              </div>
              <div>
                <Input
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="text-xl font-bold border-none p-0 h-auto focus:ring-0"
                />
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>Last saved: 2 minutes ago</span>
                  <Badge variant="outline">
                    {autoSave ? "Auto-save ON" : "Manual save"}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{mockCollaborators.length} collaborators</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAI(!showAI)}
              >
                <Brain className="mr-2 h-3 w-3" />
                AI Assistant
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="mr-2 h-3 w-3" />
                Comments ({mockComments.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollaborators(!showCollaborators)}
              >
                <Users className="mr-2 h-3 w-3" />
                Collaborators
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm">
                <History className="mr-2 h-3 w-3" />
                Version History
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-3 w-3" />
                Export
              </Button>
              <Button onClick={handleSave} className="peace-gradient">
                <Save className="mr-2 h-3 w-3" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editor Body */}
      <div className="flex-1 flex">
        {/* Document Structure Sidebar */}
        <Card className="w-64 border-r rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Document Structure</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1 p-3">
                {mockSections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedSection === section.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {section.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(section.status)}
                      >
                        {section.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {section.wordCount} words • {section.author}
                    </div>
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Add Section
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 rounded-none border-x-0">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {currentSection?.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Last modified by {currentSection?.author}</span>
                    <span>{currentSection?.lastModified}</span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(
                        currentSection?.status || "draft",
                      )}
                    >
                      {currentSection?.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Lock className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit Section
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Revert Changes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-3 w-3" />
                        Mark as Approved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="relative">
                <Textarea
                  ref={editorRef}
                  value={editorContent}
                  onChange={(e) => {
                    setEditorContent(e.target.value);
                    setIsEditing(true);
                  }}
                  className="min-h-96 border-none focus:ring-0 resize-none font-mono text-sm leading-relaxed"
                  placeholder="Start writing your policy document..."
                />

                {/* Collaboration Cursors */}
                {mockCollaborators
                  .filter((c) => c.isOnline && c.cursorPosition)
                  .map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="absolute pointer-events-none"
                      style={{
                        top: `${Math.floor((collaborator.cursorPosition || 0) / 50) * 24 + 80}px`,
                        left: `${((collaborator.cursorPosition || 0) % 50) * 8 + 20}px`,
                      }}
                    >
                      <div
                        className={`w-0.5 h-6 ${getCollaboratorColor(collaborator)}`}
                      />
                      <div
                        className={`absolute -top-6 -left-2 px-2 py-1 text-xs text-white rounded ${getCollaboratorColor(collaborator)}`}
                      >
                        {collaborator.name.split(" ")[0]}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments Input */}
          <Card className="border-t rounded-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a comment or suggestion..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button
                  onClick={handleAddComment}
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l">
          <div className="h-full flex flex-col">
            {/* Collaborators Panel */}
            {showCollaborators && (
              <Card className="border-x-0 border-t-0 rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    Active Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockCollaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center space-x-3"
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback>
                            {collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {collaborator.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {collaborator.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {collaborator.organization} • {collaborator.role}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {collaborator.isOnline
                            ? "Online"
                            : `Last seen ${collaborator.lastSeen}`}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {collaborator.role}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* AI Assistant Panel */}
            {showAI && (
              <Card className="border-x-0 rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>AI Writing Assistant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {suggestion.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm mb-2">{suggestion.suggestion}</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {suggestion.reasoning}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Apply
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Comments Panel */}
            {showComments && (
              <Card className="flex-1 border-x-0 border-b-0 rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    Comments & Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-64">
                    <div className="space-y-3 p-3">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="p-3 border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.author.avatar} />
                              <AvatarFallback className="text-xs">
                                {comment.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-xs">
                                  {comment.author.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    comment.type === "approval"
                                      ? "text-green-600"
                                      : comment.type === "concern"
                                        ? "text-red-600"
                                        : comment.type === "question"
                                          ? "text-blue-600"
                                          : "text-gray-600"
                                  }`}
                                >
                                  {comment.type}
                                </Badge>
                              </div>
                              <p className="text-sm mb-2">{comment.content}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {comment.timestamp}
                                </span>
                                <div className="flex space-x-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 px-2 text-xs"
                                  >
                                    Reply
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 px-2 text-xs"
                                  >
                                    Resolve
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyEditor;
