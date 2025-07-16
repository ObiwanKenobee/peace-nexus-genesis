import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Terminal,
  Play,
  Copy,
  Save,
  Share2,
  Download,
  Key,
  Globe,
  Code,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Activity,
  Settings,
  BookOpen,
  Zap,
} from "lucide-react";

interface APIEndpointDoc {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  summary: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
  requestBody?: {
    type: string;
    schema: object;
    example: object;
  };
  responses: {
    code: number;
    description: string;
    schema?: object;
    example?: object;
  }[];
  authentication: boolean;
  rateLimit: string;
}

const mockAPIEndpoints: APIEndpointDoc[] = [
  {
    path: "/api/v1/conflicts/monitor",
    method: "GET",
    summary: "Get real-time conflict monitoring data",
    description:
      "Retrieve current conflict status, risk levels, and monitoring data for specified regions or globally.",
    parameters: [
      {
        name: "region",
        type: "string",
        required: false,
        description: "Specific region to monitor (e.g., 'sudan', 'ukraine')",
        example: "sudan",
      },
      {
        name: "risk_level",
        type: "string",
        required: false,
        description: "Filter by risk level: low, medium, high, critical",
        example: "high",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Maximum number of results to return",
        example: "10",
      },
    ],
    responses: [
      {
        code: 200,
        description: "Successfully retrieved conflict data",
        example: {
          conflicts: [
            {
              id: "sudan-2024-001",
              region: "Sudan",
              risk_level: "high",
              status: "active_monitoring",
              last_update: "2024-12-12T14:30:00Z",
              coordinates: [15.5007, 32.5599],
            },
          ],
          total: 1,
          page: 1,
        },
      },
      {
        code: 429,
        description: "Rate limit exceeded",
      },
    ],
    authentication: true,
    rateLimit: "1000 requests/hour",
  },
  {
    path: "/api/v1/peacecoin/transfer",
    method: "POST",
    summary: "Transfer PeaceCoins between users",
    description:
      "Send PeaceCoins to another user for peace-building activities or bounty rewards.",
    parameters: [],
    requestBody: {
      type: "application/json",
      schema: {
        recipient: "string",
        amount: "number",
        memo: "string",
      },
      example: {
        recipient: "user-12345",
        amount: 100,
        memo: "Bounty reward for conflict prediction model",
      },
    },
    responses: [
      {
        code: 200,
        description: "Transfer completed successfully",
        example: {
          transaction_id: "tx_abc123",
          status: "completed",
          amount: 100,
          recipient: "user-12345",
          timestamp: "2024-12-12T14:30:00Z",
        },
      },
      {
        code: 400,
        description: "Invalid request parameters",
      },
      {
        code: 402,
        description: "Insufficient balance",
      },
    ],
    authentication: true,
    rateLimit: "50 requests/hour",
  },
  {
    path: "/api/v1/governance/proposals",
    method: "POST",
    summary: "Submit governance proposal",
    description:
      "Create a new governance proposal for PAXIS protocol changes, funding, or policy updates.",
    parameters: [],
    requestBody: {
      type: "application/json",
      schema: {
        title: "string",
        description: "string",
        type: "string",
        github_pr: "string",
      },
      example: {
        title: "Increase developer bounty rewards",
        description:
          "Proposal to increase bounty rewards by 25% to attract more developers",
        type: "economic",
        github_pr: "https://github.com/paxis-org/governance/pull/123",
      },
    },
    responses: [
      {
        code: 201,
        description: "Proposal created successfully",
        example: {
          proposal_id: "prop_xyz789",
          status: "draft",
          voting_start: "2024-12-15T00:00:00Z",
          voting_end: "2024-12-22T00:00:00Z",
        },
      },
    ],
    authentication: true,
    rateLimit: "10 requests/day",
  },
];

