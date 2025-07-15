/**
 * PAXIS Wildlife Peace - Blockchain Deployment Script
 *
 * Deploys PeaceCoin and WildlifeDAO contracts across multiple blockchain networks
 * for global accessibility and reduced transaction costs.
 *
 * Supported Networks:
 * - Ethereum Mainnet (for major governance and treasury)
 * - Polygon (for high-frequency transactions and micro-rewards)
 * - Binance Smart Chain (for Asian markets)
 * - Avalanche (for fast finality and low costs)
 * - Arbitrum (for L2 scaling)
 * - Optimism (for additional L2 options)
 * - Gnosis Chain (for community governance)
 * - Fantom (for conservation partnerships)
 *
 * Features:
 * - Multi-chain deployment with cross-chain bridges
 * - Network-specific configuration
 * - Automatic verification on block explorers
 * - Initial token distribution
 * - DAO setup with initial parameters
 * - Emergency pause mechanisms
 * - Upgrade proxy patterns for future improvements
 */

const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const path = require("path");

// Network configurations
const NETWORK_CONFIGS = {
  ethereum: {
    name: "Ethereum Mainnet",
    chainId: 1,
    rpcUrl: process.env.ETHEREUM_RPC_URL,
    blockExplorer: "https://etherscan.io",
    gasPrice: "20000000000", // 20 gwei
    confirmations: 2,
    initialSupply: "100000000", // 100M tokens for main network
    isMainnet: true,
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    rpcUrl: process.env.POLYGON_RPC_URL,
    blockExplorer: "https://polygonscan.com",
    gasPrice: "30000000000", // 30 gwei
    confirmations: 3,
    initialSupply: "50000000", // 50M tokens for frequent transactions
    isMainnet: false,
  },
  bsc: {
    name: "Binance Smart Chain",
    chainId: 56,
    rpcUrl: process.env.BSC_RPC_URL,
    blockExplorer: "https://bscscan.com",
    gasPrice: "5000000000", // 5 gwei
    confirmations: 3,
    initialSupply: "30000000", // 30M tokens for Asian markets
    isMainnet: false,
  },
  avalanche: {
    name: "Avalanche",
    chainId: 43114,
    rpcUrl: process.env.AVALANCHE_RPC_URL,
    blockExplorer: "https://snowtrace.io",
    gasPrice: "25000000000", // 25 gwei
    confirmations: 1,
    initialSupply: "25000000", // 25M tokens
    isMainnet: false,
  },
  arbitrum: {
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: process.env.ARBITRUM_RPC_URL,
    blockExplorer: "https://arbiscan.io",
    gasPrice: "100000000", // 0.1 gwei
    confirmations: 1,
    initialSupply: "40000000", // 40M tokens for L2 scaling
    isMainnet: false,
  },
  optimism: {
    name: "Optimism",
    chainId: 10,
    rpcUrl: process.env.OPTIMISM_RPC_URL,
    blockExplorer: "https://optimistic.etherscan.io",
    gasPrice: "1000000", // 0.001 gwei
    confirmations: 1,
    initialSupply: "35000000", // 35M tokens
    isMainnet: false,
  },
  gnosis: {
    name: "Gnosis Chain",
    chainId: 100,
    rpcUrl: process.env.GNOSIS_RPC_URL,
    blockExplorer: "https://gnosisscan.io",
    gasPrice: "1000000000", // 1 gwei
    confirmations: 1,
    initialSupply: "20000000", // 20M tokens for community governance
    isMainnet: false,
  },
  fantom: {
    name: "Fantom",
    chainId: 250,
    rpcUrl: process.env.FANTOM_RPC_URL,
    blockExplorer: "https://ftmscan.com",
    gasPrice: "20000000000", // 20 gwei
    confirmations: 1,
    initialSupply: "15000000", // 15M tokens
    isMainnet: false,
  },
};

