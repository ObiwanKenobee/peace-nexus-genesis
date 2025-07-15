-- PAXIS Wildlife Peace - Global Database Schema
-- Multi-region, sharded database architecture supporting 194+ countries
-- Designed for high availability, scalability, and data sovereignty compliance

-- =====================================================
-- GLOBAL CONFIGURATION AND SHARDING SETUP
-- =====================================================

-- Database configuration for sharding
CREATE SCHEMA IF NOT EXISTS paxis_config;
CREATE SCHEMA IF NOT EXISTS paxis_global;
CREATE SCHEMA IF NOT EXISTS paxis_shard_001;
CREATE SCHEMA IF NOT EXISTS paxis_shard_002;
CREATE SCHEMA IF NOT EXISTS paxis_shard_003;

-- Shard mapping table (stored in global schema)
CREATE TABLE paxis_global.shard_mapping (
    id SERIAL PRIMARY KEY,
    shard_key VARCHAR(255) NOT NULL,
    shard_id INTEGER NOT NULL,
    shard_name VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    database_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Regional database configuration
CREATE TABLE paxis_global.region_config (
    id SERIAL PRIMARY KEY,
    region_code VARCHAR(10) NOT NULL UNIQUE,
    region_name VARCHAR(100) NOT NULL,
    primary_db_url TEXT NOT NULL,
    replica_db_urls TEXT[],
    data_residency_rules JSONB,
    compliance_requirements JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial region configurations
INSERT INTO paxis_global.region_config (region_code, region_name, primary_db_url, data_residency_rules, compliance_requirements) VALUES
('US', 'United States', 'postgresql://primary-us.paxis.org:5432/paxis', '{"data_location": "US", "cross_border_transfer": false}', '{"gdpr": false, "ccpa": true, "hipaa": false}'),
('EU', 'European Union', 'postgresql://primary-eu.paxis.org:5432/paxis', '{"data_location": "EU", "cross_border_transfer": false}', '{"gdpr": true, "ccpa": false, "data_protection_act": true}'),
('AP', 'Asia Pacific', 'postgresql://primary-ap.paxis.org:5432/paxis', '{"data_location": "Singapore", "cross_border_transfer": true}', '{"pdpa": true, "privacy_act": true}'),
('AF', 'Africa', 'postgresql://primary-af.paxis.org:5432/paxis', '{"data_location": "South Africa", "cross_border_transfer": true}', '{"popia": true, "data_protection": true}'),
('SA', 'South America', 'postgresql://primary-sa.paxis.org:5432/paxis', '{"data_location": "Brazil", "cross_border_transfer": true}', '{"lgpd": true, "data_protection": true}');

-- =====================================================
-- USER MANAGEMENT AND AUTHENTICATION
-- =====================================================

-- Global users table (replicated across regions)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- Profile information
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(150),
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    
    -- Location and preferences
    country_code VARCHAR(3),
    region VARCHAR(100),
    timezone VARCHAR(50),
    language_preference VARCHAR(10) DEFAULT 'en',
    currency_preference VARCHAR(3) DEFAULT 'USD',
    
    -- Faith and spiritual preferences
    faith_traditions TEXT[],
    spiritual_level VARCHAR(20) DEFAULT 'beginner',
    prayer_preferences JSONB,
    meditation_preferences JSONB,
    
    -- Privacy and consent
    privacy_settings JSONB DEFAULT '{}',
    marketing_consent BOOLEAN DEFAULT FALSE,
    data_processing_consent BOOLEAN DEFAULT TRUE,
    terms_accepted_at TIMESTAMPTZ,
    privacy_policy_accepted_at TIMESTAMPTZ,
    
    -- Account status
    account_status VARCHAR(20) DEFAULT 'active',
    subscription_tier VARCHAR(20) DEFAULT 'free',
    is_verified_guardian BOOLEAN DEFAULT FALSE,
    is_moderator BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    
    -- Timestamps and tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    last_active_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    
    -- Data sovereignty
    data_region VARCHAR(10) NOT NULL,
    shard_key VARCHAR(255) NOT NULL
);

-- User sessions for authentication
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    location_info JSONB,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- User conservation statistics
CREATE TABLE user_conservation_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- PeaceCoin statistics
    total_peace_coins_earned BIGINT DEFAULT 0,
    total_peace_coins_spent BIGINT DEFAULT 0,
    current_balance BIGINT DEFAULT 0,
    
    -- Activity statistics
    prayers_completed INTEGER DEFAULT 0,
    meditations_completed INTEGER DEFAULT 0,
    conservation_actions INTEGER DEFAULT 0,
    projects_supported INTEGER DEFAULT 0,
    forums_posts INTEGER DEFAULT 0,
    
    -- Guardian statistics
    species_adopted INTEGER DEFAULT 0,
    habitats_protected INTEGER DEFAULT 0,
    conservation_level VARCHAR(20) DEFAULT 'Seeker',
    impact_score DECIMAL(10,2) DEFAULT 0,
    
    -- Time-based statistics
    total_prayer_minutes INTEGER DEFAULT 0,
    total_meditation_minutes INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    current_streak_days INTEGER DEFAULT 0,
    
    -- Achievements and badges
    badges_earned TEXT[],
    milestones_reached TEXT[],
    
    -- Last updated
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SPECIES DATABASE AND CONSERVATION
-- =====================================================

-- Species master table
CREATE TABLE species (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic information
    common_name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200) NOT NULL,
    spiritual_name VARCHAR(200),
    category VARCHAR(50) NOT NULL, -- mammal, bird, marine, insect, plant, tree
    family VARCHAR(100),
    genus VARCHAR(100),
    species_name VARCHAR(100),
    
    -- Classification and status
    conservation_status VARCHAR(30) NOT NULL,
    population_estimate BIGINT,
    population_trend VARCHAR(20), -- increasing, stable, decreasing, unknown
    
    -- Geographic information
    primary_habitat JSONB, -- JSON array of habitat types
    geographic_range JSONB, -- GeoJSON polygon
    countries_present TEXT[],
    endemic_regions TEXT[],
    migration_patterns JSONB,
    
    -- Physical characteristics
    description TEXT,
    physical_characteristics JSONB,
    behavior_patterns JSONB,
    diet_information JSONB,
    lifespan_data JSONB,
    
    -- Conservation information
    major_threats TEXT[],
    conservation_actions TEXT[],
    protection_programs TEXT[],
    research_priority_level INTEGER DEFAULT 1,
    
    -- Cultural and spiritual significance
    cultural_significance TEXT,
    spiritual_significance TEXT,
    faith_connections JSONB, -- Connection to different faith traditions
    traditional_names JSONB, -- Names in different languages/cultures
    
    -- Media and documentation
    primary_image_url TEXT,
    additional_images TEXT[],
    sound_recordings TEXT[],
    video_content TEXT[],
    
    -- Metadata
    keystone_species BOOLEAN DEFAULT FALSE,
    flagship_species BOOLEAN DEFAULT FALSE,
    indicator_species BOOLEAN DEFAULT FALSE,
    data_quality_score INTEGER DEFAULT 1,
    last_assessment_date DATE,
    
    -- Community interaction
    total_guardians INTEGER DEFAULT 0,
    total_peace_coins_generated BIGINT DEFAULT 0,
    community_reports_count INTEGER DEFAULT 0,
    
    -- AI and ML data
    ai_threat_assessment JSONB,
    ml_population_predictions JSONB,
    sentiment_analysis JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    verified_by UUID REFERENCES users(id),
    verification_status VARCHAR(20) DEFAULT 'pending'
);

