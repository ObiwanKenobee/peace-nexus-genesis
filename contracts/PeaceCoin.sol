// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title PeaceCoin
 * @dev ERC20 token for incentivizing peaceful actions and cooperation
 * Features:
 * - Minting for verified peace actions
 * - Burning for aggressive/harmful actions
 * - Role-based access control
 * - Pausable for emergency situations
 * - Permit functionality for gasless transactions
 */
contract PeaceCoin is ERC20, ERC20Burnable, AccessControl, Pausable, ERC20Permit {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant PEACE_VERIFIER_ROLE = keccak256("PEACE_VERIFIER_ROLE");
    
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    
    // Peace action tracking
    struct PeaceAction {
        address actor;
        string actionType;
        string description;
        uint256 reward;
        uint256 timestamp;
        bool verified;
        address verifier;
    }
    
    // Violation tracking
    struct Violation {
        address violator;
        string violationType;
        string description;
        uint256 penalty;
        uint256 timestamp;
        bool verified;
        address verifier;
    }
    
    mapping(uint256 => PeaceAction) public peaceActions;
    mapping(uint256 => Violation) public violations;
    mapping(address => uint256[]) public userPeaceActions;
    mapping(address => uint256[]) public userViolations;
    mapping(address => uint256) public reputationScores;
    
    uint256 public nextActionId = 1;
    uint256 public nextViolationId = 1;
    
    // Peace action rewards (in wei)
    mapping(string => uint256) public actionRewards;
    
    // Violation penalties (in wei) 
    mapping(string => uint256) public violationPenalties;
    
    event PeaceActionSubmitted(uint256 indexed actionId, address indexed actor, string actionType, uint256 reward);
    event PeaceActionVerified(uint256 indexed actionId, address indexed verifier);
    event ViolationSubmitted(uint256 indexed violationId, address indexed violator, string violationType, uint256 penalty);
    event ViolationVerified(uint256 indexed violationId, address indexed verifier);
    event ReputationUpdated(address indexed user, uint256 newScore);
    event ActionRewardUpdated(string actionType, uint256 newReward);
    event ViolationPenaltyUpdated(string violationType, uint256 newPenalty);

    constructor(address admin) ERC20("PeaceCoin", "PC") ERC20Permit("PeaceCoin") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(BURNER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
        _grantRole(PEACE_VERIFIER_ROLE, admin);
        
        // Initialize default action rewards (in PC tokens with 18 decimals)
        actionRewards["DISARMAMENT"] = 5000 * 10**18;      // 5,000 PC per warhead
        actionRewards["PEACE_TREATY"] = 10000 * 10**18;    // 10,000 PC per treaty
        actionRewards["MEDIATION"] = 2500 * 10**18;        // 2,500 PC per mediation
        actionRewards["RESOURCE_SHARING"] = 3000 * 10**18; // 3,000 PC per sharing agreement
        actionRewards["EDUCATION"] = 500 * 10**18;         // 500 PC per education session
        actionRewards["HUMANITARIAN_AID"] = 1000 * 10**18; // 1,000 PC per aid action
        
        // Initialize default violation penalties
        violationPenalties["MILITARY_AGGRESSION"] = 10000 * 10**18;   // -10,000 PC
        violationPenalties["TREATY_VIOLATION"] = 15000 * 10**18;      // -15,000 PC
        violationPenalties["MISINFORMATION"] = 2500 * 10**18;         // -2,500 PC
        violationPenalties["RESOURCE_HOARDING"] = 5000 * 10**18;      // -5,000 PC
        violationPenalties["HUMAN_RIGHTS_VIOLATION"] = 20000 * 10**18; // -20,000 PC
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    function submitPeaceAction(
        address actor,
        string memory actionType,
        string memory description
    ) public onlyRole(PEACE_VERIFIER_ROLE) returns (uint256) {
        require(actionRewards[actionType] > 0, "Unknown action type");
        
        uint256 actionId = nextActionId++;
        uint256 reward = actionRewards[actionType];
        
        peaceActions[actionId] = PeaceAction({
            actor: actor,
            actionType: actionType,
            description: description,
            reward: reward,
            timestamp: block.timestamp,
            verified: false,
            verifier: address(0)
        });
        
        userPeaceActions[actor].push(actionId);
        
        emit PeaceActionSubmitted(actionId, actor, actionType, reward);
        return actionId;
    }

    function verifyPeaceAction(uint256 actionId) public onlyRole(PEACE_VERIFIER_ROLE) {
        require(actionId < nextActionId, "Invalid action ID");
        PeaceAction storage action = peaceActions[actionId];
        require(!action.verified, "Action already verified");
        require(action.verifier == address(0), "Action already has verifier");
        
        action.verified = true;
        action.verifier = msg.sender;
        
        // Mint reward tokens
        if (totalSupply() + action.reward <= MAX_SUPPLY) {
            _mint(action.actor, action.reward);
        }
        
        // Update reputation score
        reputationScores[action.actor] += _calculateReputationGain(action.actionType);
        
        emit PeaceActionVerified(actionId, msg.sender);
        emit ReputationUpdated(action.actor, reputationScores[action.actor]);
    }

    function submitViolation(
        address violator,
        string memory violationType,
        string memory description
    ) public onlyRole(PEACE_VERIFIER_ROLE) returns (uint256) {
        require(violationPenalties[violationType] > 0, "Unknown violation type");
        
        uint256 violationId = nextViolationId++;
        uint256 penalty = violationPenalties[violationType];
        
        violations[violationId] = Violation({
            violator: violator,
            violationType: violationType,
            description: description,
            penalty: penalty,
            timestamp: block.timestamp,
            verified: false,
            verifier: address(0)
        });
        
        userViolations[violator].push(violationId);
        
        emit ViolationSubmitted(violationId, violator, violationType, penalty);
        return violationId;
    }

    function verifyViolation(uint256 violationId) public onlyRole(PEACE_VERIFIER_ROLE) {
        require(violationId < nextViolationId, "Invalid violation ID");
        Violation storage violation = violations[violationId];
        require(!violation.verified, "Violation already verified");
        require(violation.verifier == address(0), "Violation already has verifier");
        
        violation.verified = true;
        violation.verifier = msg.sender;
        
        // Burn penalty tokens from violator
        uint256 balance = balanceOf(violation.violator);
        uint256 burnAmount = violation.penalty > balance ? balance : violation.penalty;
        
        if (burnAmount > 0) {
            _burn(violation.violator, burnAmount);
        }
        
        // Decrease reputation score
        uint256 reputationLoss = _calculateReputationLoss(violation.violationType);
        if (reputationScores[violation.violator] > reputationLoss) {
            reputationScores[violation.violator] -= reputationLoss;
        } else {
            reputationScores[violation.violator] = 0;
        }
        
        emit ViolationVerified(violationId, msg.sender);
        emit ReputationUpdated(violation.violator, reputationScores[violation.violator]);
    }

    function setActionReward(string memory actionType, uint256 reward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        actionRewards[actionType] = reward;
        emit ActionRewardUpdated(actionType, reward);
    }

    function setViolationPenalty(string memory violationType, uint256 penalty) public onlyRole(DEFAULT_ADMIN_ROLE) {
        violationPenalties[violationType] = penalty;
        emit ViolationPenaltyUpdated(violationType, penalty);
    }

    function getUserPeaceActions(address user) public view returns (uint256[] memory) {
        return userPeaceActions[user];
    }

    function getUserViolations(address user) public view returns (uint256[] memory) {
        return userViolations[user];
    }

    function getUserStats(address user) public view returns (
        uint256 peaceActionCount,
        uint256 violationCount,
        uint256 reputation,
        uint256 balance
    ) {
        return (
            userPeaceActions[user].length,
            userViolations[user].length,
            reputationScores[user],
            balanceOf(user)
        );
    }

    function _calculateReputationGain(string memory actionType) internal pure returns (uint256) {
        bytes32 actionHash = keccak256(abi.encodePacked(actionType));
        
        if (actionHash == keccak256(abi.encodePacked("DISARMAMENT"))) return 50;
        if (actionHash == keccak256(abi.encodePacked("PEACE_TREATY"))) return 100;
        if (actionHash == keccak256(abi.encodePacked("MEDIATION"))) return 25;
        if (actionHash == keccak256(abi.encodePacked("RESOURCE_SHARING"))) return 30;
        if (actionHash == keccak256(abi.encodePacked("EDUCATION"))) return 10;
        if (actionHash == keccak256(abi.encodePacked("HUMANITARIAN_AID"))) return 20;
        
        return 5; // Default reputation gain
    }

    function _calculateReputationLoss(string memory violationType) internal pure returns (uint256) {
        bytes32 violationHash = keccak256(abi.encodePacked(violationType));
        
        if (violationHash == keccak256(abi.encodePacked("MILITARY_AGGRESSION"))) return 100;
        if (violationHash == keccak256(abi.encodePacked("TREATY_VIOLATION"))) return 150;
        if (violationHash == keccak256(abi.encodePacked("MISINFORMATION"))) return 25;
        if (violationHash == keccak256(abi.encodePacked("RESOURCE_HOARDING"))) return 50;
        if (violationHash == keccak256(abi.encodePacked("HUMAN_RIGHTS_VIOLATION"))) return 200;
        
        return 10; // Default reputation loss
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
