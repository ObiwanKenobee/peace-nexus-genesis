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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  Rocket,
  Code,
  Globe,
  Shield,
  Zap,
  Database,
  Network,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Settings,
  Download,
  Upload,
  Eye,
  Copy,
  ExternalLink,
  Play,
  Pause,
  RefreshCw,
  FileText,
  Hash,
  Layers,
  Box,
  Gauge,
  DollarSign,
  Target,
} from "lucide-react";

interface SmartContract {
  id: string;
  name: string;
  description: string;
  category: "governance" | "identity" | "finance" | "mediation" | "monitoring";
  version: string;
  language: "Solidity" | "Rust" | "Move";
  networks: string[];
  abi: object[];
  bytecode: string;
  gasEstimate: number;
  securityScore: number;
  auditStatus: "pending" | "in-progress" | "passed" | "failed";
  features: string[];
  dependencies: string[];
}

interface DeploymentConfig {
  network: string;
  gasPrice: number;
  gasLimit: number;
  constructorArgs: string[];
  verifySource: boolean;
  upgradeability: "none" | "proxy" | "beacon";
}

interface NetworkConfig {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  currency: string;
  gasPrice: {
    slow: number;
    standard: number;
    fast: number;
  };
  status: "active" | "congested" | "offline";
  blockTime: number;
  finalityTime: number;
}

const mockContracts: SmartContract[] = [
  {
    id: "peace-treaty-v3",
    name: "Peace Treaty Protocol v3.0",
    description:
      "Multi-party peace agreement with automated enforcement and dispute resolution",
    category: "governance",
    version: "3.0.0",
    language: "Solidity",
    networks: ["ethereum", "polygon", "arbitrum"],
    abi: [],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    gasEstimate: 2500000,
    securityScore: 95,
    auditStatus: "passed",
    features: ["Multi-signature", "Timelock", "Upgradeable", "Emergency Pause"],
    dependencies: ["OpenZeppelin", "Chainlink"],
  },
  {
    id: "refugee-identity-zk",
    name: "Refugee Identity ZK Proof",
    description: "Zero-knowledge identity verification for displaced persons",
    category: "identity",
    version: "2.1.0",
    language: "Rust",
    networks: ["ethereum", "polygon"],
    abi: [],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    gasEstimate: 1800000,
    securityScore: 98,
    auditStatus: "passed",
    features: ["Zero-Knowledge", "Privacy-Preserving", "Sybil-Resistant"],
    dependencies: ["Circom", "SnarkJS"],
  },
  {
    id: "conflict-oracle",
    name: "Conflict Data Oracle",
    description: "Real-time conflict monitoring and data feed aggregation",
    category: "monitoring",
    version: "1.5.0",
    language: "Solidity",
    networks: ["ethereum", "polygon", "arbitrum", "optimism"],
    abi: [],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    gasEstimate: 1200000,
    securityScore: 92,
    auditStatus: "in-progress",
    features: ["Chainlink Integration", "Multi-Source", "Tamper-Proof"],
    dependencies: ["Chainlink", "OpenZeppelin"],
  },
  {
    id: "peacecoin-v2",
    name: "PeaceCoin ERC-20 v2",
    description: "Enhanced PeaceCoin with governance and staking capabilities",
    category: "finance",
    version: "2.0.0",
    language: "Solidity",
    networks: ["ethereum", "polygon"],
    abi: [],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    gasEstimate: 1500000,
    securityScore: 96,
    auditStatus: "passed",
    features: ["ERC-20", "Governance", "Staking", "Burn Mechanism"],
    dependencies: ["OpenZeppelin"],
  },
];