-- Species guardianship (many-to-many relationship)
CREATE TABLE species_guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    species_id UUID NOT NULL REFERENCES species(id) ON DELETE CASCADE,
    guardian_level VARCHAR(20) DEFAULT 'supporter', -- supporter, guardian, champion, protector
    adoption_date TIMESTAMPTZ DEFAULT NOW(),
    total_contribution BIGINT DEFAULT 0,
    monthly_commitment DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    special_permissions JSONB DEFAULT '{}',
    
    UNIQUE(user_id, species_id)
);

-- Species sightings and reports
CREATE TABLE species_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    species_id UUID NOT NULL REFERENCES species(id),
    reporter_id UUID NOT NULL REFERENCES users(id),
    
    -- Report details
    report_type VARCHAR(30) NOT NULL, -- sighting, threat, rescue, behavior, habitat_change
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    confidence_level INTEGER DEFAULT 1, -- 1-5 scale
    
    -- Location information
    location_name VARCHAR(200),
    coordinates POINT,
    country_code VARCHAR(3),
    region VARCHAR(100),
    habitat_type VARCHAR(100),
    
    -- Observation details
    observation_date TIMESTAMPTZ NOT NULL,
    weather_conditions JSONB,
    time_of_day VARCHAR(20),
    duration_minutes INTEGER,
    individual_count INTEGER,
    behavior_observed TEXT[],
    
    -- Evidence
    photos TEXT[],
    videos TEXT[],
    audio_recordings TEXT[],
    additional_evidence JSONB,
    
    -- Verification and validation
    verification_status VARCHAR(20) DEFAULT 'pending',
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    verification_notes TEXT,
    community_votes JSONB DEFAULT '{"upvotes": 0, "downvotes": 0}',
    
    -- Impact and follow-up
    threat_level INTEGER DEFAULT 0, -- 0-5 scale
    action_required BOOLEAN DEFAULT FALSE,
    follow_up_actions TEXT[],
    resolution_status VARCHAR(20) DEFAULT 'open',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    data_quality_score INTEGER DEFAULT 1
);

-- =====================================================
-- HABITAT MONITORING AND ENVIRONMENTAL DATA
-- =====================================================

-- Habitat sites
CREATE TABLE habitat_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic information
    name VARCHAR(200) NOT NULL,
    description TEXT,
    habitat_type VARCHAR(50) NOT NULL, -- forest, wetland, grassland, marine, mountain, desert, urban
    ecosystem_type VARCHAR(100),
    
    -- Geographic information
    boundaries GEOMETRY(POLYGON, 4326),
    center_point GEOMETRY(POINT, 4326),
    area_hectares DECIMAL(15,2),
    elevation_range JSONB,
    country_code VARCHAR(3) NOT NULL,
    region VARCHAR(100),
    administrative_area VARCHAR(200),
    
    -- Protection status
    protection_level VARCHAR(30) NOT NULL, -- none, partial, protected, sacred
    protection_type VARCHAR(50), -- national_park, reserve, sacred_site, community_conservancy
    legal_status VARCHAR(100),
    managing_organizations TEXT[],
    
    -- Species information
    key_species TEXT[], -- Array of species IDs or names
    threatened_species TEXT[],
    endemic_species TEXT[],
    total_species_count INTEGER DEFAULT 0,
    biodiversity_index DECIMAL(5,2),
    
    -- Environmental health
    health_score INTEGER DEFAULT 50, -- 0-100 scale
    trend_direction VARCHAR(20) DEFAULT 'stable', -- improving, stable, declining
    last_assessment_date DATE,
    assessment_methodology VARCHAR(100),
    
    -- Threats and pressures
    current_threats TEXT[],
    threat_severity_score INTEGER DEFAULT 0, -- 0-100 scale
    human_pressure_index DECIMAL(5,2),
    climate_vulnerability_score INTEGER DEFAULT 0,
    
    -- Conservation activities
    conservation_programs TEXT[],
    restoration_projects TEXT[],
    monitoring_systems TEXT[],
    community_involvement_level VARCHAR(20),
    
    -- Faith and cultural significance
    cultural_significance TEXT,
    spiritual_importance TEXT,
    sacred_sites JSONB, -- Locations within the habitat
    traditional_use_practices TEXT[],
    faith_community_guardians TEXT[],
    
    -- Monitoring infrastructure
    has_camera_traps BOOLEAN DEFAULT FALSE,
    has_sensors BOOLEAN DEFAULT FALSE,
    has_weather_station BOOLEAN DEFAULT FALSE,
    has_satellite_monitoring BOOLEAN DEFAULT FALSE,
    monitoring_frequency VARCHAR(50),
    
    -- Community engagement
    total_guardians INTEGER DEFAULT 0,
    community_reports_count INTEGER DEFAULT 0,
    volunteer_hours_logged INTEGER DEFAULT 0,
    
    -- Blockchain and verification
    blockchain_protected BOOLEAN DEFAULT FALSE,
    blockchain_transaction_hash VARCHAR(66),
    verification_status VARCHAR(20) DEFAULT 'pending',
    
    -- Metadata
    established_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    data_source VARCHAR(100)
);