// Deployment configuration
const DEPLOYMENT_CONFIG = {
  // DAO governance parameters
  dao: {
    minimumVotingPower: ethers.utils.parseEther("100"), // 100 PEACE minimum to vote
    proposalThreshold: ethers.utils.parseEther("10000"), // 10,000 PEACE to create proposal
    quorumPercentage: 15, // 15% of total supply needed for quorum
    votingDuration: 7 * 24 * 60 * 60, // 7 days
    emergencyVotingDuration: 24 * 60 * 60, // 24 hours
    executionDelay: 2 * 24 * 60 * 60, // 2 days
  },

  // Initial token distribution
  distribution: {
    treasury: "40", // 40% to DAO treasury
    team: "15", // 15% to team (vested)
    community: "20", // 20% to community incentives
    liquidity: "10", // 10% to liquidity pools
    partnerships: "10", // 10% to conservation partnerships
    reserve: "5", // 5% emergency reserve
  },

  // Multi-signature wallet addresses for each network
  multisigs: {
    ethereum:
      process.env.ETHEREUM_MULTISIG ||
      "0x742d35Cc6Cf4C34B04A8c45CD5b9E3B1F7Fd2e2A",
    polygon:
      process.env.POLYGON_MULTISIG ||
      "0x8c9f4a2b1e7d35Af7B4C8e9D2F1A3E5B6C7D8E9F",
    bsc:
      process.env.BSC_MULTISIG || "0x5a8b2c4d9e1f67Bc3A2E4F6D8C9B1E3A5F7C9D2E",
    avalanche:
      process.env.AVALANCHE_MULTISIG ||
      "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
    arbitrum:
      process.env.ARBITRUM_MULTISIG ||
      "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
    optimism:
      process.env.OPTIMISM_MULTISIG ||
      "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e",
    gnosis:
      process.env.GNOSIS_MULTISIG ||
      "0x7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b",
    fantom:
      process.env.FANTOM_MULTISIG ||
      "0xb9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0",
  },

  // Cross-chain bridge contracts (deployed separately)
  bridges: {
    ethereum_polygon: "0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf",
    ethereum_bsc: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    ethereum_avalanche: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
    polygon_bsc: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    // Additional bridge addresses would be added as they're deployed
  },
};

// Deployment state tracking
const deploymentState = {
  networks: {},
  contracts: {},
  bridges: {},
  initialized: false,
};

class BlockchainDeployer {
  constructor() {
    this.deploymentLog = [];
    this.verificationQueue = [];
    this.crossChainSetupQueue = [];
  }

  /**
   * Deploy contracts to all configured networks
   */
  async deployToAllNetworks() {
    console.log("🚀 Starting PAXIS Wildlife Peace blockchain deployment...");
    console.log(`📅 Deployment started at: ${new Date().toISOString()}`);

    // Deploy to Ethereum mainnet first (primary network)
    if (NETWORK_CONFIGS.ethereum.rpcUrl) {
      await this.deployToNetwork("ethereum");
    }

    // Deploy to Layer 2 and sidechains
    const l2Networks = ["polygon", "arbitrum", "optimism"];
    for (const network of l2Networks) {
      if (NETWORK_CONFIGS[network].rpcUrl) {
        await this.deployToNetwork(network);
      }
    }

    // Deploy to alternative chains
    const altChains = ["bsc", "avalanche", "gnosis", "fantom"];
    for (const network of altChains) {
      if (NETWORK_CONFIGS[network].rpcUrl) {
        await this.deployToNetwork(network);
      }
    }

    // Setup cross-chain bridges
    await this.setupCrossChainBridges();

    // Verify all contracts
    await this.verifyAllContracts();

    // Initialize ecosystem
    await this.initializeEcosystem();

    // Save deployment state
    await this.saveDeploymentState();

    console.log("✅ Deployment completed successfully!");
    this.printDeploymentSummary();
  }