const mockNetworks: NetworkConfig[] = [
  {
    id: "ethereum",
    name: "Ethereum Mainnet",
    chainId: 1,
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/",
    explorerUrl: "https://etherscan.io",
    currency: "ETH",
    gasPrice: { slow: 15, standard: 20, fast: 30 },
    status: "active",
    blockTime: 13,
    finalityTime: 900,
  },
  {
    id: "polygon",
    name: "Polygon Mainnet",
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com/",
    explorerUrl: "https://polygonscan.com",
    currency: "MATIC",
    gasPrice: { slow: 30, standard: 40, fast: 60 },
    status: "active",
    blockTime: 2,
    finalityTime: 256,
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io",
    currency: "ETH",
    gasPrice: { slow: 0.1, standard: 0.5, fast: 1.0 },
    status: "active",
    blockTime: 1,
    finalityTime: 45,
  },
  {
    id: "optimism",
    name: "Optimism",
    chainId: 10,
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
    currency: "ETH",
    gasPrice: { slow: 0.001, standard: 0.005, fast: 0.01 },
    status: "congested",
    blockTime: 2,
    finalityTime: 1800,
  },
];

interface Web3DeploymentCenterProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Web3DeploymentCenter: React.FC<Web3DeploymentCenterProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [selectedContract, setSelectedContract] = useState<SmartContract>(
    mockContracts[0],
  );
  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    network: "polygon",
    gasPrice: 40,
    gasLimit: 0,
    constructorArgs: [],
    verifySource: true,
    upgradeability: "proxy",
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentStep, setDeploymentStep] = useState("");
  const [deployedAddress, setDeployedAddress] = useState<string>("");

  const selectedNetwork = mockNetworks.find(
    (n) => n.id === deploymentConfig.network,
  );
  const estimatedCost =
    selectedContract && selectedNetwork
      ? (selectedContract.gasEstimate * deploymentConfig.gasPrice) / 1e9
      : 0;

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentProgress(0);

    const steps = [
      "Compiling contract...",
      "Optimizing bytecode...",
      "Estimating gas...",
      "Sending transaction...",
      "Waiting for confirmation...",
      "Verifying source code...",
      "Deployment complete!",
    ];

    for (let i = 0; i < steps.length; i++) {
      setDeploymentStep(steps[i]);
      setDeploymentProgress(((i + 1) / steps.length) * 100);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setDeployedAddress("0x742d35Cc6634C0532925a3b8D3Ac34b3cc6634C0");
    setIsDeploying(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "congested":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAuditColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
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
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Web3 Deployment Center
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Deploy smart contracts and dApps for peace infrastructure
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                Multi-Chain Ready
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-3 w-3" />
                Config
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 flex">
        {/* Contract Selection */}
        <Card className="w-80 border-r rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Smart Contracts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1 p-3">
                {mockContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedContract.id === contract.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedContract(contract)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{contract.name}</h4>
                      <Badge variant="outline" className="capitalize text-xs">
                        {contract.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {contract.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={getAuditColor(contract.auditStatus)}>
                        {contract.auditStatus}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>{contract.securityScore}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Deployment Interface */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 rounded-none border-x-0">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {selectedContract.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>v{selectedContract.version}</span>
                    <Badge variant="outline">{selectedContract.language}</Badge>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Security: {selectedContract.securityScore}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Code className="mr-2 h-3 w-3" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-3 w-3" />
                    Audit Report
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {!isDeploying && !deployedAddress ? (
                <Tabs defaultValue="config" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="config">Configuration</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="config" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Target Network</Label>
                          <Select
                            value={deploymentConfig.network}
                            onValueChange={(value) =>
                              setDeploymentConfig((prev) => ({
                                ...prev,
                                network: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {mockNetworks.map((network) => (
                                <SelectItem key={network.id} value={network.id}>
                                  <div className="flex items-center space-x-2">
                                    <span>{network.name}</span>
                                    <Badge
                                      className={getStatusColor(network.status)}
                                    >
                                      {network.status}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Gas Price (Gwei)</Label>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              value={deploymentConfig.gasPrice}
                              onChange={(e) =>
                                setDeploymentConfig((prev) => ({
                                  ...prev,
                                  gasPrice: parseFloat(e.target.value),
                                }))
                              }
                            />
                            <div className="flex space-x-1">
                              {selectedNetwork && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setDeploymentConfig((prev) => ({
                                        ...prev,
                                        gasPrice: selectedNetwork.gasPrice.slow,
                                      }))
                                    }
                                  >
                                    Slow
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setDeploymentConfig((prev) => ({
                                        ...prev,
                                        gasPrice:
                                          selectedNetwork.gasPrice.standard,
                                      }))
                                    }
                                  >
                                    Standard
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setDeploymentConfig((prev) => ({
                                        ...prev,
                                        gasPrice: selectedNetwork.gasPrice.fast,
                                      }))
                                    }
                                  >
                                    Fast
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Upgradeability</Label>
                          <Select
                            value={deploymentConfig.upgradeability}
                            onValueChange={(
                              value: "none" | "proxy" | "beacon",
                            ) =>
                              setDeploymentConfig((prev) => ({
                                ...prev,
                                upgradeability: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">
                                No Upgradeability
                              </SelectItem>
                              <SelectItem value="proxy">
                                Transparent Proxy
                              </SelectItem>
                              <SelectItem value="beacon">
                                Beacon Proxy
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Constructor Arguments</Label>
                          <Textarea
                            placeholder="Enter constructor arguments (JSON array)"
                            className="h-24 font-mono text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="verify-source"
                              checked={deploymentConfig.verifySource}
                              onChange={(e) =>
                                setDeploymentConfig((prev) => ({
                                  ...prev,
                                  verifySource: e.target.checked,
                                }))
                              }
                            />
                            <Label htmlFor="verify-source">
                              Verify source code on block explorer
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-3 p-4 border rounded-lg bg-secondary/20">
                          <h4 className="font-medium">
                            Deployment Cost Estimate
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Gas Estimate:</span>
                              <span>
                                {selectedContract.gasEstimate.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Gas Price:</span>
                              <span>{deploymentConfig.gasPrice} Gwei</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Total Cost:</span>
                              <span>
                                ~{estimatedCost.toFixed(6)}{" "}
                                {selectedNetwork?.currency}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Contract Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <div className="font-medium">
                            {selectedContract.name}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Version:
                          </span>
                          <div className="font-medium">
                            v{selectedContract.version}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Language:
                          </span>
                          <div className="font-medium">
                            {selectedContract.language}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Security Score:
                          </span>
                          <div className="font-medium">
                            {selectedContract.securityScore}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedContract.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-muted-foreground">
                          Dependencies:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedContract.dependencies.map((dep) => (
                            <Badge
                              key={dep}
                              variant="outline"
                              className="text-xs"
                            >
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Security Analysis</h3>
                        <Badge
                          className={getAuditColor(
                            selectedContract.auditStatus,
                          )}
                        >
                          Audit: {selectedContract.auditStatus}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              Reentrancy Protection
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Passed
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Access Control</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Passed
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Integer Overflow</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Passed
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Gas Optimization</span>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Review
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <div className="pt-6 border-t">
                    <Button
                      onClick={handleDeploy}
                      className="w-full peace-gradient peace-glow text-lg h-12"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Deploy to {selectedNetwork?.name}
                    </Button>
                  </div>
                </Tabs>
              ) : isDeploying ? (
                <div className="space-y-6 py-8">
                  <div className="text-center">
                    <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Deploying Contract
                    </h3>
                    <p className="text-muted-foreground">{deploymentStep}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(deploymentProgress)}%</span>
                    </div>
                    <Progress value={deploymentProgress} className="h-3" />
                  </div>

                  <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                      Please do not close this window while deployment is in
                      progress. This process may take several minutes depending
                      on network congestion.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-6 py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Deployment Successful!
                    </h3>
                    <p className="text-muted-foreground">
                      Your contract has been deployed and verified on{" "}
                      {selectedNetwork?.name}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Contract Address
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="font-mono">{deployedAddress}</code>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View on Explorer
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download ABI
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Network Status Sidebar */}
        <Card className="w-64 border-l rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Network Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockNetworks.map((network) => (
              <div key={network.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{network.name}</span>
                  <Badge className={getStatusColor(network.status)}>
                    {network.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Block Time:</span>
                    <span>{network.blockTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gas (Standard):</span>
                    <span>{network.gasPrice.standard} Gwei</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finality:</span>
                    <span>{Math.round(network.finalityTime / 60)}m</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Web3DeploymentCenter;