-- Environmental monitoring data
CREATE TABLE environmental_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habitat_site_id UUID NOT NULL REFERENCES habitat_sites(id),
    monitoring_device_id UUID,
    
    -- Measurement details
    measurement_timestamp TIMESTAMPTZ NOT NULL,
    data_type VARCHAR(50) NOT NULL, -- temperature, humidity, precipitation, air_quality, etc.
    value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    measurement_method VARCHAR(100),
    
    -- Location (if different from site center)
    measurement_location GEOMETRY(POINT, 4326),
    
    -- Quality and reliability
    data_quality_score INTEGER DEFAULT 5, -- 1-10 scale
    confidence_interval JSONB,
    anomaly_detected BOOLEAN DEFAULT FALSE,
    
    -- Additional context
    weather_conditions JSONB,
    equipment_status VARCHAR(20),
    calibration_date DATE,
    
    -- Aggregation helpers
    daily_summary BOOLEAN DEFAULT FALSE,
    weekly_summary BOOLEAN DEFAULT FALSE,
    monthly_summary BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monitoring devices and sensors
CREATE TABLE monitoring_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habitat_site_id UUID NOT NULL REFERENCES habitat_sites(id),
    
    -- Device information
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(50) NOT NULL, -- camera, sensor, gps_collar, acoustic, satellite, drone
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    
    -- Location and installation
    location GEOMETRY(POINT, 4326),
    installation_date DATE,
    installation_height_meters DECIMAL(5,2),
    orientation_degrees INTEGER,
    
    -- Status and health
    status VARCHAR(20) DEFAULT 'active', -- active, maintenance, offline, error
    battery_level INTEGER, -- Percentage
    signal_strength INTEGER, -- Percentage
    last_communication TIMESTAMPTZ,
    last_maintenance_date DATE,
    next_maintenance_due DATE,
    
    -- Capabilities
    measurement_types TEXT[],
    recording_capabilities TEXT[], -- photo, video, audio, data
    transmission_method VARCHAR(50), -- cellular, satellite, wifi, manual
    data_storage_capacity_gb DECIMAL(8,2),
    
    -- Configuration
    measurement_frequency JSONB, -- Different frequencies for different measurements
    alert_thresholds JSONB,
    power_management_settings JSONB,
    
    -- Performance metrics
    uptime_percentage DECIMAL(5,2),
    data_points_collected BIGINT DEFAULT 0,
    alerts_generated INTEGER DEFAULT 0,
    
    -- Maintenance and costs
    maintenance_cost_annual DECIMAL(10,2),
    responsible_organization VARCHAR(100),
    contact_person VARCHAR(100),
    contact_email VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- =====================================================
-- PRAYER AND SPIRITUAL CONTENT SYSTEM
-- =====================================================

-- Prayer and meditation content
CREATE TABLE prayer_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Content details
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(30) NOT NULL, -- prayer, meditation, chant, reflection, blessing
    category VARCHAR(50), -- daily, emergency, seasonal, species_specific
    
    -- Author and source
    author_id UUID REFERENCES users(id),
    author_name VARCHAR(150),
    source_tradition VARCHAR(50),
    original_language VARCHAR(10),
    
    -- Faith and spiritual attributes
    faith_traditions TEXT[] NOT NULL,
    spiritual_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, elder
    scripture_references JSONB, -- Array of scripture references
    
    -- Species and location context
    target_species TEXT[], -- Species this prayer is for
    target_habitats TEXT[], -- Habitats this prayer is for
    geographic_relevance TEXT[], -- Countries/regions where most relevant
    occasion VARCHAR(100), -- specific occasions or times
    time_of_day VARCHAR(20), -- dawn, midday, evening, night, any
    
    -- Content attributes
    duration_minutes INTEGER DEFAULT 5,
    difficulty_level VARCHAR(20) DEFAULT 'easy',
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    tags TEXT[],
    
    -- Media attachments
    audio_url TEXT,
    video_url TEXT,
    background_image_url TEXT,
    additional_media JSONB,
    
    -- Community interaction
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2),
    review_count INTEGER DEFAULT 0,
    
    -- AI enhancement
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_model_version VARCHAR(50),
    ai_prompt_used TEXT,
    human_reviewed BOOLEAN DEFAULT FALSE,
    
    -- Moderation and quality
    moderation_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, flagged
    moderated_by UUID REFERENCES users(id),
    moderated_at TIMESTAMPTZ,
    moderation_notes TEXT,
    quality_score INTEGER DEFAULT 1, -- 1-10 scale
    
    -- Usage and analytics
    view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    
    -- Visibility and access
    visibility VARCHAR(20) DEFAULT 'public', -- public, community, private
    featured BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User prayer activities and completions