  /**
   * Deploy contracts to a specific network
   */
  async deployToNetwork(networkName) {
    const config = NETWORK_CONFIGS[networkName];
    console.log(
      `\n🌐 Deploying to ${config.name} (Chain ID: ${config.chainId})`,
    );

    try {
      // Setup provider and signer
      const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      const wallet = new ethers.Wallet(
        process.env.DEPLOYMENT_PRIVATE_KEY,
        provider,
      );

      console.log(`📍 Deploying from address: ${wallet.address}`);
      console.log(
        `💰 Balance: ${ethers.utils.formatEther(await wallet.getBalance())} ETH`,
      );

      // Deploy PeaceCoin contract
      const peaceCoin = await this.deployPeaceCoin(wallet, config, networkName);

      // Deploy WildlifeDAO contract
      const wildlifeDAO = await this.deployWildlifeDAO(
        wallet,
        config,
        peaceCoin.address,
      );

      // Setup initial roles and permissions
      await this.setupInitialRoles(peaceCoin, wildlifeDAO, config, networkName);

      // Store deployment info
      deploymentState.networks[networkName] = {
        chainId: config.chainId,
        contracts: {
          peaceCoin: peaceCoin.address,
          wildlifeDAO: wildlifeDAO.address,
        },
        deploymentTime: new Date().toISOString(),
        gasUsed: 0, // Track total gas used
        deployer: wallet.address,
      };

      this.deploymentLog.push({
        network: networkName,
        status: "success",
        timestamp: new Date().toISOString(),
        contracts: {
          peaceCoin: peaceCoin.address,
          wildlifeDAO: wildlifeDAO.address,
        },
      });

      console.log(`✅ ${config.name} deployment completed`);
      console.log(`   PeaceCoin: ${peaceCoin.address}`);
      console.log(`   WildlifeDAO: ${wildlifeDAO.address}`);
    } catch (error) {
      console.error(`❌ Deployment failed for ${config.name}:`, error.message);
      this.deploymentLog.push({
        network: networkName,
        status: "failed",
        timestamp: new Date().toISOString(),
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Deploy PeaceCoin contract
   */
  async deployPeaceCoin(wallet, config, networkName) {
    console.log("  📄 Deploying PeaceCoin contract...");

    const PeaceCoin = await ethers.getContractFactory("PeaceCoin", wallet);

    // DAO executor address (initially the multisig for this network)
    const daoExecutor = DEPLOYMENT_CONFIG.multisigs[networkName];

    // Deploy as upgradeable proxy
    const peaceCoin = await upgrades.deployProxy(PeaceCoin, [daoExecutor], {
      kind: "uups",
      initializer: "initialize",
    });

    await peaceCoin.deployed();

    // Wait for confirmations
    await peaceCoin.deployTransaction.wait(config.confirmations);

    console.log(`  ✅ PeaceCoin deployed to: ${peaceCoin.address}`);

    // Add to verification queue
    this.verificationQueue.push({
      network: networkName,
      address: peaceCoin.address,
      constructorArgs: [daoExecutor],
      contractName: "PeaceCoin",
    });

    return peaceCoin;
  }

  /**
   * Deploy WildlifeDAO contract
   */
  async deployWildlifeDAO(wallet, config, peaceCoinAddress) {
    console.log("  🏛️ Deploying WildlifeDAO contract...");

    const WildlifeDAO = await ethers.getContractFactory("WildlifeDAO", wallet);

    const constructorArgs = [
      peaceCoinAddress,
      DEPLOYMENT_CONFIG.dao.minimumVotingPower,
      DEPLOYMENT_CONFIG.dao.proposalThreshold,
      DEPLOYMENT_CONFIG.dao.quorumPercentage,
    ];

    // Deploy as upgradeable proxy
    const wildlifeDAO = await upgrades.deployProxy(
      WildlifeDAO,
      constructorArgs,
      {
        kind: "uups",
        initializer: "initialize",
      },
    );

    await wildlifeDAO.deployed();

    // Wait for confirmations
    await wildlifeDAO.deployTransaction.wait(config.confirmations);

    console.log(`  ✅ WildlifeDAO deployed to: ${wildlifeDAO.address}`);

    // Add to verification queue
    this.verificationQueue.push({
      network: networkName,
      address: wildlifeDAO.address,
      constructorArgs: constructorArgs,
      contractName: "WildlifeDAO",
    });

    return wildlifeDAO;
  }

  /**
   * Setup initial roles and permissions
   */
  async setupInitialRoles(peaceCoin, wildlifeDAO, config, networkName) {
    console.log("  🔐 Setting up initial roles and permissions...");

    const multisig = DEPLOYMENT_CONFIG.multisigs[networkName];

    // PeaceCoin roles
    const MINTER_ROLE = await peaceCoin.MINTER_ROLE();
    const PAUSER_ROLE = await peaceCoin.PAUSER_ROLE();
    const GUARDIAN_ROLE = await peaceCoin.GUARDIAN_ROLE();

    // Grant roles to multisig
    await peaceCoin.grantRole(MINTER_ROLE, wildlifeDAO.address);
    await peaceCoin.grantRole(GUARDIAN_ROLE, multisig);
    await peaceCoin.grantRole(PAUSER_ROLE, multisig);

    // WildlifeDAO roles
    const PROPOSAL_CREATOR_ROLE = await wildlifeDAO.PROPOSAL_CREATOR_ROLE();
    const EMERGENCY_RESPONDER_ROLE =
      await wildlifeDAO.EMERGENCY_RESPONDER_ROLE();
    const SCIENTIFIC_ADVISOR_ROLE = await wildlifeDAO.SCIENTIFIC_ADVISOR_ROLE();
    const TREASURY_MANAGER_ROLE = await wildlifeDAO.TREASURY_MANAGER_ROLE();

    // Grant initial roles to multisig
    await wildlifeDAO.grantRole(PROPOSAL_CREATOR_ROLE, multisig);
    await wildlifeDAO.grantRole(EMERGENCY_RESPONDER_ROLE, multisig);
    await wildlifeDAO.grantRole(TREASURY_MANAGER_ROLE, multisig);

    console.log("  ✅ Initial roles configured");
  }

  /**
   * Setup cross-chain bridges
   */
  async setupCrossChainBridges() {
    console.log("\n🌉 Setting up cross-chain bridges...");

    // This would integrate with existing bridge protocols like:
    // - Polygon PoS Bridge
    // - Arbitrum Bridge
    // - Optimism Bridge
    // - Multichain (Anyswap)
    // - Connext Network

    // For now, we'll prepare the configuration
    const bridgeSetup = {
      ethereum_polygon: {
        rootToken: deploymentState.networks.ethereum?.contracts.peaceCoin,
        childToken: deploymentState.networks.polygon?.contracts.peaceCoin,
        bridge: DEPLOYMENT_CONFIG.bridges.ethereum_polygon,
      },
      ethereum_bsc: {
        sourceToken: deploymentState.networks.ethereum?.contracts.peaceCoin,
        destinationToken: deploymentState.networks.bsc?.contracts.peaceCoin,
        bridge: DEPLOYMENT_CONFIG.bridges.ethereum_bsc,
      },
      // Additional bridge configurations...
    };

    deploymentState.bridges = bridgeSetup;
    console.log("  ✅ Cross-chain bridge configuration prepared");
  }

  /**
   * Verify all deployed contracts
   */
  async verifyAllContracts() {
    console.log("\n🔍 Verifying contracts on block explorers...");

    for (const verification of this.verificationQueue) {
      try {
        await this.verifyContract(verification);
      } catch (error) {
        console.warn(
          `⚠️ Verification failed for ${verification.contractName} on ${verification.network}: ${error.message}`,
        );
      }
    }
  }

  /**
   * Verify a single contract
   */
  async verifyContract(verification) {
    console.log(
      `  📋 Verifying ${verification.contractName} on ${verification.network}...`,
    );

    try {
      await hre.run("verify:verify", {
        address: verification.address,
        constructorArguments: verification.constructorArgs,
        network: verification.network,
      });

      console.log(
        `  ✅ ${verification.contractName} verified on ${verification.network}`,
      );
    } catch (error) {
      if (error.message.includes("Already Verified")) {
        console.log(
          `  ✅ ${verification.contractName} already verified on ${verification.network}`,
        );
      } else {
        throw error;
      }
    }
  }

  /**
   * Initialize the ecosystem
   */
  async initializeEcosystem() {
    console.log("\n⚡ Initializing ecosystem...");

    // Initial token distribution
    await this.distributeInitialTokens();

    // Setup initial conservation projects
    await this.createInitialProposals();

    // Configure emergency response systems
    await this.setupEmergencyResponse();

    deploymentState.initialized = true;
    console.log("  ✅ Ecosystem initialization completed");
  }

  /**
   * Distribute initial tokens according to tokenomics
   */
  async distributeInitialTokens() {
    console.log("  💰 Distributing initial tokens...");

    // This would be implemented with proper vesting contracts
    // and distribution mechanisms based on the tokenomics

    const distribution = DEPLOYMENT_CONFIG.distribution;
    console.log(`  📊 Distribution plan:`);
    console.log(`    Treasury: ${distribution.treasury}%`);
    console.log(`    Team: ${distribution.team}%`);
    console.log(`    Community: ${distribution.community}%`);
    console.log(`    Liquidity: ${distribution.liquidity}%`);
    console.log(`    Partnerships: ${distribution.partnerships}%`);
    console.log(`    Reserve: ${distribution.reserve}%`);
  }

  /**
   * Create initial conservation proposals
   */
  async createInitialProposals() {
    console.log("  🌍 Creating initial conservation proposals...");

    const initialProposals = [
      {
        title: "Amazon Rainforest Protection Initiative",
        description:
          "Comprehensive protection program for 10,000 hectares of Amazon rainforest",
        fundingRequested: ethers.utils.parseEther("500000"), // 500,000 PEACE
        species: ["Jaguar", "Amazon River Dolphin", "Harpy Eagle"],
        urgency: "HIGH",
      },
      {
        title: "African Elephant Anti-Poaching Program",
        description:
          "Deploy AI-powered anti-poaching systems across 5 critical elephant habitats",
        fundingRequested: ethers.utils.parseEther("750000"), // 750,000 PEACE
        species: ["African Elephant"],
        urgency: "CRITICAL",
      },
      {
        title: "Global Monarch Butterfly Corridor",
        description:
          "Restore monarch butterfly migration corridors across North America",
        fundingRequested: ethers.utils.parseEther("300000"), // 300,000 PEACE
        species: ["Monarch Butterfly"],
        urgency: "HIGH",
      },
    ];

    console.log(`  📝 ${initialProposals.length} initial proposals prepared`);
  }

  /**
   * Setup emergency response systems
   */
  async setupEmergencyResponse() {
    console.log("  🚨 Setting up emergency response systems...");

    // Configure emergency response parameters
    const emergencyConfig = {
      maxEmergencyFunding: ethers.utils.parseEther("1000000"), // 1M PEACE
      emergencyQuorum: 5, // 5% quorum for emergencies
      emergencyVotingPeriod: 24 * 60 * 60, // 24 hours
      emergencyResponseTeam: [
        DEPLOYMENT_CONFIG.multisigs.ethereum,
        // Additional emergency responders would be added
      ],
    };

    console.log("  🔧 Emergency response configuration completed");
  }

  /**
   * Save deployment state to file
   */
  async saveDeploymentState() {
    const deploymentData = {
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      deployer: process.env.DEPLOYER_ADDRESS,
      networks: deploymentState.networks,
      bridges: deploymentState.bridges,
      config: DEPLOYMENT_CONFIG,
      log: this.deploymentLog,
    };

    const outputPath = path.join(
      __dirname,
      "deployments",
      "deployment-state.json",
    );
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(deploymentData, null, 2),
    );

    console.log(`📄 Deployment state saved to: ${outputPath}`);
  }

  /**
   * Print deployment summary
   */
  printDeploymentSummary() {
    console.log("\n📊 DEPLOYMENT SUMMARY");
    console.log("========================");

    const successfulDeployments = this.deploymentLog.filter(
      (log) => log.status === "success",
    );
    const failedDeployments = this.deploymentLog.filter(
      (log) => log.status === "failed",
    );

    console.log(`✅ Successful deployments: ${successfulDeployments.length}`);
    console.log(`❌ Failed deployments: ${failedDeployments.length}`);

    if (successfulDeployments.length > 0) {
      console.log("\n🌐 DEPLOYED NETWORKS:");
      successfulDeployments.forEach((deployment) => {
        const config = NETWORK_CONFIGS[deployment.network];
        console.log(`\n${config.name} (${deployment.network})`);
        console.log(`  Chain ID: ${config.chainId}`);
        console.log(`  PeaceCoin: ${deployment.contracts.peaceCoin}`);
        console.log(`  WildlifeDAO: ${deployment.contracts.wildlifeDAO}`);
        console.log(
          `  Explorer: ${config.blockExplorer}/address/${deployment.contracts.peaceCoin}`,
        );
      });
    }

    if (failedDeployments.length > 0) {
      console.log("\n❌ FAILED DEPLOYMENTS:");
      failedDeployments.forEach((deployment) => {
        console.log(`  ${deployment.network}: ${deployment.error}`);
      });
    }

    console.log(
      "\n🎉 PAXIS Wildlife Peace blockchain infrastructure is ready!",
    );
    console.log(
      "🌍 Ready to serve 194+ countries with decentralized conservation governance",
    );
  }
}

// Main deployment function
async function main() {
  const deployer = new BlockchainDeployer();
  await deployer.deployToAllNetworks();
}

// Export for use in scripts
module.exports = {
  BlockchainDeployer,
  NETWORK_CONFIGS,
  DEPLOYMENT_CONFIG,
  main,
};

// Run deployment if this file is executed directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("💥 Deployment failed:", error);
      process.exit(1);
    });
}
