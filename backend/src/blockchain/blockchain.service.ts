import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import Web3 from "web3";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";

export interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed?: string;
  blockNumber: number;
  timestamp: Date;
  status: "success" | "failed" | "pending";
  type:
    | "peace_action"
    | "violation"
    | "resource_transfer"
    | "governance"
    | "staking";
}

export interface PeaceActionRecord {
  actionId: string;
  actor: string;
  actionType: string;
  description: string;
  reward: string;
  verifier: string;
  timestamp: Date;
  transactionHash: string;
  blockNumber: number;
}

export interface ResourceTransfer {
  transferId: string;
  from: string;
  to: string;
  resourceType: string;
  amount: string;
  region: string;
  purpose: string;
  timestamp: Date;
  transactionHash: string;
}

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private polygonProvider: ethers.providers.JsonRpcProvider;
  private web3: Web3;
  private polkadotApi: ApiPromise;
  private keyring: Keyring;
  private peaceCoinContract: ethers.Contract;
  private daoContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.initializeBlockchainConnections();
  }

  private async initializeBlockchainConnections() {
    try {
      // Initialize Polygon connection
      await this.initializePolygon();

      // Initialize Substrate/Polkadot connection
      await this.initializeSubstrate();

      this.logger.log("Blockchain connections initialized successfully");
    } catch (error) {
      this.logger.error("Failed to initialize blockchain connections:", error);
    }
  }

  private async initializePolygon() {
    const rpcUrl = this.configService.get(
      "POLYGON_RPC_URL",
      "https://polygon-rpc.com",
    );
    const privateKey = this.configService.get("POLYGON_PRIVATE_KEY");
    const peaceCoinAddress = this.configService.get(
      "PEACECOIN_CONTRACT_ADDRESS",
    );
    const daoAddress = this.configService.get("DAO_CONTRACT_ADDRESS");

    // Initialize provider
    this.polygonProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.web3 = new Web3(rpcUrl);

    if (privateKey && peaceCoinAddress) {
      // Initialize wallet
      const wallet = new ethers.Wallet(privateKey, this.polygonProvider);

      // Initialize contracts
      const peaceCoinAbi = await this.getPeaceCoinAbi();
      const daoAbi = await this.getDaoAbi();

      this.peaceCoinContract = new ethers.Contract(
        peaceCoinAddress,
        peaceCoinAbi,
        wallet,
      );

      if (daoAddress) {
        this.daoContract = new ethers.Contract(daoAddress, daoAbi, wallet);
      }

      this.logger.log("Polygon blockchain initialized");
    }
  }

  private async initializeSubstrate() {
    const wsEndpoint = this.configService.get(
      "SUBSTRATE_WS_ENDPOINT",
      "wss://rpc.polkadot.io",
    );
    const substratePrivateKey = this.configService.get("SUBSTRATE_PRIVATE_KEY");

    try {
      // Wait for crypto to be ready
      await cryptoWaitReady();

      // Initialize provider
      const provider = new WsProvider(wsEndpoint);
      this.polkadotApi = await ApiPromise.create({ provider });

      // Initialize keyring
      this.keyring = new Keyring({ type: "sr25519" });

      if (substratePrivateKey) {
        // Add account from private key
        this.keyring.addFromUri(substratePrivateKey);
      }

      this.logger.log("Substrate blockchain initialized");
    } catch (error) {
      this.logger.error("Failed to initialize Substrate:", error);
    }
  }

  // Peace Action Management
  async recordPeaceAction(
    actor: string,
    actionType: string,
    description: string,
    reward: string,
  ): Promise<PeaceActionRecord> {
    try {
      const tx = await this.peaceCoinContract.submitPeaceAction(
        actor,
        actionType,
        description,
      );

      const receipt = await tx.wait();

      const actionRecord: PeaceActionRecord = {
        actionId: receipt.events[0].args.actionId.toString(),
        actor,
        actionType,
        description,
        reward,
        verifier: tx.from,
        timestamp: new Date(),
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };

      this.logger.log(`Peace action recorded: ${actionRecord.actionId}`);
      return actionRecord;
    } catch (error) {
      this.logger.error("Failed to record peace action:", error);
      throw error;
    }
  }

  async verifyPeaceAction(actionId: string): Promise<boolean> {
    try {
      const tx = await this.peaceCoinContract.verifyPeaceAction(actionId);
      await tx.wait();

      this.logger.log(`Peace action verified: ${actionId}`);
      return true;
    } catch (error) {
      this.logger.error("Failed to verify peace action:", error);
      return false;
    }
  }

  async recordViolation(
    violator: string,
    violationType: string,
    description: string,
    penalty: string,
  ): Promise<string> {
    try {
      const tx = await this.peaceCoinContract.submitViolation(
        violator,
        violationType,
        description,
      );

      const receipt = await tx.wait();
      const violationId = receipt.events[0].args.violationId.toString();

      this.logger.log(`Violation recorded: ${violationId}`);
      return violationId;
    } catch (error) {
      this.logger.error("Failed to record violation:", error);
      throw error;
    }
  }

  // Resource Transfer Management
  async recordResourceTransfer(
    from: string,
    to: string,
    resourceType: string,
    amount: string,
    region: string,
    purpose: string,
  ): Promise<ResourceTransfer> {
    try {
      // Create custom transaction on Substrate for resource tracking
      if (this.polkadotApi && this.keyring.pairs.length > 0) {
        const account = this.keyring.pairs[0];

        // Create remark with resource transfer data
        const data = {
          type: "resource_transfer",
          from,
          to,
          resourceType,
          amount,
          region,
          purpose,
          timestamp: new Date().toISOString(),
        };

        const tx = this.polkadotApi.tx.system.remark(JSON.stringify(data));
        const hash = await tx.signAndSend(account);

        const transfer: ResourceTransfer = {
          transferId: hash.toString(),
          from,
          to,
          resourceType,
          amount,
          region,
          purpose,
          timestamp: new Date(),
          transactionHash: hash.toString(),
        };

        this.logger.log(`Resource transfer recorded: ${transfer.transferId}`);
        return transfer;
      }

      throw new Error("Substrate connection not available");
    } catch (error) {
      this.logger.error("Failed to record resource transfer:", error);
      throw error;
    }
  }

  // Commons Management
  async getResourceSupply(resourceType: string): Promise<string> {
    try {
      // Query resource supply from smart contract or substrate storage
      if (this.polkadotApi) {
        const supply =
          await this.polkadotApi.query.system.account("resource_registry");
        // Parse and return resource supply
        return "0"; // Placeholder
      }
      return "0";
    } catch (error) {
      this.logger.error("Failed to get resource supply:", error);
      return "0";
    }
  }

  async updateResourceAllocation(
    resourceType: string,
    region: string,
    allocation: string,
  ): Promise<boolean> {
    try {
      if (this.polkadotApi && this.keyring.pairs.length > 0) {
        const account = this.keyring.pairs[0];

        const data = {
          type: "resource_allocation",
          resourceType,
          region,
          allocation,
          timestamp: new Date().toISOString(),
        };

        const tx = this.polkadotApi.tx.system.remark(JSON.stringify(data));
        await tx.signAndSend(account);

        this.logger.log(
          `Resource allocation updated: ${resourceType} in ${region}`,
        );
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error("Failed to update resource allocation:", error);
      return false;
    }
  }

  // Governance Functions
  async createProposal(
    title: string,
    description: string,
    proposalType: string,
    targets: string[],
    values: string[],
    calldatas: string[],
  ): Promise<string> {
    try {
      if (this.daoContract) {
        const tx = await this.daoContract.propose(
          targets,
          values,
          calldatas,
          description,
          proposalType,
          "general",
          "global",
          [],
          3, // Medium urgency
        );

        const receipt = await tx.wait();
        const proposalId = receipt.events[0].args.proposalId.toString();

        this.logger.log(`Proposal created: ${proposalId}`);
        return proposalId;
      }

      throw new Error("DAO contract not available");
    } catch (error) {
      this.logger.error("Failed to create proposal:", error);
      throw error;
    }
  }

  async vote(proposalId: string, support: boolean): Promise<boolean> {
    try {
      if (this.daoContract) {
        const tx = await this.daoContract.castVote(proposalId, support ? 1 : 0);
        await tx.wait();

        this.logger.log(`Vote cast for proposal: ${proposalId}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error("Failed to cast vote:", error);
      return false;
    }
  }

  // Disarmament Verification
  async verifyDisarmament(
    country: string,
    weaponType: string,
    quantity: number,
    verificationData: any,
  ): Promise<string> {
    try {
      const data = {
        type: "disarmament_verification",
        country,
        weaponType,
        quantity,
        verificationData,
        timestamp: new Date().toISOString(),
        verifier: "PAXIS_SYSTEM",
      };

      if (this.polkadotApi && this.keyring.pairs.length > 0) {
        const account = this.keyring.pairs[0];
        const tx = this.polkadotApi.tx.system.remark(JSON.stringify(data));
        const hash = await tx.signAndSend(account);

        // Also record peace action for disarmament
        await this.recordPeaceAction(
          country,
          "DISARMAMENT",
          `Dismantled ${quantity} ${weaponType}`,
          (quantity * 5000).toString(), // 5000 PC per unit
        );

        this.logger.log(`Disarmament verified: ${hash.toString()}`);
        return hash.toString();
      }

      throw new Error("Substrate connection not available");
    } catch (error) {
      this.logger.error("Failed to verify disarmament:", error);
      throw error;
    }
  }

  // Utility Functions
  async getTransactionHistory(
    address: string,
  ): Promise<BlockchainTransaction[]> {
    try {
      const transactions: BlockchainTransaction[] = [];

      // Get Polygon transactions
      if (this.polygonProvider) {
        const latestBlock = await this.polygonProvider.getBlockNumber();

        for (let i = Math.max(0, latestBlock - 100); i <= latestBlock; i++) {
          const block = await this.polygonProvider.getBlockWithTransactions(i);

          for (const tx of block.transactions) {
            if (tx.from === address || tx.to === address) {
              const receipt = await this.polygonProvider.getTransactionReceipt(
                tx.hash,
              );

              transactions.push({
                hash: tx.hash,
                from: tx.from,
                to: tx.to || "",
                value: ethers.utils.formatEther(tx.value),
                gasUsed: receipt.gasUsed.toString(),
                blockNumber: tx.blockNumber || 0,
                timestamp: new Date(block.timestamp * 1000),
                status: receipt.status === 1 ? "success" : "failed",
                type: this.determineTransactionType(tx),
              });
            }
          }
        }
      }

      return transactions;
    } catch (error) {
      this.logger.error("Failed to get transaction history:", error);
      return [];
    }
  }

  async getNetworkStats(): Promise<any> {
    try {
      const stats = {
        polygon: {
          blockNumber: 0,
          gasPrice: "0",
          networkId: 0,
        },
        substrate: {
          blockNumber: 0,
          totalIssuance: "0",
          validators: 0,
        },
      };

      if (this.polygonProvider) {
        stats.polygon.blockNumber = await this.polygonProvider.getBlockNumber();
        stats.polygon.gasPrice = (
          await this.polygonProvider.getGasPrice()
        ).toString();
        stats.polygon.networkId = (
          await this.polygonProvider.getNetwork()
        ).chainId;
      }

      if (this.polkadotApi) {
        const header = await this.polkadotApi.rpc.chain.getHeader();
        stats.substrate.blockNumber = header.number.toNumber();

        const totalIssuance =
          await this.polkadotApi.query.balances.totalIssuance();
        stats.substrate.totalIssuance = totalIssuance.toString();

        const validators = await this.polkadotApi.query.session.validators();
        stats.substrate.validators = validators.length;
      }

      return stats;
    } catch (error) {
      this.logger.error("Failed to get network stats:", error);
      return {};
    }
  }

  private determineTransactionType(tx: any): BlockchainTransaction["type"] {
    // Analyze transaction data to determine type
    if (tx.data && tx.data.includes("peace")) return "peace_action";
    if (tx.data && tx.data.includes("violation")) return "violation";
    if (tx.data && tx.data.includes("resource")) return "resource_transfer";
    if (tx.data && tx.data.includes("vote")) return "governance";
    if (tx.data && tx.data.includes("stake")) return "staking";
    return "peace_action"; // Default
  }

  private async getPeaceCoinAbi(): Promise<any> {
    // Return ABI for PeaceCoin contract
    return [
      "function submitPeaceAction(address actor, string actionType, string description) returns (uint256)",
      "function verifyPeaceAction(uint256 actionId)",
      "function submitViolation(address violator, string violationType, string description) returns (uint256)",
      "function getUserStats(address user) view returns (uint256, uint256, uint256, uint256)",
      "function balanceOf(address owner) view returns (uint256)",
      "function transfer(address to, uint256 amount) returns (bool)",
      "event PeaceActionSubmitted(uint256 indexed actionId, address indexed actor, string actionType, uint256 reward)",
      "event ViolationSubmitted(uint256 indexed violationId, address indexed violator, string violationType, uint256 penalty)",
    ];
  }

  private async getDaoAbi(): Promise<any> {
    // Return ABI for PeaceDAO contract
    return [
      "function propose(address[] targets, uint256[] values, bytes[] calldatas, string description, uint8 proposalType, string category, string conflictRegion, address[] stakeholders, uint256 urgencyLevel) returns (uint256)",
      "function castVote(uint256 proposalId, uint8 support) returns (uint256)",
      "function state(uint256 proposalId) view returns (uint8)",
      "function proposalVotes(uint256 proposalId) view returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes)",
      "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)",
      "event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason)",
    ];
  }
}