interface APIExplorerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const APIExplorer: React.FC<APIExplorerProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpointDoc>(
    mockAPIEndpoints[0],
  );
  const [requestParams, setRequestParams] = useState<Record<string, string>>(
    {},
  );
  const [requestBody, setRequestBody] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [response, setResponse] = useState<{
    status: number;
    data: object;
    time: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParameterChange = (name: string, value: string) => {
    setRequestParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response based on selected endpoint
    const mockResponse = selectedEndpoint.responses.find((r) => r.code === 200);
    if (mockResponse?.example) {
      setResponse({
        status: 200,
        data: mockResponse.example,
        time: Math.random() * 500 + 100, // Random time between 100-600ms
      });
    }

    setIsLoading(false);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800";
      case "POST":
        return "bg-blue-100 text-blue-800";
      case "PUT":
        return "bg-orange-100 text-orange-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="border-b rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">PAXIS API Explorer</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Interactive API testing and documentation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-3 w-3" />
                Full Docs
              </Button>
              <Button variant="outline" size="sm">
                <Key className="mr-2 h-3 w-3" />
                Get API Key
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 flex">
        {/* Endpoint List */}
        <Card className="w-80 border-r rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">API Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1 p-3">
                {mockAPIEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedEndpoint.path === endpoint.path
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedEndpoint(endpoint)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      {endpoint.authentication && (
                        <Badge variant="outline" className="text-xs">
                          <Key className="mr-1 h-2 w-2" />
                          Auth
                        </Badge>
                      )}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">
                      {endpoint.path}
                    </div>
                    <div className="text-sm">{endpoint.summary}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 rounded-none border-x-0">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getMethodColor(selectedEndpoint.method)}>
                      {selectedEndpoint.method}
                    </Badge>
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {selectedEndpoint.path}
                    </code>
                  </div>
                  <CardTitle className="text-lg">
                    {selectedEndpoint.summary}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedEndpoint.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{selectedEndpoint.rateLimit}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="request" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>

                <TabsContent value="request" className="space-y-6">
                  {/* Authentication */}
                  {selectedEndpoint.authentication && (
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter your PAXIS API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Parameters */}
                  {selectedEndpoint.parameters.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Parameters</h3>
                      {selectedEndpoint.parameters.map((param) => (
                        <div key={param.name} className="space-y-2">
                          <Label className="flex items-center space-x-2">
                            <span>{param.name}</span>
                            {param.required && (
                              <span className="text-red-500">*</span>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {param.type}
                            </Badge>
                          </Label>
                          <Input
                            placeholder={param.example || `Enter ${param.name}`}
                            value={requestParams[param.name] || ""}
                            onChange={(e) =>
                              handleParameterChange(param.name, e.target.value)
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            {param.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Request Body */}
                  {selectedEndpoint.requestBody && (
                    <div className="space-y-2">
                      <Label>Request Body</Label>
                      <Textarea
                        placeholder={JSON.stringify(
                          selectedEndpoint.requestBody.example,
                          null,
                          2,
                        )}
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="font-mono text-sm h-32"
                      />
                    </div>
                  )}

                  {/* Execute Button */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleExecuteRequest}
                      disabled={
                        isLoading ||
                        (selectedEndpoint.authentication && !apiKey)
                      }
                      className="peace-gradient"
                    >
                      {isLoading ? (
                        <>
                          <Activity className="mr-2 h-4 w-4 animate-pulse" />
                          Executing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Execute Request
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <Code className="mr-2 h-4 w-4" />
                      Generate Code
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="response" className="space-y-6">
                  {response ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            response.status === 200 ? "default" : "destructive"
                          }
                          className={
                            response.status === 200
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {response.status} OK
                        </Badge>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{response.time.toFixed(0)}ms</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Response Body</Label>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="bg-muted p-4 rounded font-mono text-sm overflow-auto max-h-64">
                          <pre>{JSON.stringify(response.data, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Terminal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Execute a request to see the response
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="examples" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Response Examples</h3>
                    {selectedEndpoint.responses.map((response) => (
                      <div key={response.code} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              response.code === 200 ? "default" : "destructive"
                            }
                            className={
                              response.code === 200
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                          >
                            {response.code}
                          </Badge>
                          <span className="font-medium">
                            {response.description}
                          </span>
                        </div>
                        {response.example && (
                          <div className="bg-muted p-4 rounded font-mono text-sm overflow-auto">
                            <pre>
                              {JSON.stringify(response.example, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Sidebar */}
        <Card className="w-64 border-l rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">API Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Today's Usage</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Requests:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Errors:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span className="font-medium">156ms</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Rate Limits</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hourly</span>
                    <span>342/1000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "34%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily</span>
                    <span>4,267/10000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "43%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-3 w-3" />
                  API Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Download className="mr-2 h-3 w-3" />
                  Export Logs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Share2 className="mr-2 h-3 w-3" />
                  Share Collection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default APIExplorer;
