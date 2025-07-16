import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Lock,
  Unlock,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Code,
  Globe,
  Users,
  FileText,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Eye,
  Gavel,
  Target,
  Database,
  Network,
  Calendar,
  DollarSign,
  TrendingUp,
  Hash,
  ExternalLink,
} from "lucide-react";

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category:
    | "ceasefire"
    | "territorial"
    | "disarmament"
    | "reconstruction"
    | "governance";
  complexity: "simple" | "moderate" | "complex";
  estimatedGas: number;
  features: string[];
  auditStatus: "pending" | "verified" | "approved";
  lastUpdated: string;
}

interface DeploymentStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  estimatedTime: string;
  details?: string;
}

interface ContractParameter {
  name: string;
  type: "address" | "uint256" | "string" | "bool" | "bytes32" | "array";
  description: string;
  required: boolean;
  defaultValue?: string;
  validation?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  deadline: string;
  stakeholder: string;
  condition: string;
  penalty: string;
  reward: string;
}

const contractTemplates: ContractTemplate[] = [
  {
    id: "ceasefire-basic",
    name: "Basic Ceasefire Agreement",
    description:
      "Automated ceasefire monitoring with violation detection and escalation protocols",
    category: "ceasefire",
    complexity: "simple",
    estimatedGas: 150000,
    features: [
      "Automatic monitoring",
      "Violation alerts",
      "Escalation protocols",
      "Multi-signature validation",
    ],
    auditStatus: "approved",
    lastUpdated: "2024-12-10",
  },
  {
    id: "territorial-demarcation",
    name: "Territorial Demarcation Contract",
    description:
      "Smart contract for border definition and territorial dispute resolution",
    category: "territorial",
    complexity: "complex",
    estimatedGas: 450000,
    features: [
      "GPS boundary verification",
      "Resource allocation",
      "Access rights",
      "Dispute resolution",
    ],
    auditStatus: "verified",
    lastUpdated: "2024-12-08",
  },
  {
    id: "disarmament-progressive",
    name: "Progressive Disarmament Protocol",
    description: "Phased weapons reduction with milestone-based verification",
    category: "disarmament",
    complexity: "moderate",
    estimatedGas: 280000,
    features: [
      "Milestone tracking",
      "Verification protocols",
      "Incentive distribution",
      "Compliance scoring",
    ],
    auditStatus: "verified",
    lastUpdated: "2024-12-09",
  },
  {
    id: "reconstruction-funding",
    name: "Reconstruction Funding Manager",
    description: "Transparent allocation and tracking of reconstruction funds",
    category: "reconstruction",
    complexity: "complex",
    estimatedGas: 380000,
    features: [
      "Fund management",
      "Progress tracking",
      "Multi-stakeholder approval",
      "Impact verification",
    ],
    auditStatus: "pending",
    lastUpdated: "2024-12-11",
  },
];

const deploymentSteps: DeploymentStep[] = [
  {
    id: "validation",
    title: "Parameter Validation",
    description: "Validate contract parameters and stakeholder signatures",
    status: "pending",
    estimatedTime: "2-3 minutes",
  },
  {
    id: "compilation",
    title: "Contract Compilation",
    description: "Compile smart contract with optimized security settings",
    status: "pending",
    estimatedTime: "3-5 minutes",
  },
  {
    id: "security-audit",
    title: "Automated Security Audit",
    description: "Run comprehensive security analysis and vulnerability checks",
    status: "pending",
    estimatedTime: "5-8 minutes",
  },
  {
    id: "stakeholder-approval",
    title: "Multi-Stakeholder Approval",
    description: "Collect digital signatures from all required parties",
    status: "pending",
    estimatedTime: "15-30 minutes",
  },
  {
    id: "blockchain-deployment",
    title: "Blockchain Deployment",
    description: "Deploy contract to selected blockchain network",
    status: "pending",
    estimatedTime: "2-5 minutes",
  },
  {
    id: "verification",
    title: "Contract Verification",
    description: "Verify contract deployment and initialize monitoring",
    status: "pending",
    estimatedTime: "1-2 minutes",
  },
];

