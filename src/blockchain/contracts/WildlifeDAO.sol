// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PeaceCoin.sol";

/**
 * @title WildlifeDAO
 * @dev Decentralized Autonomous Organization for global wildlife conservation governance
 * 
 * Features:
 * - Species-specific conservation proposals
 * - Faith-integrated decision making
 * - Multi-stakeholder voting (guardians, communities, experts)
 * - Emergency response mechanisms
 * - Cross-border conservation coordination
 * - Funding allocation and treasury management
 * - Scientific advisory integration
 * - Indigenous wisdom council representation
 */
contract WildlifeDAO is AccessControl, ReentrancyGuard {
    using SafeMath for uint256;

    // Role definitions
    bytes32 public constant PROPOSAL_CREATOR_ROLE = keccak256("PROPOSAL_CREATOR_ROLE");
    bytes32 public constant EMERGENCY_RESPONDER_ROLE = keccak256("EMERGENCY_RESPONDER_ROLE");
    bytes32 public constant SCIENTIFIC_ADVISOR_ROLE = keccak256("SCIENTIFIC_ADVISOR_ROLE");
    bytes32 public constant INDIGENOUS_COUNCIL_ROLE = keccak256("INDIGENOUS_COUNCIL_ROLE");
    bytes32 public constant FAITH_LEADER_ROLE = keccak256("FAITH_LEADER_ROLE");
    bytes32 public constant TREASURY_MANAGER_ROLE = keccak256("TREASURY_MANAGER_ROLE");

    // Proposal types
    enum ProposalType {
        SPECIES_PROTECTION,
        HABITAT_CONSERVATION,
        RESEARCH_FUNDING,
        EMERGENCY_RESPONSE,
        POLICY_ADVOCACY,
        COMMUNITY_ENGAGEMENT,
        FAITH_INTEGRATION,
        TECHNOLOGY_DEVELOPMENT,
        EDUCATION_OUTREACH,
        CROSS_BORDER_COLLABORATION
    }

    // Proposal status
    enum ProposalStatus {
        DRAFT,
        ACTIVE,
        PASSED,
        REJECTED,
        EXECUTED,
        CANCELLED,
        EXPIRED
    }

    // Voting choices
    enum VoteChoice {
        ABSTAIN,
        FOR,
        AGAINST
    }

    // Stakeholder types for weighted voting
    enum StakeholderType {
        COMMUNITY_MEMBER,
        SPECIES_GUARDIAN,
        VERIFIED_CONSERVATIONIST,
        SCIENTIFIC_EXPERT,
        INDIGENOUS_REPRESENTATIVE,
        FAITH_LEADER,
        GOVERNMENT_LIAISON,
        TECHNOLOGY_CONTRIBUTOR
    }

    // Conservation urgency levels
    enum UrgencyLevel {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL,
        EMERGENCY
    }

    struct Proposal {
        uint256 id;
        string title;
        string description;
        ProposalType proposalType;
        UrgencyLevel urgency;
        
        // Target details
        string[] targetSpecies;
        string[] targetHabitats;
        string[] affectedCountries;
        uint256[] affectedRegions;
        
        // Financial aspects
        uint256 fundingRequested;
        string currency;
        address payable fundingRecipient;
        string budgetBreakdown;
        
        // Proposal metadata
        address proposer;
        StakeholderType proposerType;
        uint256 creationTime;
        uint256 votingStart;
        uint256 votingEnd;
        uint256 executionDeadline;
        
        // Scientific backing
        string[] researchReferences;
        address[] scientificEndorsers;
        uint256 evidenceQualityScore; // 1-100
        
        // Faith and cultural considerations
        string[] faithTraditions;
        string spiritualSignificance;
        address[] faithLeaderEndorsers;
        string culturalImpactAssessment;
        
        // Implementation details
        string implementationPlan;
        string[] successMetrics;
        string[] risksAndMitigation;
        address[] implementationPartners;
        
        // Voting results
        uint256 totalVotingPower;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 abstainVotes;
        uint256 participantCount;
        
        // Status and execution
        ProposalStatus status;
        string executionNotes;
        uint256 executionDate;
        bool emergencyFastTrack;
        
        // Community engagement
        uint256 discussionThreadId;
        uint256 publicCommentCount;
        string[] mediaLinks;
    }

    struct Vote {
        address voter;
        VoteChoice choice;
        uint256 votingPower;
        StakeholderType voterType;
        uint256 timestamp;
        string rationale;
        bool isPublic;
    }

    struct StakeholderProfile {
        StakeholderType stakeholderType;
        string[] expertise;
        string[] affectedRegions;
        string[] conservationFocus;
        uint256 contributionScore;
        uint256 reputationScore;
        bool isVerified;
        uint256 participationCount;
        uint256 successfulProposals;
    }

    struct TreasuryAllocation {
        string purpose;
        uint256 amount;
        address recipient;
        uint256 releaseDate;
        bool released;
        uint256 proposalId;
    }

    struct EmergencyResponse {
        uint256 id;
        string title;
        string description;
        UrgencyLevel urgency;
        string[] affectedSpecies;
        string[] affectedHabitats;
        uint256 responseDeadline;
        uint256 fundingAllocated;
        address[] responders;
        string[] actionsTaken;
        bool resolved;
        uint256 creationTime;
    }

    // State variables
    PeaceCoin public peaceToken;
    uint256 public proposalCount;
    uint256 public emergencyResponseCount;
    
    // Governance parameters
    uint256 public minimumVotingPower;
    uint256 public proposalThreshold;
    uint256 public quorumPercentage;
    uint256 public votingDuration;
    uint256 public emergencyVotingDuration;
    uint256 public executionDelay;
    
    // Stakeholder voting weights
    mapping(StakeholderType => uint256) public stakeholderWeights;
    
    // Storage mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => EmergencyResponse) public emergencyResponses;
    mapping(address => StakeholderProfile) public stakeholderProfiles;
    mapping(uint256 => mapping(address => Vote)) public proposalVotes;
    mapping(uint256 => address[]) public proposalVoters;
    mapping(address => uint256[]) public userProposals;
    mapping(address => uint256[]) public userVotes;
    
    // Treasury management
    mapping(string => uint256) public treasuryBalances; // currency => amount
    TreasuryAllocation[] public treasuryAllocations;
    uint256 public totalTreasuryAllocated;
    
    // Emergency response tracking
    mapping(string => uint256[]) public speciesEmergencies; // species => emergency IDs
    mapping(string => uint256[]) public habitatEmergencies; // habitat => emergency IDs
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalType proposalType,
        string title,
        uint256 fundingRequested
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        VoteChoice choice,
        uint256 votingPower,
        StakeholderType voterType
    );

    event ProposalExecuted(
        uint256 indexed proposalId,
        bool successful,
        string executionNotes
    );

    event EmergencyResponseActivated(
        uint256 indexed emergencyId,
        string title,
        UrgencyLevel urgency,
        uint256 fundingAllocated
    );

    event TreasuryFundsAllocated(
        uint256 indexed proposalId,
        address recipient,
        uint256 amount,
        string purpose
    );

    event StakeholderVerified(
        address indexed stakeholder,
        StakeholderType stakeholderType,
        address indexed verifier
    );

    event ScientificEndorsement(
        uint256 indexed proposalId,
        address indexed scientist,
        uint256 evidenceScore
    );

    event FaithLeaderEndorsement(
        uint256 indexed proposalId,
        address indexed faithLeader,
        string tradition
    );

    // Custom errors
    error InsufficientVotingPower(uint256 required, uint256 available);
    error ProposalNotActive(uint256 proposalId, ProposalStatus status);
    error VotingEnded(uint256 proposalId, uint256 endTime);
    error AlreadyVoted(uint256 proposalId, address voter);
    error UnauthorizedStakeholder(address stakeholder, StakeholderType required);
    error InvalidProposalData(string reason);
    error InsufficientTreasuryFunds(string currency, uint256 requested, uint256 available);
    error EmergencyResponseNotAuthorized(address responder);

    constructor(
        address _peaceToken,
        uint256 _minimumVotingPower,
        uint256 _proposalThreshold,
        uint256 _quorumPercentage
    ) {
        peaceToken = PeaceCoin(_peaceToken);
        minimumVotingPower = _minimumVotingPower;
        proposalThreshold = _proposalThreshold;
        quorumPercentage = _quorumPercentage;
        votingDuration = 7 days;
        emergencyVotingDuration = 24 hours;
        executionDelay = 2 days;

        // Initialize stakeholder voting weights
        stakeholderWeights[StakeholderType.COMMUNITY_MEMBER] = 100;
        stakeholderWeights[StakeholderType.SPECIES_GUARDIAN] = 150;
        stakeholderWeights[StakeholderType.VERIFIED_CONSERVATIONIST] = 200;
        stakeholderWeights[StakeholderType.SCIENTIFIC_EXPERT] = 300;
        stakeholderWeights[StakeholderType.INDIGENOUS_REPRESENTATIVE] = 250;
        stakeholderWeights[StakeholderType.FAITH_LEADER] = 180;
        stakeholderWeights[StakeholderType.GOVERNMENT_LIAISON] = 220;
        stakeholderWeights[StakeholderType.TECHNOLOGY_CONTRIBUTOR] = 160;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PROPOSAL_CREATOR_ROLE, msg.sender);
        _grantRole(EMERGENCY_RESPONDER_ROLE, msg.sender);
        _grantRole(TREASURY_MANAGER_ROLE, msg.sender);
    }

    /**
     * @dev Create a new conservation proposal
     */
    function createProposal(
        string memory title,
        string memory description,
        ProposalType proposalType,
        UrgencyLevel urgency,
        string[] memory targetSpecies,
        string[] memory targetHabitats,
        string[] memory affectedCountries,
        uint256 fundingRequested,
        string memory currency,
        address payable fundingRecipient,
        string memory implementationPlan,
        string[] memory faithTraditions
    ) external returns (uint256) {
        // Validate proposal creator has sufficient voting power
        uint256 creatorVotingPower = peaceToken.getTotalVotingPower(msg.sender);
        if (creatorVotingPower < proposalThreshold) {
            revert InsufficientVotingPower(proposalThreshold, creatorVotingPower);
        }

        // Validate proposal data
        if (bytes(title).length == 0 || bytes(description).length == 0) {
            revert InvalidProposalData("Title and description required");
        }

        uint256 proposalId = proposalCount++;
        
        // Determine voting duration based on urgency
        uint256 votingStart = block.timestamp;
        uint256 votingEnd = urgency == UrgencyLevel.EMERGENCY ? 
            votingStart + emergencyVotingDuration : 
            votingStart + votingDuration;

        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.title = title;
        proposal.description = description;
        proposal.proposalType = proposalType;
        proposal.urgency = urgency;
        proposal.targetSpecies = targetSpecies;
        proposal.targetHabitats = targetHabitats;
        proposal.affectedCountries = affectedCountries;
        proposal.fundingRequested = fundingRequested;
        proposal.currency = currency;
        proposal.fundingRecipient = fundingRecipient;
        proposal.proposer = msg.sender;
        proposal.proposerType = stakeholderProfiles[msg.sender].stakeholderType;
        proposal.creationTime = block.timestamp;
        proposal.votingStart = votingStart;
        proposal.votingEnd = votingEnd;
        proposal.executionDeadline = votingEnd + executionDelay;
        proposal.implementationPlan = implementationPlan;
        proposal.faithTraditions = faithTraditions;
        proposal.status = ProposalStatus.ACTIVE;
        proposal.emergencyFastTrack = (urgency == UrgencyLevel.EMERGENCY);

        // Update user proposal tracking
        userProposals[msg.sender].push(proposalId);
        stakeholderProfiles[msg.sender].participationCount++;

        emit ProposalCreated(
            proposalId,
            msg.sender,
            proposalType,
            title,
            fundingRequested
        );

        return proposalId;
    }

    /**
     * @dev Cast a vote on a proposal
     */
    function vote(
        uint256 proposalId,
        VoteChoice choice,
        string memory rationale,
        bool makePublic
    ) external nonReentrant {
        Proposal storage proposal = proposals[proposalId];
        
        // Validate proposal is active and voting is open
        if (proposal.status != ProposalStatus.ACTIVE) {
            revert ProposalNotActive(proposalId, proposal.status);
        }
        
        if (block.timestamp > proposal.votingEnd) {
            revert VotingEnded(proposalId, proposal.votingEnd);
        }

        // Check if already voted
        if (proposalVotes[proposalId][msg.sender].voter != address(0)) {
            revert AlreadyVoted(proposalId, msg.sender);
        }

        // Calculate voting power
        uint256 baseVotingPower = peaceToken.getTotalVotingPower(msg.sender);
        if (baseVotingPower < minimumVotingPower) {
            revert InsufficientVotingPower(minimumVotingPower, baseVotingPower);
        }

        StakeholderType voterType = stakeholderProfiles[msg.sender].stakeholderType;
        uint256 stakeholderWeight = stakeholderWeights[voterType];
        uint256 finalVotingPower = baseVotingPower.mul(stakeholderWeight).div(100);

        // Apply urgency multiplier for emergency proposals
        if (proposal.urgency == UrgencyLevel.EMERGENCY) {
            finalVotingPower = finalVotingPower.mul(150).div(100); // 1.5x for emergencies
        }

        // Record the vote
        proposalVotes[proposalId][msg.sender] = Vote({
            voter: msg.sender,
            choice: choice,
            votingPower: finalVotingPower,
            voterType: voterType,
            timestamp: block.timestamp,
            rationale: rationale,
            isPublic: makePublic
        });

        proposalVoters[proposalId].push(msg.sender);
        userVotes[msg.sender].push(proposalId);

        // Update proposal vote tallies
        proposal.totalVotingPower = proposal.totalVotingPower.add(finalVotingPower);
        proposal.participantCount++;

        if (choice == VoteChoice.FOR) {
            proposal.votesFor = proposal.votesFor.add(finalVotingPower);
        } else if (choice == VoteChoice.AGAINST) {
            proposal.votesAgainst = proposal.votesAgainst.add(finalVotingPower);
        } else {
            proposal.abstainVotes = proposal.abstainVotes.add(finalVotingPower);
        }

        // Update stakeholder participation
        stakeholderProfiles[msg.sender].participationCount++;

        emit VoteCast(proposalId, msg.sender, choice, finalVotingPower, voterType);

        // Check if proposal can be auto-executed for emergencies
        if (proposal.emergencyFastTrack && _checkQuorumReached(proposalId)) {
            _executeProposal(proposalId);
        }
    }

    /**
     * @dev Execute a proposal that has passed
     */
    function executeProposal(uint256 proposalId) external nonReentrant {
        _executeProposal(proposalId);
    }

    /**
     * @dev Add scientific endorsement to a proposal
     */
    function addScientificEndorsement(
        uint256 proposalId,
        uint256 evidenceScore,
        string memory supportingEvidence
    ) external onlyRole(SCIENTIFIC_ADVISOR_ROLE) {
        require(evidenceScore <= 100, "Evidence score must be 0-100");
        
        Proposal storage proposal = proposals[proposalId];
        proposal.scientificEndorsers.push(msg.sender);
        
        // Update evidence quality score (weighted average)
        uint256 currentScore = proposal.evidenceQualityScore;
        uint256 endorserCount = proposal.scientificEndorsers.length;
        proposal.evidenceQualityScore = (currentScore.mul(endorserCount - 1).add(evidenceScore)).div(endorserCount);

        emit ScientificEndorsement(proposalId, msg.sender, evidenceScore);
    }

    /**
     * @dev Add faith leader endorsement to a proposal
     */
    function addFaithLeaderEndorsement(
        uint256 proposalId,
        string memory tradition,
        string memory spiritualSignificance
    ) external onlyRole(FAITH_LEADER_ROLE) {
        Proposal storage proposal = proposals[proposalId];
        proposal.faithLeaderEndorsers.push(msg.sender);
        
        if (bytes(proposal.spiritualSignificance).length == 0) {
            proposal.spiritualSignificance = spiritualSignificance;
        }

        emit FaithLeaderEndorsement(proposalId, msg.sender, tradition);
    }

    /**
     * @dev Create emergency response for conservation crisis
     */
    function createEmergencyResponse(
        string memory title,
        string memory description,
        string[] memory affectedSpecies,
        string[] memory affectedHabitats,
        uint256 responseDeadline,
        uint256 fundingNeeded
    ) external onlyRole(EMERGENCY_RESPONDER_ROLE) returns (uint256) {
        uint256 emergencyId = emergencyResponseCount++;
        
        EmergencyResponse storage emergency = emergencyResponses[emergencyId];
        emergency.id = emergencyId;
        emergency.title = title;
        emergency.description = description;
        emergency.urgency = UrgencyLevel.EMERGENCY;
        emergency.affectedSpecies = affectedSpecies;
        emergency.affectedHabitats = affectedHabitats;
        emergency.responseDeadline = responseDeadline;
        emergency.fundingAllocated = fundingNeeded;
        emergency.creationTime = block.timestamp;
        emergency.resolved = false;

        // Track emergencies by species and habitat
        for (uint i = 0; i < affectedSpecies.length; i++) {
            speciesEmergencies[affectedSpecies[i]].push(emergencyId);
        }
        for (uint i = 0; i < affectedHabitats.length; i++) {
            habitatEmergencies[affectedHabitats[i]].push(emergencyId);
        }

        emit EmergencyResponseActivated(emergencyId, title, UrgencyLevel.EMERGENCY, fundingNeeded);
        
        return emergencyId;
    }

    /**
     * @dev Verify stakeholder profile and assign type
     */
    function verifyStakeholder(
        address stakeholder,
        StakeholderType stakeholderType,
        string[] memory expertise,
        string[] memory affectedRegions
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        StakeholderProfile storage profile = stakeholderProfiles[stakeholder];
        profile.stakeholderType = stakeholderType;
        profile.expertise = expertise;
        profile.affectedRegions = affectedRegions;
        profile.isVerified = true;
        profile.reputationScore = 100; // Starting reputation

        emit StakeholderVerified(stakeholder, stakeholderType, msg.sender);
    }

    /**
     * @dev Allocate treasury funds for approved proposal
     */
    function allocateTreasuryFunds(
        uint256 proposalId,
        uint256 amount,
        string memory currency
    ) external onlyRole(TREASURY_MANAGER_ROLE) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.status == ProposalStatus.PASSED, "Proposal must be passed");
        
        if (treasuryBalances[currency] < amount) {
            revert InsufficientTreasuryFunds(currency, amount, treasuryBalances[currency]);
        }

        treasuryBalances[currency] = treasuryBalances[currency].sub(amount);
        totalTreasuryAllocated = totalTreasuryAllocated.add(amount);

        TreasuryAllocation memory allocation = TreasuryAllocation({
            purpose: proposal.title,
            amount: amount,
            recipient: proposal.fundingRecipient,
            releaseDate: block.timestamp + executionDelay,
            released: false,
            proposalId: proposalId
        });

        treasuryAllocations.push(allocation);

        emit TreasuryFundsAllocated(proposalId, proposal.fundingRecipient, amount, proposal.title);
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) external view returns (
        string memory title,
        string memory description,
        ProposalType proposalType,
        ProposalStatus status,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 totalVotingPower,
        address proposer,
        uint256 votingEnd
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.proposalType,
            proposal.status,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.totalVotingPower,
            proposal.proposer,
            proposal.votingEnd
        );
    }

    /**
     * @dev Get voting results for a proposal
     */
    function getVotingResults(uint256 proposalId) external view returns (
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 abstainVotes,
        uint256 totalVotingPower,
        uint256 participantCount,
        bool quorumReached,
        bool passed
    ) {
        Proposal storage proposal = proposals[proposalId];
        bool quorumMet = _checkQuorumReached(proposalId);
        bool proposalPassed = quorumMet && (proposal.votesFor > proposal.votesAgainst);
        
        return (
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.abstainVotes,
            proposal.totalVotingPower,
            proposal.participantCount,
            quorumMet,
            proposalPassed
        );
    }

    /**
     * @dev Get user's voting history
     */
    function getUserVotingHistory(address user) external view returns (uint256[] memory) {
        return userVotes[user];
    }

    /**
     * @dev Get proposals by type
     */
    function getProposalsByType(ProposalType proposalType) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](proposalCount);
        uint256 count = 0;
        
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].proposalType == proposalType) {
                result[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory finalResult = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }

    /**
     * @dev Get active emergencies for a species
     */
    function getSpeciesEmergencies(string memory species) external view returns (uint256[] memory) {
        return speciesEmergencies[species];
    }

    // Internal functions

    function _executeProposal(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];
        
        require(proposal.status == ProposalStatus.ACTIVE, "Proposal not active");
        require(block.timestamp > proposal.votingEnd, "Voting still active");
        
        bool quorumReached = _checkQuorumReached(proposalId);
        bool passed = quorumReached && (proposal.votesFor > proposal.votesAgainst);
        
        if (passed) {
            proposal.status = ProposalStatus.PASSED;
            stakeholderProfiles[proposal.proposer].successfulProposals++;
            
            // Auto-allocate funds if treasury has sufficient balance
            if (proposal.fundingRequested > 0 && 
                treasuryBalances[proposal.currency] >= proposal.fundingRequested) {
                allocateTreasuryFunds(proposalId, proposal.fundingRequested, proposal.currency);
            }
        } else {
            proposal.status = ProposalStatus.REJECTED;
        }
        
        proposal.executionDate = block.timestamp;
        
        emit ProposalExecuted(proposalId, passed, "");
    }

    function _checkQuorumReached(uint256 proposalId) internal view returns (bool) {
        Proposal storage proposal = proposals[proposalId];
        uint256 totalSupply = peaceToken.totalSupply();
        uint256 requiredQuorum = totalSupply.mul(quorumPercentage).div(100);
        
        return proposal.totalVotingPower >= requiredQuorum;
    }

    // Admin functions for governance parameter updates

    function updateVotingParameters(
        uint256 _minimumVotingPower,
        uint256 _proposalThreshold,
        uint256 _quorumPercentage,
        uint256 _votingDuration
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minimumVotingPower = _minimumVotingPower;
        proposalThreshold = _proposalThreshold;
        quorumPercentage = _quorumPercentage;
        votingDuration = _votingDuration;
    }

    function updateStakeholderWeight(
        StakeholderType stakeholderType,
        uint256 weight
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        stakeholderWeights[stakeholderType] = weight;
    }

    function depositToTreasury(
        string memory currency,
        uint256 amount
    ) external onlyRole(TREASURY_MANAGER_ROLE) {
        treasuryBalances[currency] = treasuryBalances[currency].add(amount);
    }
}