CREATE TABLE prayer_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prayer_content_id UUID REFERENCES prayer_content(id),
    
    -- Activity details
    activity_type VARCHAR(30) NOT NULL, -- completion, favorite, share, review
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    
    -- Prayer session details
    session_notes TEXT,
    personal_intentions TEXT,
    mood_before VARCHAR(50),
    mood_after VARCHAR(50),
    spiritual_experience_rating INTEGER, -- 1-10 scale
    
    -- Location context (if user chooses to share)
    location GEOMETRY(POINT, 4326),
    location_name VARCHAR(200),
    time_zone VARCHAR(50),
    
    -- Social and community aspects
    shared_publicly BOOLEAN DEFAULT FALSE,
    shared_with_community BOOLEAN DEFAULT FALSE,
    prayer_circle_id UUID, -- Reference to group prayer sessions
    
    -- Impact and reflection
    personal_insights TEXT,
    action_commitments TEXT[],
    peace_coins_earned INTEGER DEFAULT 0,
    
    -- Analytics and patterns
    device_type VARCHAR(50),
    app_version VARCHAR(20),
    engagement_metrics JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CONSERVATION PROJECTS AND FUNDING
-- =====================================================

-- Conservation projects
CREATE TABLE conservation_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic project information
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    category VARCHAR(50) NOT NULL, -- habitat_restoration, species_protection, research, education, community_engagement, technology, policy_advocacy
    subcategory VARCHAR(100),
    
    -- Status and timeline
    status VARCHAR(30) DEFAULT 'planning', -- planning, fundraising, active, completed, paused, cancelled
    priority_level VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
    start_date DATE,
    end_date DATE,
    estimated_duration_months INTEGER,
    
    -- Location and scope
    primary_location GEOMETRY(POINT, 4326),
    project_area GEOMETRY(POLYGON, 4326),
    countries_involved TEXT[],
    regions_involved TEXT[],
    habitat_sites_involved UUID[], -- References to habitat_sites
    
    -- Species and conservation focus
    target_species TEXT[], -- Species UUIDs or names
    target_ecosystems TEXT[],
    conservation_goals TEXT[],
    expected_impact JSONB,
    
    -- Organization and team
    lead_organization VARCHAR(200),
    partner_organizations TEXT[],
    project_manager_id UUID REFERENCES users(id),
    team_members JSONB, -- Array of team member details
    volunteers_needed INTEGER DEFAULT 0,
    volunteers_registered INTEGER DEFAULT 0,
    
    -- Funding and budget
    total_budget_required DECIMAL(15,2) NOT NULL,
    current_funding DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    funding_sources JSONB, -- Array of funding source details
    fundraising_goal DECIMAL(15,2),
    funding_deadline DATE,
    
    -- Methodology and approach
    methodology TEXT,
    scientific_approach TEXT,
    community_engagement_plan TEXT,
    technology_used TEXT[],
    innovation_aspects TEXT[],
    
    -- Success metrics and monitoring
    success_metrics JSONB,
    monitoring_plan TEXT,
    reporting_frequency VARCHAR(50),
    evaluation_criteria JSONB,
    
    -- Faith and cultural integration
    faith_integration JSONB,
    cultural_considerations TEXT,
    spiritual_practices JSONB,
    community_blessing_required BOOLEAN DEFAULT FALSE,
    
    -- Risk management
    identified_risks JSONB,
    risk_mitigation_strategies JSONB,
    contingency_plans TEXT,
    
    -- Documentation and media
    documentation JSONB, -- Array of document references
    media_files JSONB, -- Photos, videos, etc.
    progress_photos TEXT[],
    impact_videos TEXT[],
    
    -- Community and social
    supporter_count INTEGER DEFAULT 0,
    volunteer_hours_logged INTEGER DEFAULT 0,
    community_reports_count INTEGER DEFAULT 0,
    social_media_metrics JSONB,
    
    -- Certifications and compliance
    certifications TEXT[],
    compliance_requirements JSONB,
    environmental_permits TEXT[],
    ethics_approval_status VARCHAR(20),
    
    -- AI and analytics
    ai_impact_predictions JSONB,
    ml_success_probability DECIMAL(5,2),
    sentiment_analysis JSONB,
    
    -- Verification and credibility
    verification_status VARCHAR(20) DEFAULT 'pending',
    verified_by UUID REFERENCES users(id),
    verification_date TIMESTAMPTZ,
    credibility_score INTEGER DEFAULT 1, -- 1-10 scale
    featured BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id),
    last_update_by UUID REFERENCES users(id)
);

-- Project updates and progress reports
CREATE TABLE project_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES conservation_projects(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    
    -- Update content
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    update_type VARCHAR(30) NOT NULL, -- progress, milestone, challenge, success, funding, media
    
    -- Progress information
    progress_percentage DECIMAL(5,2),
    milestones_completed TEXT[],
    challenges_faced TEXT[],
    solutions_implemented TEXT[],
    
    -- Financial information
    funding_received DECIMAL(15,2),
    expenses_incurred DECIMAL(15,2),
    budget_utilization DECIMAL(5,2),
    
    -- Impact metrics
    species_benefited TEXT[],
    habitat_area_improved DECIMAL(10,2),
    community_members_engaged INTEGER,
    volunteer_hours_contributed INTEGER,
    
    -- Media and documentation
    photos TEXT[],
    videos TEXT[],
    documents TEXT[],
    data_files TEXT[],
    
    -- Visibility and sharing
    visibility VARCHAR(20) DEFAULT 'public', -- public, supporters, team, private
    featured BOOLEAN DEFAULT FALSE,
    pinned BOOLEAN DEFAULT FALSE,
    
    -- Community engagement
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project supporters and contributions
CREATE TABLE project_supporters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES conservation_projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Support details
    support_type VARCHAR(30) NOT NULL, -- financial, volunteer, expertise, promotion, prayer
    total_contribution DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    monthly_commitment DECIMAL(10,2) DEFAULT 0,
    
    -- Volunteer information
    volunteer_skills TEXT[],
    availability VARCHAR(100),
    time_commitment_hours INTEGER DEFAULT 0,
    volunteer_location VARCHAR(200),
    
    -- Recognition and rewards
    recognition_level VARCHAR(30) DEFAULT 'supporter', -- supporter, contributor, champion, patron, guardian
    public_recognition BOOLEAN DEFAULT TRUE,
    rewards_earned JSONB,
    special_access JSONB,
    
    -- Engagement
    updates_subscription BOOLEAN DEFAULT TRUE,
    newsletter_subscription BOOLEAN DEFAULT TRUE,
    event_notifications BOOLEAN DEFAULT TRUE,
    
    -- Faith and motivation
    spiritual_motivation TEXT,
    faith_tradition VARCHAR(50),
    prayer_commitment BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(project_id, user_id)
);