const contractParameters: ContractParameter[] = [
  {
    name: "parties",
    type: "array",
    description: "Wallet addresses of all treaty parties",
    required: true,
    validation: "Valid Ethereum addresses",
  },
  {
    name: "treatyTitle",
    type: "string",
    description: "Official title of the peace treaty",
    required: true,
  },
  {
    name: "effectiveDate",
    type: "uint256",
    description: "Treaty effective date (Unix timestamp)",
    required: true,
  },
  {
    name: "duration",
    type: "uint256",
    description: "Treaty duration in days",
    required: true,
    defaultValue: "365",
  },
  {
    name: "mediatorAddress",
    type: "address",
    description: "UN or mediating organization wallet address",
    required: true,
  },
  {
    name: "violationThreshold",
    type: "uint256",
    description: "Number of violations before escalation",
    required: false,
    defaultValue: "3",
  },
  {
    name: "escrowAmount",
    type: "uint256",
    description: "Security deposit amount in ETH",
    required: false,
    defaultValue: "0",
  },
];

const mockMilestones: Milestone[] = [
  {
    id: "ceasefire-implementation",
    title: "Ceasefire Implementation",
    description: "Complete cessation of hostilities within designated zones",
    deadline: "2024-12-20",
    stakeholder: "All parties",
    condition: "Zero violations for 72 consecutive hours",
    penalty: "10% escrow deduction",
    reward: "5% bonus allocation",
  },
  {
    id: "weapons-handover",
    title: "Heavy Weapons Handover",
    description: "Transfer of designated heavy weapons to neutral custody",
    deadline: "2024-12-25",
    stakeholder: "Military forces",
    condition: "100% inventory verification",
    penalty: "20% escrow deduction",
    reward: "Peace dividend release",
  },
  {
    id: "civilian-return",
    title: "Civilian Return Program",
    description: "Safe return of displaced civilians to designated areas",
    deadline: "2025-01-15",
    stakeholder: "Humanitarian organizations",
    condition: "90% return rate achieved",
    penalty: "Funding suspension",
    reward: "Additional reconstruction funds",
  },
];

