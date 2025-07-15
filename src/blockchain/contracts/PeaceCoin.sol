// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title PeaceCoin
 * @dev The official token for PAXIS Wildlife Peace platform
 * 
 * Features:
 * - ERC20 compliant token for global interoperability
 * - Conservation activity rewards system
 * - Faith-based spiritual milestone rewards
 * - DAO governance voting rights
 * - Habitat protection staking mechanism
 * - Species guardian certification
 * - Cross-chain bridge compatibility
 * - Environmentally conscious (Proof of Stake)
 */
contract PeaceCoin is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ReentrancyGuard {
    using SafeMath for uint256;
    using ECDSA for bytes32;

    // Role definitions
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");
    bytes32 public constant DAO_EXECUTOR_ROLE = keccak256("DAO_EXECUTOR_ROLE");
    bytes32 public constant CONSERVATION_VALIDATOR_ROLE = keccak256("CONSERVATION_VALIDATOR_ROLE");

    // Token economics
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant INITIAL_MINT = 100_000_000 * 10**18; // 100 million for initial distribution
    
    // Conservation reward pools
    uint256 public constant PRAYER_REWARD_POOL = 200_000_000 * 10**18; // 200 million for spiritual activities
    uint256 public constant CONSERVATION_ACTION_POOL = 300_000_000 * 10**18; // 300 million for conservation
    uint256 public constant COMMUNITY_BUILDING_POOL = 150_000_000 * 10**18; // 150 million for community
    uint256 public constant DAO_TREASURY_POOL = 200_000_000 * 10**18; // 200 million for DAO governance
    uint256 public constant EMERGENCY_RESPONSE_POOL = 50_000_000 * 10**18; // 50 million for emergencies

    // Tracking reward pool usage
    uint256 public prayerRewardsMinted;
    uint256 public conservationRewardsMinted;
    uint256 public communityRewardsMinted;
    uint256 public daoTreasuryMinted;
    uint256 public emergencyResponseMinted;

    // Activity types for reward calculation
    enum ActivityType {
        PRAYER_COMPLETION,
        MEDITATION_SESSION,
        SPECIES_ADOPTION,
        HABITAT_PROTECTION,
        CONSERVATION_PROJECT_SUPPORT,
        COMMUNITY_FORUM_CONTRIBUTION,
        DAO_PARTICIPATION,
        EMERGENCY_RESPONSE,
        EDUCATIONAL_CONTENT,
        FAITH_INTEGRATION_EVENT,
        WILDLIFE_MONITORING,
        RESEARCH_CONTRIBUTION
    }

    // Faith traditions for spiritual multipliers
    enum FaithTradition {
        UNIVERSAL,
        CHRISTIANITY,
        ISLAM,
        JUDAISM,
        BUDDHISM,
        HINDUISM,
        INDIGENOUS,
        INTERFAITH
    }

    // Conservation impact levels
    enum ConservationImpact {
        LOW,      // 1x multiplier
        MEDIUM,   // 1.5x multiplier
        HIGH,     // 2x multiplier
        CRITICAL, // 3x multiplier
        EMERGENCY // 5x multiplier
    }

    // Spiritual engagement levels
    enum SpiritualLevel {
        SEEKER,     // 1x multiplier
        GUARDIAN,   // 1.5x multiplier
        PROTECTOR,  // 2x multiplier
        CHAMPION,   // 2.5x multiplier
        SAINT       // 3x multiplier
    }

    // Structures for tracking user engagement
    struct UserProfile {
        uint256 totalPrayersCompleted;
        uint256 totalMeditationMinutes;
        uint256 speciesAdopted;
        uint256 habitatsProtected;
        uint256 conservationProjectsSupported;
        uint256 daoProposalsVoted;
        SpiritualLevel spiritualLevel;
        FaithTradition primaryFaith;
        bool isVerifiedGuardian;
        uint256 lastActivityTimestamp;
        uint256 currentStreak; // Days of consecutive activity
        uint256 longestStreak;
    }

    struct ConservationAction {
        ActivityType activityType;
        uint256 timestamp;
        uint256 rewardAmount;
        ConservationImpact impact;
        string speciesOrHabitat;
        bytes32 verificationHash;
        bool verified;
        address verifiedBy;
    }

    struct SpiritualActivity {
        uint256 timestamp;
        uint256 durationMinutes;
        FaithTradition tradition;
        string content; // Prayer or meditation content ID
        uint256 rewardAmount;
        bool communityShared;
    }

    // Mappings for user data
    mapping(address => UserProfile) public userProfiles;
    mapping(address => ConservationAction[]) public userConservationActions;
    mapping(address => SpiritualActivity[]) public userSpiritualActivities;
    mapping(address => uint256) public lastRewardClaim;
    mapping(bytes32 => bool) public usedVerificationHashes;

    // Staking for habitat protection
    mapping(address => uint256) public habitatStakes;
    mapping(string => uint256) public totalHabitatStakes; // habitat ID => total staked
    mapping(address => mapping(string => uint256)) public userHabitatStakes;

    // DAO governance mappings
    mapping(address => uint256) public votingPower;
    mapping(address => uint256) public delegatedVotingPower;
    mapping(address => address) public votingDelegates;

    // Events
    event ConservationReward(
        address indexed user,
        ActivityType activityType,
        uint256 rewardAmount,
        ConservationImpact impact,
        string indexed speciesOrHabitat
    );

    event SpiritualReward(
        address indexed user,
        uint256 rewardAmount,
        uint256 durationMinutes,
        FaithTradition tradition
    );

    event HabitatStaked(
        address indexed user,
        string indexed habitatId,
        uint256 amount
    );

    event HabitatUnstaked(
        address indexed user,
        string indexed habitatId,
        uint256 amount
    );

    event SpiritualLevelAdvanced(
        address indexed user,
        SpiritualLevel newLevel,
        uint256 bonusReward
    );

    event GuardianVerified(
        address indexed user,
        address indexed verifier,
        uint256 bonusReward
    );

    event EmergencyResponseActivated(
        string indexed emergencyId,
        uint256 responsePool,
        string description
    );

    event VotingPowerDelegated(
        address indexed delegator,
        address indexed delegate,
        uint256 amount
    );

    // Custom errors
    error InsufficientRewardPool(string poolType);
    error InvalidActivityVerification(bytes32 hash);
    error DuplicateVerificationHash(bytes32 hash);
    error InsufficientStake(uint256 required, uint256 available);
    error UnauthorizedVerifier(address verifier);
    error ExceededMaxSupply(uint256 requested, uint256 available);
    error InvalidSpiritualProgression(SpiritualLevel current, SpiritualLevel requested);

    constructor(address _daoExecutor) ERC20("PeaceCoin", "PEACE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(GUARDIAN_ROLE, msg.sender);
        _grantRole(DAO_EXECUTOR_ROLE, _daoExecutor);
        _grantRole(CONSERVATION_VALIDATOR_ROLE, msg.sender);

        // Mint initial supply for platform launch
        _mint(msg.sender, INITIAL_MINT);
    }

    /**
     * @dev Reward user for conservation activity
     * @param user Address of the user to reward
     * @param activityType Type of conservation activity
     * @param impact Environmental impact level
     * @param speciesOrHabitat Identifier for species or habitat involved
     * @param verificationHash Hash for activity verification
     */
    function rewardConservationActivity(
        address user,
        ActivityType activityType,
        ConservationImpact impact,
        string memory speciesOrHabitat,
        bytes32 verificationHash
    ) external onlyRole(CONSERVATION_VALIDATOR_ROLE) nonReentrant {
        if (usedVerificationHashes[verificationHash]) {
            revert DuplicateVerificationHash(verificationHash);
        }

        usedVerificationHashes[verificationHash] = true;

        uint256 baseReward = _calculateBaseReward(activityType);
        uint256 impactMultiplier = _getImpactMultiplier(impact);
        uint256 levelMultiplier = _getSpiritualLevelMultiplier(userProfiles[user].spiritualLevel);
        uint256 streakBonus = _calculateStreakBonus(user);

        uint256 totalReward = baseReward
            .mul(impactMultiplier)
            .mul(levelMultiplier)
            .div(100) // Convert from percentage
            .add(streakBonus);

        // Check reward pool availability
        if (conservationRewardsMinted.add(totalReward) > CONSERVATION_ACTION_POOL) {
            revert InsufficientRewardPool("conservation");
        }

        conservationRewardsMinted = conservationRewardsMinted.add(totalReward);

        // Update user profile
        _updateUserConservationProfile(user, activityType);

        // Record the activity
        userConservationActions[user].push(ConservationAction({
            activityType: activityType,
            timestamp: block.timestamp,
            rewardAmount: totalReward,
            impact: impact,
            speciesOrHabitat: speciesOrHabitat,
            verificationHash: verificationHash,
            verified: true,
            verifiedBy: msg.sender
        }));

        // Mint reward tokens
        if (totalSupply().add(totalReward) <= MAX_SUPPLY) {
            _mint(user, totalReward);
            _updateVotingPower(user);
            _updateUserStreak(user);

            emit ConservationReward(user, activityType, totalReward, impact, speciesOrHabitat);
        } else {
            revert ExceededMaxSupply(totalReward, MAX_SUPPLY.sub(totalSupply()));
        }
    }

    /**
     * @dev Reward user for spiritual activity (prayer, meditation)
     * @param user Address of the user to reward
     * @param durationMinutes Duration of spiritual activity
     * @param tradition Faith tradition of the activity
     * @param contentId Identifier for prayer/meditation content
     */
    function rewardSpiritualActivity(
        address user,
        uint256 durationMinutes,
        FaithTradition tradition,
        string memory contentId
    ) external onlyRole(MINTER_ROLE) nonReentrant {
        uint256 baseReward = _calculateSpiritualReward(durationMinutes);
        uint256 faithMultiplier = _getFaithTraditionMultiplier(tradition);
        uint256 levelMultiplier = _getSpiritualLevelMultiplier(userProfiles[user].spiritualLevel);
        
        uint256 totalReward = baseReward
            .mul(faithMultiplier)
            .mul(levelMultiplier)
            .div(10000); // Convert from basis points

        // Check reward pool availability
        if (prayerRewardsMinted.add(totalReward) > PRAYER_REWARD_POOL) {
            revert InsufficientRewardPool("prayer");
        }

        prayerRewardsMinted = prayerRewardsMinted.add(totalReward);

        // Update user spiritual profile
        _updateUserSpiritualProfile(user, durationMinutes, tradition);

        // Record the activity
        userSpiritualActivities[user].push(SpiritualActivity({
            timestamp: block.timestamp,
            durationMinutes: durationMinutes,
            tradition: tradition,
            content: contentId,
            rewardAmount: totalReward,
            communityShared: false // Can be updated later
        }));

        // Mint reward tokens
        if (totalSupply().add(totalReward) <= MAX_SUPPLY) {
            _mint(user, totalReward);
            _updateVotingPower(user);
            _updateUserStreak(user);

            // Check for spiritual level advancement
            _checkSpiritualLevelAdvancement(user);

            emit SpiritualReward(user, totalReward, durationMinutes, tradition);
        } else {
            revert ExceededMaxSupply(totalReward, MAX_SUPPLY.sub(totalSupply()));
        }
    }

    /**
     * @dev Stake tokens to protect a specific habitat
     * @param habitatId Identifier for the habitat to protect
     * @param amount Amount of tokens to stake
     */
    function stakeForHabitatProtection(
        string memory habitatId,
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "Stake amount must be positive");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);

        habitatStakes[msg.sender] = habitatStakes[msg.sender].add(amount);
        totalHabitatStakes[habitatId] = totalHabitatStakes[habitatId].add(amount);
        userHabitatStakes[msg.sender][habitatId] = userHabitatStakes[msg.sender][habitatId].add(amount);

        // Update user profile
        userProfiles[msg.sender].habitatsProtected += 1;
        _updateVotingPower(msg.sender);

        emit HabitatStaked(msg.sender, habitatId, amount);
    }

    /**
     * @dev Unstake tokens from habitat protection
     * @param habitatId Identifier for the habitat
     * @param amount Amount of tokens to unstake
     */
    function unstakeFromHabitatProtection(
        string memory habitatId,
        uint256 amount
    ) external nonReentrant {
        if (userHabitatStakes[msg.sender][habitatId] < amount) {
            revert InsufficientStake(amount, userHabitatStakes[msg.sender][habitatId]);
        }

        userHabitatStakes[msg.sender][habitatId] = userHabitatStakes[msg.sender][habitatId].sub(amount);
        totalHabitatStakes[habitatId] = totalHabitatStakes[habitatId].sub(amount);
        habitatStakes[msg.sender] = habitatStakes[msg.sender].sub(amount);

        _transfer(address(this), msg.sender, amount);
        _updateVotingPower(msg.sender);

        emit HabitatUnstaked(msg.sender, habitatId, amount);
    }

    /**
     * @dev Verify a user as a species guardian
     * @param user Address of the user to verify
     * @param bonusReward Additional reward for verification
     */
    function verifyGuardian(
        address user,
        uint256 bonusReward
    ) external onlyRole(GUARDIAN_ROLE) nonReentrant {
        require(!userProfiles[user].isVerifiedGuardian, "User already verified");

        userProfiles[user].isVerifiedGuardian = true;

        if (bonusReward > 0 && totalSupply().add(bonusReward) <= MAX_SUPPLY) {
            _mint(user, bonusReward);
            _updateVotingPower(user);
        }

        emit GuardianVerified(user, msg.sender, bonusReward);
    }

    /**
     * @dev Delegate voting power to another address
     * @param delegate Address to delegate voting power to
     */
    function delegateVotingPower(address delegate) external {
        require(delegate != address(0), "Cannot delegate to zero address");
        require(delegate != msg.sender, "Cannot delegate to yourself");

        address previousDelegate = votingDelegates[msg.sender];
        if (previousDelegate != address(0)) {
            delegatedVotingPower[previousDelegate] = delegatedVotingPower[previousDelegate]
                .sub(votingPower[msg.sender]);
        }

        votingDelegates[msg.sender] = delegate;
        delegatedVotingPower[delegate] = delegatedVotingPower[delegate]
            .add(votingPower[msg.sender]);

        emit VotingPowerDelegated(msg.sender, delegate, votingPower[msg.sender]);
    }

    /**
     * @dev Activate emergency response for conservation crisis
     * @param emergencyId Identifier for the emergency
     * @param responseAmount Amount to allocate for response
     * @param description Description of the emergency
     */
    function activateEmergencyResponse(
        string memory emergencyId,
        uint256 responseAmount,
        string memory description
    ) external onlyRole(DAO_EXECUTOR_ROLE) nonReentrant {
        if (emergencyResponseMinted.add(responseAmount) > EMERGENCY_RESPONSE_POOL) {
            revert InsufficientRewardPool("emergency");
        }

        emergencyResponseMinted = emergencyResponseMinted.add(responseAmount);

        // Emergency funds are minted to DAO executor for distribution
        if (totalSupply().add(responseAmount) <= MAX_SUPPLY) {
            _mint(msg.sender, responseAmount);
        }

        emit EmergencyResponseActivated(emergencyId, responseAmount, description);
    }

    /**
     * @dev Get total voting power for an address (including delegated power)
     * @param user Address to check voting power for
     * @return Total voting power
     */
    function getTotalVotingPower(address user) external view returns (uint256) {
        return votingPower[user].add(delegatedVotingPower[user]);
    }

    /**
     * @dev Get user's conservation activity history
     * @param user Address of the user
     * @return Array of conservation actions
     */
    function getUserConservationActions(address user) 
        external 
        view 
        returns (ConservationAction[] memory) 
    {
        return userConservationActions[user];
    }

    /**
     * @dev Get user's spiritual activity history
     * @param user Address of the user
     * @return Array of spiritual activities
     */
    function getUserSpiritualActivities(address user) 
        external 
        view 
        returns (SpiritualActivity[] memory) 
    {
        return userSpiritualActivities[user];
    }

    // Internal helper functions

    function _calculateBaseReward(ActivityType activityType) internal pure returns (uint256) {
        if (activityType == ActivityType.PRAYER_COMPLETION) return 10 * 10**18;
        if (activityType == ActivityType.MEDITATION_SESSION) return 15 * 10**18;
        if (activityType == ActivityType.SPECIES_ADOPTION) return 100 * 10**18;
        if (activityType == ActivityType.HABITAT_PROTECTION) return 200 * 10**18;
        if (activityType == ActivityType.CONSERVATION_PROJECT_SUPPORT) return 150 * 10**18;
        if (activityType == ActivityType.COMMUNITY_FORUM_CONTRIBUTION) return 25 * 10**18;
        if (activityType == ActivityType.DAO_PARTICIPATION) return 50 * 10**18;
        if (activityType == ActivityType.EMERGENCY_RESPONSE) return 300 * 10**18;
        if (activityType == ActivityType.EDUCATIONAL_CONTENT) return 75 * 10**18;
        if (activityType == ActivityType.FAITH_INTEGRATION_EVENT) return 125 * 10**18;
        if (activityType == ActivityType.WILDLIFE_MONITORING) return 80 * 10**18;
        if (activityType == ActivityType.RESEARCH_CONTRIBUTION) return 250 * 10**18;
        return 10 * 10**18; // Default
    }

    function _calculateSpiritualReward(uint256 durationMinutes) internal pure returns (uint256) {
        // Base reward: 1 PEACE per minute of spiritual activity
        uint256 baseReward = durationMinutes * 10**18;
        
        // Bonus for longer sessions
        if (durationMinutes >= 60) return baseReward.mul(150).div(100); // 1.5x for 1+ hour
        if (durationMinutes >= 30) return baseReward.mul(125).div(100); // 1.25x for 30+ minutes
        if (durationMinutes >= 15) return baseReward.mul(110).div(100); // 1.1x for 15+ minutes
        
        return baseReward;
    }

    function _getImpactMultiplier(ConservationImpact impact) internal pure returns (uint256) {
        if (impact == ConservationImpact.LOW) return 100;       // 1x
        if (impact == ConservationImpact.MEDIUM) return 150;    // 1.5x
        if (impact == ConservationImpact.HIGH) return 200;      // 2x
        if (impact == ConservationImpact.CRITICAL) return 300;  // 3x
        if (impact == ConservationImpact.EMERGENCY) return 500; // 5x
        return 100;
    }

    function _getSpiritualLevelMultiplier(SpiritualLevel level) internal pure returns (uint256) {
        if (level == SpiritualLevel.SEEKER) return 100;     // 1x
        if (level == SpiritualLevel.GUARDIAN) return 150;   // 1.5x
        if (level == SpiritualLevel.PROTECTOR) return 200;  // 2x
        if (level == SpiritualLevel.CHAMPION) return 250;   // 2.5x
        if (level == SpiritualLevel.SAINT) return 300;      // 3x
        return 100;
    }

    function _getFaithTraditionMultiplier(FaithTradition tradition) internal pure returns (uint256) {
        if (tradition == FaithTradition.INTERFAITH) return 12000; // 1.2x for interfaith collaboration
        return 10000; // 1x base for all traditions (100%)
    }

    function _calculateStreakBonus(address user) internal view returns (uint256) {
        uint256 streak = userProfiles[user].currentStreak;
        if (streak >= 365) return 50 * 10**18;  // 1 year streak
        if (streak >= 100) return 25 * 10**18;  // 100 day streak
        if (streak >= 30) return 10 * 10**18;   // 30 day streak
        if (streak >= 7) return 5 * 10**18;     // 7 day streak
        return 0;
    }

    function _updateUserConservationProfile(address user, ActivityType activityType) internal {
        UserProfile storage profile = userProfiles[user];
        
        if (activityType == ActivityType.SPECIES_ADOPTION) {
            profile.speciesAdopted += 1;
        } else if (activityType == ActivityType.HABITAT_PROTECTION) {
            profile.habitatsProtected += 1;
        } else if (activityType == ActivityType.CONSERVATION_PROJECT_SUPPORT) {
            profile.conservationProjectsSupported += 1;
        } else if (activityType == ActivityType.DAO_PARTICIPATION) {
            profile.daoProposalsVoted += 1;
        }
        
        profile.lastActivityTimestamp = block.timestamp;
    }

    function _updateUserSpiritualProfile(address user, uint256 durationMinutes, FaithTradition tradition) internal {
        UserProfile storage profile = userProfiles[user];
        
        profile.totalPrayersCompleted += 1;
        profile.totalMeditationMinutes += durationMinutes;
        
        // Update primary faith if not set or if this tradition is used more frequently
        if (profile.primaryFaith == FaithTradition.UNIVERSAL) {
            profile.primaryFaith = tradition;
        }
        
        profile.lastActivityTimestamp = block.timestamp;
    }

    function _updateVotingPower(address user) internal {
        // Voting power = token balance + staked tokens + spiritual multiplier
        uint256 tokenBalance = balanceOf(user);
        uint256 stakedTokens = habitatStakes[user];
        uint256 spiritualMultiplier = _getSpiritualLevelMultiplier(userProfiles[user].spiritualLevel);
        
        votingPower[user] = tokenBalance
            .add(stakedTokens)
            .mul(spiritualMultiplier)
            .div(100);
    }

    function _updateUserStreak(address user) internal {
        UserProfile storage profile = userProfiles[user];
        
        // Calculate days since last activity
        uint256 daysSinceLastActivity = (block.timestamp - profile.lastActivityTimestamp) / 86400;
        
        if (daysSinceLastActivity <= 1) {
            // Continuing streak
            profile.currentStreak += 1;
            if (profile.currentStreak > profile.longestStreak) {
                profile.longestStreak = profile.currentStreak;
            }
        } else {
            // Streak broken
            profile.currentStreak = 1;
        }
    }

    function _checkSpiritualLevelAdvancement(address user) internal {
        UserProfile storage profile = userProfiles[user];
        SpiritualLevel currentLevel = profile.spiritualLevel;
        SpiritualLevel newLevel = currentLevel;
        
        // Advancement criteria based on various activities
        uint256 totalActivity = profile.totalPrayersCompleted 
            + profile.speciesAdopted 
            + profile.habitatsProtected
            + profile.conservationProjectsSupported;
        
        if (totalActivity >= 1000 && profile.totalMeditationMinutes >= 10000 && currentLevel < SpiritualLevel.SAINT) {
            newLevel = SpiritualLevel.SAINT;
        } else if (totalActivity >= 500 && profile.totalMeditationMinutes >= 5000 && currentLevel < SpiritualLevel.CHAMPION) {
            newLevel = SpiritualLevel.CHAMPION;
        } else if (totalActivity >= 200 && profile.totalMeditationMinutes >= 2000 && currentLevel < SpiritualLevel.PROTECTOR) {
            newLevel = SpiritualLevel.PROTECTOR;
        } else if (totalActivity >= 50 && profile.totalMeditationMinutes >= 500 && currentLevel < SpiritualLevel.GUARDIAN) {
            newLevel = SpiritualLevel.GUARDIAN;
        }
        
        if (newLevel != currentLevel) {
            profile.spiritualLevel = newLevel;
            uint256 bonusReward = _calculateLevelAdvancementBonus(newLevel);
            
            if (totalSupply().add(bonusReward) <= MAX_SUPPLY) {
                _mint(user, bonusReward);
                _updateVotingPower(user);
            }
            
            emit SpiritualLevelAdvanced(user, newLevel, bonusReward);
        }
    }

    function _calculateLevelAdvancementBonus(SpiritualLevel level) internal pure returns (uint256) {
        if (level == SpiritualLevel.GUARDIAN) return 500 * 10**18;
        if (level == SpiritualLevel.PROTECTOR) return 1000 * 10**18;
        if (level == SpiritualLevel.CHAMPION) return 2500 * 10**18;
        if (level == SpiritualLevel.SAINT) return 5000 * 10**18;
        return 0;
    }

    // Required overrides
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
        
        // Update voting power for both sender and receiver
        if (from != address(0)) _updateVotingPower(from);
        if (to != address(0)) _updateVotingPower(to);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply().add(amount) <= MAX_SUPPLY, "Exceeds maximum supply");
        _mint(to, amount);
        _updateVotingPower(to);
    }
}
