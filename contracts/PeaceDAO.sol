// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./PeaceCoin.sol";

/**
 * @title PeaceDAO
 * @dev Decentralized Autonomous Organization for peace governance
 * Features:
 * - Proposal creation and voting
 * - Timelock execution for security
 * - Quorum-based decision making
 * - Role-based access control
 * - Peace-specific governance functions
 */
contract PeaceDAO is 
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl,
    AccessControl
{
    bytes32 public constant PEACE_COUNCIL_ROLE = keccak256("PEACE_COUNCIL_ROLE");
    bytes32 public constant MEDIATOR_ROLE = keccak256("MEDIATOR_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    PeaceCoin public immutable peaceCoin;

    // Peace-specific proposal types
    enum ProposalType {
        GENERAL,
        PEACE_ACTION_REWARD,
        VIOLATION_PENALTY,
        EMERGENCY_RESPONSE,
        MEDIATOR_APPOINTMENT,
        RESOURCE_ALLOCATION,
        TREATY_RATIFICATION
    }

    struct PeaceProposal {
        ProposalType proposalType;
        string category;
        string conflictRegion;
        address[] stakeholders;
        uint256 urgencyLevel; // 1-5 scale
        bool isEmergency;
    }

    mapping(uint256 => PeaceProposal) public peaceProposals;
    mapping(address => bool) public verifiedMediators;
    mapping(string => uint256) public regionConflictCount;

    // Voting power multipliers based on reputation and role
    mapping(address => uint256) public reputationMultiplier;

    uint256 public constant MIN_PROPOSAL_THRESHOLD = 1000 * 10**18; // 1,000 PC minimum
    uint256 public constant EMERGENCY_PROPOSAL_THRESHOLD = 10000 * 10**18; // 10,000 PC for emergency
    uint256 public constant MEDIATOR_APPOINTMENT_THRESHOLD = 5000 * 10**18; // 5,000 PC for mediator

    event PeaceProposalCreated(uint256 indexed proposalId, ProposalType proposalType, string category);
    event EmergencyProposalActivated(uint256 indexed proposalId, string reason);
    event MediatorAppointed(address indexed mediator, string specialization);
    event MediatorRemoved(address indexed mediator, string reason);
    event ConflictEscalated(string region, uint256 newLevel);

    constructor(
        IVotes _token,
        TimelockController _timelock,
        PeaceCoin _peaceCoin,
        address admin
    )
        Governor("PeaceDAO")
        GovernorSettings(7200, 50400, MIN_PROPOSAL_THRESHOLD) // 1 day voting delay, 1 week voting period
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {
        peaceCoin = _peaceCoin;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(PEACE_COUNCIL_ROLE, admin);
        _grantRole(EMERGENCY_ROLE, admin);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        ProposalType proposalType,
        string memory category,
        string memory conflictRegion,
        address[] memory stakeholders,
        uint256 urgencyLevel
    ) public returns (uint256) {
        require(urgencyLevel >= 1 && urgencyLevel <= 5, "Invalid urgency level");
        
        // Check proposal threshold based on type
        uint256 requiredThreshold = _getRequiredThreshold(proposalType);
        require(
            getVotes(msg.sender, block.number - 1) >= requiredThreshold,
            "Insufficient voting power for proposal type"
        );

        uint256 proposalId = super.propose(targets, values, calldatas, description);
        
        bool isEmergency = urgencyLevel >= 4 || proposalType == ProposalType.EMERGENCY_RESPONSE;
        
        peaceProposals[proposalId] = PeaceProposal({
            proposalType: proposalType,
            category: category,
            conflictRegion: conflictRegion,
            stakeholders: stakeholders,
            urgencyLevel: urgencyLevel,
            isEmergency: isEmergency
        });

        emit PeaceProposalCreated(proposalId, proposalType, category);
        
        if (isEmergency) {
            emit EmergencyProposalActivated(proposalId, "High urgency or emergency response");
        }

        return proposalId;
    }

    function proposeEmergencyResponse(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        string memory conflictRegion,
        string memory emergencyReason
    ) public onlyRole(EMERGENCY_ROLE) returns (uint256) {
        address[] memory emptyStakeholders;
        
        uint256 proposalId = propose(
            targets,
            values,
            calldatas,
            description,
            ProposalType.EMERGENCY_RESPONSE,
            "Emergency",
            conflictRegion,
            emptyStakeholders,
            5 // Maximum urgency
        );

        // Emergency proposals have expedited timeline
        // Override voting delay for emergency (requires admin role)
        
        return proposalId;
    }

    function appointMediator(
        address mediator,
        string memory specialization,
        string memory region
    ) public returns (uint256) {
        require(!verifiedMediators[mediator], "Already a verified mediator");
        
        address[] memory targets = new address[](1);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        
        targets[0] = address(this);
        values[0] = 0;
        calldatas[0] = abi.encodeWithSelector(
            this._appointMediator.selector,
            mediator,
            specialization
        );

        string memory description = string(abi.encodePacked(
            "Appoint mediator for ", specialization, " in ", region
        ));

        address[] memory stakeholders = new address[](1);
        stakeholders[0] = mediator;

        return propose(
            targets,
            values,
            calldatas,
            description,
            ProposalType.MEDIATOR_APPOINTMENT,
            specialization,
            region,
            stakeholders,
            2 // Medium urgency
        );
    }

    function _appointMediator(address mediator, string memory specialization) public {
        require(msg.sender == address(this), "Can only be called through governance");
        
        verifiedMediators[mediator] = true;
        _grantRole(MEDIATOR_ROLE, mediator);
        
        // Grant mediator bonus reputation
        reputationMultiplier[mediator] = 150; // 1.5x voting power
        
        emit MediatorAppointed(mediator, specialization);
    }

    function removeMediator(address mediator, string memory reason) public onlyRole(PEACE_COUNCIL_ROLE) {
        require(verifiedMediators[mediator], "Not a verified mediator");
        
        verifiedMediators[mediator] = false;
        _revokeRole(MEDIATOR_ROLE, mediator);
        reputationMultiplier[mediator] = 100; // Reset to normal voting power
        
        emit MediatorRemoved(mediator, reason);
    }

    function escalateConflict(string memory region, uint256 level) public onlyRole(PEACE_COUNCIL_ROLE) {
        require(level >= 1 && level <= 5, "Invalid escalation level");
        
        regionConflictCount[region] = level;
        emit ConflictEscalated(region, level);
        
        // Auto-create emergency proposal if level is critical
        if (level >= 4) {
            address[] memory targets = new address[](1);
            uint256[] memory values = new uint256[](1);
            bytes[] memory calldatas = new bytes[](1);
            
            targets[0] = address(peaceCoin);
            values[0] = 0;
            calldatas[0] = abi.encodeWithSelector(
                peaceCoin.setActionReward.selector,
                "EMERGENCY_MEDIATION",
                50000 * 10**18 // 50,000 PC emergency reward
            );

            string memory description = string(abi.encodePacked(
                "Emergency mediation reward increase for conflict in ", region
            ));

            proposeEmergencyResponse(
                targets,
                values,
                calldatas,
                description,
                region,
                "Critical conflict escalation"
            );
        }
    }

    function getVotingPower(address account) public view returns (uint256) {
        uint256 baseVotes = getVotes(account, block.number - 1);
        uint256 multiplier = reputationMultiplier[account];
        
        if (multiplier == 0) {
            multiplier = 100; // Default 1.0x multiplier
        }
        
        return (baseVotes * multiplier) / 100;
    }

    function _getRequiredThreshold(ProposalType proposalType) internal pure returns (uint256) {
        if (proposalType == ProposalType.EMERGENCY_RESPONSE) {
            return EMERGENCY_PROPOSAL_THRESHOLD;
        } else if (proposalType == ProposalType.MEDIATOR_APPOINTMENT) {
            return MEDIATOR_APPOINTMENT_THRESHOLD;
        } else {
            return MIN_PROPOSAL_THRESHOLD;
        }
    }

    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