interface SmartContractDeployerProps {
  treatyId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const SmartContractDeployer: React.FC<SmartContractDeployerProps> = ({
  treatyId,
  isOpen = true,
  onClose,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum-mainnet");
  const [gasPrice, setGasPrice] = useState("20");
  const [securityLevel, setSecurityLevel] = useState("high");
  const [steps, setSteps] = useState(deploymentSteps);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedTemplateData = contractTemplates.find(
    (t) => t.id === selectedTemplate,
  );

  const handleParameterChange = (name: string, value: string) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setCurrentStep(0);

    // Simulate deployment process
    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status:
            index === i ? "in-progress" : index < i ? "completed" : "pending",
        })),
      );
      setCurrentStep(i);

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status: index <= i ? "completed" : "pending",
        })),
      );
    }

    setIsDeploying(false);
  };

  const estimatedCost = selectedTemplateData
    ? (selectedTemplateData.estimatedGas * parseInt(gasPrice)) / 1000000000
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Smart Contract Deployment
                </CardTitle>
                <p className="text-muted-foreground">
                  Deploy blockchain-secured peace agreements with automated
                  enforcement
                </p>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Ethereum • Polygon • Arbitrum
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {!isDeploying && currentStep === 0 && (
        <>
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Contract Template</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose a pre-audited smart contract template for your peace
                agreement
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-primary border-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <Badge
                          variant={
                            template.auditStatus === "approved"
                              ? "default"
                              : template.auditStatus === "verified"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            template.auditStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : template.auditStatus === "verified"
                                ? "bg-blue-100 text-blue-800"
                                : ""
                          }
                        >
                          {template.auditStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Category:</span>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Complexity:</span>
                          <Badge variant="outline">{template.complexity}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Est. Gas:</span>
                          <span className="font-medium">
                            {template.estimatedGas.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Features:</span>
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 3).map((feature) => (
                              <Badge
                                key={feature}
                                variant="secondary"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                            {template.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{template.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          {selectedTemplate && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle>Contract Parameters</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure the specific terms of your peace agreement
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-96">
                    <div className="space-y-4 pr-4">
                      {contractParameters.map((param) => (
                        <div key={param.name} className="space-y-2">
                          <Label className="flex items-center space-x-2">
                            <span>{param.name}</span>
                            {param.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </Label>
                          <div>
                            {param.type === "array" ? (
                              <Textarea
                                placeholder="Enter addresses separated by commas"
                                value={parameters[param.name] || ""}
                                onChange={(e) =>
                                  handleParameterChange(
                                    param.name,
                                    e.target.value,
                                  )
                                }
                                className="h-20"
                              />
                            ) : param.type === "bool" ? (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={parameters[param.name] === "true"}
                                  onCheckedChange={(checked) =>
                                    handleParameterChange(
                                      param.name,
                                      checked ? "true" : "false",
                                    )
                                  }
                                />
                                <span className="text-sm">Enable</span>
                              </div>
                            ) : (
                              <Input
                                type={
                                  param.type === "uint256" ? "number" : "text"
                                }
                                placeholder={
                                  param.defaultValue || `Enter ${param.name}`
                                }
                                value={
                                  parameters[param.name] ||
                                  param.defaultValue ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleParameterChange(
                                    param.name,
                                    e.target.value,
                                  )
                                }
                              />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {param.description}
                            {param.validation && ` • ${param.validation}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Deployment Settings */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deployment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Blockchain Network</Label>
                      <Select
                        value={selectedNetwork}
                        onValueChange={setSelectedNetwork}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ethereum-mainnet">
                            Ethereum Mainnet
                          </SelectItem>
                          <SelectItem value="polygon-mainnet">
                            Polygon Mainnet
                          </SelectItem>
                          <SelectItem value="arbitrum-one">
                            Arbitrum One
                          </SelectItem>
                          <SelectItem value="ethereum-goerli">
                            Ethereum Goerli (Testnet)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Gas Price (Gwei)</Label>
                      <Input
                        type="number"
                        value={gasPrice}
                        onChange={(e) => setGasPrice(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Security Level</Label>
                      <Select
                        value={securityLevel}
                        onValueChange={setSecurityLevel}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High Security</SelectItem>
                          <SelectItem value="maximum">
                            Maximum Security
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Deployment Cost Estimate</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Gas Limit:</span>
                          <span>
                            {selectedTemplateData?.estimatedGas.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gas Price:</span>
                          <span>{gasPrice} Gwei</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total Cost:</span>
                          <span>~{estimatedCost.toFixed(6)} ETH</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      variant="outline"
                      className="w-full"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {showAdvanced ? "Hide" : "Show"} Advanced Options
                    </Button>

                    {showAdvanced && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label>Constructor Arguments</Label>
                          <Textarea
                            placeholder="Additional constructor arguments (JSON format)"
                            className="h-20"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="verify-source" />
                          <Label htmlFor="verify-source" className="text-sm">
                            Verify source code on Etherscan
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="immutable" defaultChecked />
                          <Label htmlFor="immutable" className="text-sm">
                            Make contract immutable
                          </Label>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Milestones Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Automated Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockMilestones.slice(0, 2).map((milestone) => (
                        <div
                          key={milestone.id}
                          className="p-3 border rounded-lg"
                        >
                          <div className="font-medium text-sm">
                            {milestone.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Due: {milestone.deadline} • {milestone.stakeholder}
                          </div>
                        </div>
                      ))}
                      <div className="text-center">
                        <Button variant="ghost" size="sm">
                          <Plus className="mr-2 h-3 w-3" />
                          Add Custom Milestone
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Deploy Button */}
          {selectedTemplate && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Ready to Deploy</h3>
                    <p className="text-sm text-muted-foreground">
                      Your smart contract will be deployed to {selectedNetwork}{" "}
                      with high security standards
                    </p>
                  </div>
                  <Button
                    onClick={handleDeploy}
                    className="peace-gradient peace-glow"
                    disabled={!selectedTemplate}
                  >
                    <Gavel className="mr-2 h-4 w-4" />
                    Deploy Smart Contract
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Deployment Progress */}
      {isDeploying && (
        <Card>
          <CardHeader>
            <CardTitle>Deploying Smart Contract</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please wait while we deploy your peace agreement to the blockchain
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : step.status === "in-progress"
                          ? "bg-blue-100 text-blue-600"
                          : step.status === "failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : step.status === "in-progress" ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : step.status === "failed" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {step.description} • {step.estimatedTime}
                    </div>
                    {step.details && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {step.details}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={
                      step.status === "completed"
                        ? "default"
                        : step.status === "in-progress"
                          ? "secondary"
                          : step.status === "failed"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round((currentStep / steps.length) * 100)}%</span>
              </div>
              <Progress
                value={(currentStep / steps.length) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deployment Success */}
      {!isDeploying &&
        currentStep >= steps.length - 1 &&
        steps.every((s) => s.status === "completed") && (
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900">
                    Smart Contract Deployed Successfully!
                  </h3>
                  <p className="text-green-700 mt-1">
                    Your peace agreement is now secured on the blockchain and
                    monitoring has begun.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Hash className="h-4 w-4" />
                      <span>Contract Address:</span>
                      <code className="bg-white px-2 py-1 rounded">
                        0x742d35Cc6634C0532925a3b8D3Ac34b3cc6634C0532925
                      </code>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Network className="h-4 w-4" />
                      <span>Network:</span>
                      <Badge variant="outline">{selectedNetwork}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Contract
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download ABI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default SmartContractDeployer;