-- =====================================================
-- COMMUNITY FORUMS AND DISCUSSIONS
-- =====================================================

-- Forum categories and communities
CREATE TABLE forums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic information
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(30) NOT NULL, -- faith, species, general, regional
    category VARCHAR(100) NOT NULL, -- Faith tradition or species category
    
    -- Organization
    parent_forum_id UUID REFERENCES forums(id),
    display_order INTEGER DEFAULT 0,
    icon_url TEXT,
    banner_url TEXT,
    color_scheme VARCHAR(20),
    
    -- Rules and moderation
    rules TEXT[],
    moderation_policy TEXT,
    content_guidelines TEXT,
    posting_requirements JSONB,
    
    -- Access and permissions
    visibility VARCHAR(20) DEFAULT 'public', -- public, private, invite_only
    requires_approval BOOLEAN DEFAULT FALSE,
    member_limit INTEGER,
    
    -- Moderators and administration
    moderator_ids UUID[],
    admin_ids UUID[],
    
    -- Statistics
    member_count INTEGER DEFAULT 0,
    topic_count INTEGER DEFAULT 0,
    post_count INTEGER DEFAULT 0,
    last_activity_at TIMESTAMPTZ,
    
    -- Settings
    allow_anonymous_posts BOOLEAN DEFAULT FALSE,
    allow_file_uploads BOOLEAN DEFAULT TRUE,
    max_file_size_mb INTEGER DEFAULT 10,
    allowed_file_types TEXT[],
    
    -- Cultural and language
    primary_language VARCHAR(10) DEFAULT 'en',
    supported_languages TEXT[],
    cultural_guidelines TEXT,
    
    -- Featured and special status
    featured BOOLEAN DEFAULT FALSE,
    official BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id)
);

-- Discussion topics
CREATE TABLE forum_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forum_id UUID NOT NULL REFERENCES forums(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    
    -- Topic content
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    topic_type VARCHAR(30) DEFAULT 'discussion', -- discussion, question, prayer_request, testimony, news, event, project_update, meditation_guide
    
    -- Classification and organization
    tags TEXT[],
    category VARCHAR(100),
    spiritual_level VARCHAR(20), -- beginner, intermediate, advanced, elder
    
    -- Status and moderation
    status VARCHAR(20) DEFAULT 'active', -- active, locked, archived, deleted, pending_approval
    pinned BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    locked BOOLEAN DEFAULT FALSE,
    
    -- Engagement metrics
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    upvote_count INTEGER DEFAULT 0,
    downvote_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    
    -- Last activity tracking
    last_reply_at TIMESTAMPTZ DEFAULT NOW(),
    last_reply_by UUID REFERENCES users(id),
    
    -- Content analysis
    sentiment_score DECIMAL(3,2), -- -1 to 1
    readability_score INTEGER, -- 1-10
    quality_score INTEGER DEFAULT 1, -- 1-10
    
    -- Special features
    poll_data JSONB, -- For polls and voting
    event_details JSONB, -- For event announcements
    prayer_requests JSONB, -- For prayer-specific topics
    
    -- Media attachments
    attachments JSONB, -- Array of file attachments
    
    -- Moderation
    flagged_count INTEGER DEFAULT 0,
    moderation_notes TEXT,
    moderated_by UUID REFERENCES users(id),
    moderated_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum replies and comments
CREATE TABLE forum_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    parent_reply_id UUID REFERENCES forum_replies(id), -- For nested replies
    
    -- Reply content
    content TEXT NOT NULL,
    reply_depth INTEGER DEFAULT 0, -- Nesting level
    
    -- Status and moderation
    status VARCHAR(20) DEFAULT 'active', -- active, edited, deleted, pending_approval
    edited BOOLEAN DEFAULT FALSE,
    edit_reason TEXT,
    edited_at TIMESTAMPTZ,
    
    -- Engagement
    upvote_count INTEGER DEFAULT 0,
    downvote_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0, -- Marked as helpful
    
    -- Content analysis
    sentiment_score DECIMAL(3,2),
    quality_score INTEGER DEFAULT 1,
    
    -- Special markers
    marked_as_answer BOOLEAN DEFAULT FALSE, -- For Q&A topics
    marked_as_helpful BOOLEAN DEFAULT FALSE,
    highlighted BOOLEAN DEFAULT FALSE,
    
    -- Media attachments
    attachments JSONB,
    
    -- Moderation
    flagged_count INTEGER DEFAULT 0,
    moderation_notes TEXT,
    moderated_by UUID REFERENCES users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BLOCKCHAIN AND PEACECOIN SYSTEM
-- =====================================================

-- PeaceCoin transactions
CREATE TABLE peacecoin_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Transaction identifiers
    transaction_hash VARCHAR(66) NOT NULL UNIQUE, -- Blockchain transaction hash
    block_number BIGINT,
    block_hash VARCHAR(66),
    transaction_index INTEGER,
    
    -- Transaction details
    from_address VARCHAR(42) NOT NULL,
    to_address VARCHAR(42) NOT NULL,
    from_user_id UUID REFERENCES users(id),
    to_user_id UUID REFERENCES users(id),
    
    -- Amount and fees
    amount DECIMAL(20,8) NOT NULL, -- PeaceCoin amount with 8 decimal places
    gas_used BIGINT,
    gas_price DECIMAL(20,8),
    transaction_fee DECIMAL(20,8),
    
    -- Transaction type and purpose
    transaction_type VARCHAR(50) NOT NULL, -- transfer, earn, spend, stake, reward, burn
    purpose VARCHAR(100), -- prayer_completion, species_adoption, project_donation, etc.
    reference_id UUID, -- Reference to related entity (prayer, project, etc.)
    reference_type VARCHAR(50), -- Type of referenced entity
    
    -- Status and confirmation
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, failed, reverted
    confirmations INTEGER DEFAULT 0,
    confirmed_at TIMESTAMPTZ,
    
    -- Metadata
    notes TEXT,
    metadata JSONB, -- Additional transaction context
    
    -- Smart contract interaction
    contract_address VARCHAR(42),
    contract_method VARCHAR(100),
    contract_params JSONB,
    
    -- Analytics and categorization
    category VARCHAR(50), -- conservation, spiritual, community, governance
    impact_score DECIMAL(10,2), -- Calculated impact of this transaction
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAO governance and proposals
CREATE TABLE dao_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Proposal details
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    proposal_type VARCHAR(50) NOT NULL, -- funding, policy, partnership, emergency, governance
    category VARCHAR(100), -- Species, habitat, region-specific categories
    
    -- Proposer information
    proposer_id UUID NOT NULL REFERENCES users(id),
    proposer_address VARCHAR(42) NOT NULL,
    backing_organization VARCHAR(200),
    
    -- Voting and governance
    voting_power_required DECIMAL(20,8), -- Minimum PC required to vote
    quorum_threshold DECIMAL(5,2), -- Percentage of total supply needed
    approval_threshold DECIMAL(5,2), -- Percentage needed to pass
    
    -- Timeline
    proposal_start TIMESTAMPTZ NOT NULL,
    voting_start TIMESTAMPTZ NOT NULL,
    voting_end TIMESTAMPTZ NOT NULL,
    execution_deadline TIMESTAMPTZ,
    
    -- Voting results
    total_votes_cast DECIMAL(20,8) DEFAULT 0,
    votes_for DECIMAL(20,8) DEFAULT 0,
    votes_against DECIMAL(20,8) DEFAULT 0,
    votes_abstain DECIMAL(20,8) DEFAULT 0,
    voter_count INTEGER DEFAULT 0,
    
    -- Status and outcome
    status VARCHAR(30) DEFAULT 'draft', -- draft, active, passed, rejected, executed, cancelled, expired
    execution_status VARCHAR(30), -- pending, in_progress, completed, failed
    execution_transaction_hash VARCHAR(66),
    
    -- Financial aspects
    funding_requested DECIMAL(15,2),
    funding_currency VARCHAR(3),
    budget_breakdown JSONB,
    funding_source VARCHAR(100),
    
    -- Implementation details
    implementation_plan TEXT,
    success_criteria JSONB,
    timeline_milestones JSONB,
    responsible_parties TEXT[],
    
    -- Species and conservation context
    target_species TEXT[],
    target_habitats TEXT[],
    expected_conservation_impact JSONB,
    scientific_backing TEXT[],
    
    -- Faith and community aspects
    spiritual_significance TEXT,
    community_support_evidence TEXT[],
    cultural_considerations TEXT,
    faith_leader_endorsements TEXT[],
    
    -- Documentation
    supporting_documents TEXT[],
    research_references TEXT[],
    impact_assessments TEXT[],
    risk_analyses TEXT[],
    
    -- Analytics
    discussion_thread_id UUID REFERENCES forum_topics(id),
    public_comment_count INTEGER DEFAULT 0,
    media_coverage_links TEXT[],
    sentiment_analysis JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAO voting records
CREATE TABLE dao_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID NOT NULL REFERENCES dao_proposals(id) ON DELETE CASCADE,
    voter_id UUID NOT NULL REFERENCES users(id),
    voter_address VARCHAR(42) NOT NULL,
    
    -- Vote details
    vote_choice VARCHAR(20) NOT NULL, -- for, against, abstain
    voting_power DECIMAL(20,8) NOT NULL, -- Amount of PC used for voting
    vote_weight DECIMAL(10,8), -- Calculated weight (may include multipliers)
    
    -- Vote casting
    transaction_hash VARCHAR(66), -- Blockchain transaction for the vote
    cast_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Rationale and transparency
    public_comment TEXT,
    reasoning TEXT,
    delegate_vote BOOLEAN DEFAULT FALSE,
    delegated_by UUID REFERENCES users(id),
    
    -- Verification
    verified BOOLEAN DEFAULT FALSE,
    verification_signature TEXT,
    
    UNIQUE(proposal_id, voter_id)
);

-- =====================================================
-- ANALYTICS AND REPORTING
-- =====================================================

-- Global analytics cache (for performance)
CREATE TABLE analytics_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Cache identification
    cache_key VARCHAR(255) NOT NULL UNIQUE,
    cache_type VARCHAR(50) NOT NULL, -- overview, geographical, species, faith, predictions
    region VARCHAR(10), -- Regional scope of data
    
    -- Time scope
    time_period VARCHAR(20) NOT NULL, -- 24h, 7d, 30d, 90d, 1y, all_time
    start_date DATE,
    end_date DATE,
    
    -- Cached data
    data JSONB NOT NULL,
    
    -- Cache management
    expires_at TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    hit_count INTEGER DEFAULT 0,
    
    -- Quality and reliability
    data_freshness_score INTEGER DEFAULT 10, -- 1-10, decreases over time
    computation_time_ms INTEGER,
    data_sources TEXT[], -- What data sources were used
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time activity log
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User and session
    user_id UUID REFERENCES users(id),
    session_id UUID,
    
    -- Activity details
    activity_type VARCHAR(50) NOT NULL, -- prayer, adoption, donation, post, vote, etc.
    activity_category VARCHAR(30), -- spiritual, conservation, community, governance
    description TEXT,
    
    -- Context
    entity_type VARCHAR(50), -- species, project, prayer, topic, etc.
    entity_id UUID,
    entity_name VARCHAR(200),
    
    -- Location and device
    country_code VARCHAR(3),
    region VARCHAR(100),
    device_type VARCHAR(30),
    platform VARCHAR(30),
    app_version VARCHAR(20),
    
    -- Impact and metrics
    peace_coins_involved DECIMAL(20,8) DEFAULT 0,
    impact_score DECIMAL(10,2) DEFAULT 0,
    engagement_duration INTEGER, -- Seconds
    
    -- Technical details
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- Timestamps
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- Analytics helpers
    date_partition DATE GENERATED ALWAYS AS (timestamp::DATE) STORED,
    hour_partition INTEGER GENERATED ALWAYS AS (EXTRACT(HOUR FROM timestamp)) STORED
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_country_region ON users(country_code, region);
CREATE INDEX idx_users_faith_traditions ON users USING GIN(faith_traditions);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_shard_key ON users(shard_key);

-- Species table indexes
CREATE INDEX idx_species_common_name ON species(common_name);
CREATE INDEX idx_species_scientific_name ON species(scientific_name);
CREATE INDEX idx_species_conservation_status ON species(conservation_status);
CREATE INDEX idx_species_category ON species(category);
CREATE INDEX idx_species_countries ON species USING GIN(countries_present);
CREATE INDEX idx_species_threats ON species USING GIN(major_threats);

-- Habitat sites spatial indexes
CREATE INDEX idx_habitat_sites_boundaries ON habitat_sites USING GIST(boundaries);
CREATE INDEX idx_habitat_sites_center_point ON habitat_sites USING GIST(center_point);
CREATE INDEX idx_habitat_sites_country ON habitat_sites(country_code);
CREATE INDEX idx_habitat_sites_type ON habitat_sites(habitat_type);

-- Environmental data time-series indexes
CREATE INDEX idx_environmental_data_timestamp ON environmental_data(measurement_timestamp);
CREATE INDEX idx_environmental_data_site_type_time ON environmental_data(habitat_site_id, data_type, measurement_timestamp);
CREATE INDEX idx_environmental_data_location ON environmental_data USING GIST(measurement_location);

-- Prayer content indexes
CREATE INDEX idx_prayer_content_faith_traditions ON prayer_content USING GIN(faith_traditions);
CREATE INDEX idx_prayer_content_target_species ON prayer_content USING GIN(target_species);
CREATE INDEX idx_prayer_content_language ON prayer_content(language);
CREATE INDEX idx_prayer_content_tags ON prayer_content USING GIN(tags);
CREATE INDEX idx_prayer_content_status ON prayer_content(moderation_status);

-- Forum indexes
CREATE INDEX idx_forum_topics_forum_id ON forum_topics(forum_id);
CREATE INDEX idx_forum_topics_author_id ON forum_topics(author_id);
CREATE INDEX idx_forum_topics_created_at ON forum_topics(created_at);
CREATE INDEX idx_forum_topics_last_reply_at ON forum_topics(last_reply_at);
CREATE INDEX idx_forum_topics_tags ON forum_topics USING GIN(tags);

CREATE INDEX idx_forum_replies_topic_id ON forum_replies(topic_id);
CREATE INDEX idx_forum_replies_author_id ON forum_replies(author_id);
CREATE INDEX idx_forum_replies_parent_reply_id ON forum_replies(parent_reply_id);
CREATE INDEX idx_forum_replies_created_at ON forum_replies(created_at);

-- Blockchain indexes
CREATE INDEX idx_peacecoin_transactions_hash ON peacecoin_transactions(transaction_hash);
CREATE INDEX idx_peacecoin_transactions_from_user ON peacecoin_transactions(from_user_id);
CREATE INDEX idx_peacecoin_transactions_to_user ON peacecoin_transactions(to_user_id);
CREATE INDEX idx_peacecoin_transactions_type ON peacecoin_transactions(transaction_type);
CREATE INDEX idx_peacecoin_transactions_created_at ON peacecoin_transactions(created_at);

-- Analytics indexes
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_timestamp ON activity_log(timestamp);
CREATE INDEX idx_activity_log_date_partition ON activity_log(date_partition);
CREATE INDEX idx_activity_log_activity_type ON activity_log(activity_type);
CREATE INDEX idx_activity_log_country ON activity_log(country_code);

CREATE INDEX idx_analytics_cache_key ON analytics_cache(cache_key);
CREATE INDEX idx_analytics_cache_type_region ON analytics_cache(cache_type, region);
CREATE INDEX idx_analytics_cache_expires_at ON analytics_cache(expires_at);

-- =====================================================
-- PARTITIONING FOR SCALABILITY
-- =====================================================

-- Partition activity_log by date for better performance
-- This would be implemented using native PostgreSQL partitioning
-- Example for monthly partitions:

-- CREATE TABLE activity_log_2024_01 PARTITION OF activity_log
-- FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_species_updated_at BEFORE UPDATE ON species FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_habitat_sites_updated_at BEFORE UPDATE ON habitat_sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conservation_projects_updated_at BEFORE UPDATE ON conservation_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_content_updated_at BEFORE UPDATE ON prayer_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forums_updated_at BEFORE UPDATE ON forums FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_topics_updated_at BEFORE UPDATE ON forum_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate shard key based on user location
CREATE OR REPLACE FUNCTION generate_shard_key(country_code VARCHAR, user_id UUID)
RETURNS VARCHAR AS $$
BEGIN
    -- Simple sharding strategy based on country and user ID
    -- In production, this would be more sophisticated
    RETURN country_code || '_' || (abs(hashtext(user_id::text)) % 1000);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample regions and shard mappings
INSERT INTO paxis_global.shard_mapping (shard_key, shard_id, shard_name, region, database_url) VALUES
('US_*', 1, 'us_shard_001', 'US', 'postgresql://us-db-001.paxis.org:5432/paxis'),
('EU_*', 2, 'eu_shard_001', 'EU', 'postgresql://eu-db-001.paxis.org:5432/paxis'),
('AP_*', 3, 'ap_shard_001', 'AP', 'postgresql://ap-db-001.paxis.org:5432/paxis'),
('AF_*', 4, 'af_shard_001', 'AF', 'postgresql://af-db-001.paxis.org:5432/paxis'),
('SA_*', 5, 'sa_shard_001', 'SA', 'postgresql://sa-db-001.paxis.org:5432/paxis');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Global user statistics view
CREATE VIEW global_user_stats AS
SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE last_login_at > NOW() - INTERVAL '24 hours') as active_24h,
    COUNT(*) FILTER (WHERE last_login_at > NOW() - INTERVAL '7 days') as active_7d,
    COUNT(*) FILTER (WHERE last_login_at > NOW() - INTERVAL '30 days') as active_30d,
    COUNT(DISTINCT country_code) as countries_represented,
    COUNT(*) FILTER (WHERE is_verified_guardian = true) as verified_guardians,
    SUM((SELECT current_balance FROM user_conservation_stats WHERE user_id = users.id)) as total_peace_coins
FROM users
WHERE account_status = 'active';

-- Species conservation overview
CREATE VIEW species_conservation_overview AS
SELECT 
    s.id,
    s.common_name,
    s.conservation_status,
    s.total_guardians,
    s.total_peace_coins_generated,
    COUNT(sr.id) as report_count,
    AVG(CASE WHEN sr.threat_level > 0 THEN sr.threat_level END) as avg_threat_level,
    MAX(sr.observation_date) as last_sighting
FROM species s
LEFT JOIN species_reports sr ON s.id = sr.species_id
GROUP BY s.id, s.common_name, s.conservation_status, s.total_guardians, s.total_peace_coins_generated;

-- Regional activity summary
CREATE VIEW regional_activity_summary AS
SELECT 
    country_code,
    COUNT(*) as total_activities,
    COUNT(DISTINCT user_id) as active_users,
    SUM(peace_coins_involved) as total_peace_coins,
    COUNT(*) FILTER (WHERE activity_type = 'prayer') as prayers,
    COUNT(*) FILTER (WHERE activity_type = 'adoption') as adoptions,
    COUNT(*) FILTER (WHERE activity_type = 'donation') as donations,
    DATE_TRUNC('day', timestamp) as activity_date
FROM activity_log
WHERE timestamp > NOW() - INTERVAL '30 days'
GROUP BY country_code, DATE_TRUNC('day', timestamp);

-- =====================================================
-- MATERIALIZED VIEWS FOR ANALYTICS
-- =====================================================

-- Daily global metrics (refreshed daily)
CREATE MATERIALIZED VIEW daily_global_metrics AS
SELECT 
    date_trunc('day', timestamp) as metric_date,
    COUNT(*) as total_activities,
    COUNT(DISTINCT user_id) as unique_users,
    SUM(peace_coins_involved) as total_peace_coins,
    COUNT(*) FILTER (WHERE activity_category = 'spiritual') as spiritual_activities,
    COUNT(*) FILTER (WHERE activity_category = 'conservation') as conservation_activities,
    COUNT(*) FILTER (WHERE activity_category = 'community') as community_activities,
    COUNT(DISTINCT country_code) as countries_active
FROM activity_log
GROUP BY date_trunc('day', timestamp)
ORDER BY metric_date;

-- Create index for the materialized view
CREATE UNIQUE INDEX idx_daily_global_metrics_date ON daily_global_metrics(metric_date);

-- Monthly species statistics
CREATE MATERIALIZED VIEW monthly_species_stats AS
SELECT 
    s.id as species_id,
    s.common_name,
    s.conservation_status,
    date_trunc('month', al.timestamp) as stat_month,
    COUNT(*) FILTER (WHERE al.activity_type = 'adoption') as new_guardians,
    COUNT(*) FILTER (WHERE al.activity_type = 'prayer') as prayers_completed,
    COUNT(*) FILTER (WHERE al.activity_type = 'donation') as donations_received,
    SUM(al.peace_coins_involved) as peace_coins_generated
FROM species s
LEFT JOIN activity_log al ON s.id::text = al.entity_id::text AND al.entity_type = 'species'
GROUP BY s.id, s.common_name, s.conservation_status, date_trunc('month', al.timestamp)
ORDER BY stat_month DESC, s.common_name;

-- =====================================================
-- CLEANUP AND MAINTENANCE PROCEDURES
-- =====================================================

-- Procedure to clean up old activity logs
CREATE OR REPLACE FUNCTION cleanup_old_activity_logs()
RETURNS void AS $$
BEGIN
    -- Delete activity logs older than 2 years
    DELETE FROM activity_log 
    WHERE timestamp < NOW() - INTERVAL '2 years';
    
    -- Delete old session data
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() - INTERVAL '30 days';
    
    -- Clean up expired cache entries
    DELETE FROM analytics_cache 
    WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- GRANTS AND PERMISSIONS
-- =====================================================

-- Create roles for different access levels
-- CREATE ROLE paxis_read_only;
-- CREATE ROLE paxis_app_user;
-- CREATE ROLE paxis_admin;

-- Grant appropriate permissions
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO paxis_read_only;
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO paxis_app_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO paxis_admin;

-- Comments for documentation
COMMENT ON SCHEMA paxis_global IS 'Global configuration and cross-shard data';
COMMENT ON TABLE users IS 'Global user accounts with multi-region support';
COMMENT ON TABLE species IS 'Comprehensive species database with conservation tracking';
COMMENT ON TABLE habitat_sites IS 'Protected areas and conservation sites worldwide';
COMMENT ON TABLE conservation_projects IS 'Community-driven conservation initiatives';
COMMENT ON TABLE prayer_content IS 'Faith-based spiritual content for wildlife conservation';
COMMENT ON TABLE forums IS 'Community discussion spaces organized by faith and species';
COMMENT ON TABLE peacecoin_transactions IS 'Blockchain-based conservation token transactions';
COMMENT ON TABLE activity_log IS 'Real-time user activity for analytics and insights';
