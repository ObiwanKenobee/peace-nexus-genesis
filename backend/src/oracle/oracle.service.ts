import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import axios from "axios";

export interface SatelliteData {
  id: string;
  timestamp: Date;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  altitude: number;
  dataType:
    | "environmental"
    | "military"
    | "infrastructure"
    | "agricultural"
    | "humanitarian";
  metrics: {
    [key: string]: number | string;
  };
  confidence: number;
  source: string;
}

export interface IoTSensorData {
  deviceId: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  sensorType:
    | "seismic"
    | "radiation"
    | "weather"
    | "air_quality"
    | "water_quality"
    | "acoustic"
    | "electromagnetic";
  reading: number;
  unit: string;
  timestamp: Date;
  status: "active" | "warning" | "critical" | "offline";
  batteryLevel?: number;
}

export interface ThreatAlert {
  id: string;
  type:
    | "natural_disaster"
    | "military_movement"
    | "resource_scarcity"
    | "infrastructure_failure"
    | "environmental_hazard";
  severity: "low" | "medium" | "high" | "critical";
  location: {
    latitude: number;
    longitude: number;
    region: string;
    country: string;
  };
  description: string;
  confidence: number;
  sources: string[];
  predictedImpact: {
    population: number;
    economicLoss: number;
    environmentalDamage: string;
  };
  recommendedActions: string[];
  timestamp: Date;
  expiresAt: Date;
}

export interface ResourceMonitoring {
  resourceType: "water" | "food" | "energy" | "medical_supplies" | "fuel";
  region: string;
  country: string;
  currentLevel: number;
  capacity: number;
  utilizationRate: number;
  trend: "increasing" | "stable" | "decreasing" | "critical";
  projectedDays: number;
  suppliers: string[];
  distributionPoints: Array<{
    location: { latitude: number; longitude: number };
    capacity: number;
    currentStock: number;
  }>;
  lastUpdated: Date;
}

@Injectable()
export class OracleService {
  private readonly logger = new Logger(OracleService.name);
  private readonly satelliteProviders: Map<string, string> = new Map();
  private readonly iotNetworks: Map<string, string> = new Map();
  private activeAlerts: Map<string, ThreatAlert> = new Map();
  private sensorNetwork: Map<string, IoTSensorData> = new Map();

  constructor(private configService: ConfigService) {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize satellite data providers
    this.satelliteProviders.set(
      "landsat",
      this.configService.get("LANDSAT_API_KEY", ""),
    );
    this.satelliteProviders.set(
      "sentinel",
      this.configService.get("SENTINEL_API_KEY", ""),
    );
    this.satelliteProviders.set(
      "planet",
      this.configService.get("PLANET_API_KEY", ""),
    );
    this.satelliteProviders.set(
      "maxar",
      this.configService.get("MAXAR_API_KEY", ""),
    );

    // Initialize IoT networks
    this.iotNetworks.set(
      "sigfox",
      this.configService.get("SIGFOX_API_KEY", ""),
    );
    this.iotNetworks.set("lora", this.configService.get("LORA_API_KEY", ""));
    this.iotNetworks.set(
      "cellular",
      this.configService.get("CELLULAR_API_KEY", ""),
    );
    this.iotNetworks.set(
      "satellite_iot",
      this.configService.get("SATELLITE_IOT_API_KEY", ""),
    );

    this.logger.log("Oracle providers initialized");
  }

  // Satellite Data Collection
  async collectSatelliteData(
    region: { latitude: number; longitude: number; radius: number },
    dataTypes: SatelliteData["dataType"][],
  ): Promise<SatelliteData[]> {
    const satelliteData: SatelliteData[] = [];

    try {
      // Collect from multiple satellite providers
      for (const [provider, apiKey] of this.satelliteProviders.entries()) {
        if (!apiKey) continue;

        const data = await this.fetchFromSatelliteProvider(
          provider,
          region,
          dataTypes,
        );
        satelliteData.push(...data);
      }

      this.logger.log(
        `Collected ${satelliteData.length} satellite data points for region`,
      );
      return satelliteData;
    } catch (error) {
      this.logger.error("Failed to collect satellite data:", error);
      return [];
    }
  }

  private async fetchFromSatelliteProvider(
    provider: string,
    region: any,
    dataTypes: string[],
  ): Promise<SatelliteData[]> {
    // Simulate satellite data collection
    const mockData: SatelliteData[] = [];

    for (let i = 0; i < 5; i++) {
      mockData.push({
        id: `${provider}_${Date.now()}_${i}`,
        timestamp: new Date(),
        coordinates: {
          latitude: region.latitude + (Math.random() - 0.5) * 0.1,
          longitude: region.longitude + (Math.random() - 0.5) * 0.1,
        },
        altitude: 400 + Math.random() * 200,
        dataType: dataTypes[
          Math.floor(Math.random() * dataTypes.length)
        ] as any,
        metrics: {
          ndvi: Math.random() * 0.8 + 0.2, // Vegetation index
          temperature: Math.random() * 40 + 10,
          precipitation: Math.random() * 100,
          cloudCover: Math.random() * 100,
        },
        confidence: Math.random() * 30 + 70,
        source: provider,
      });
    }

    return mockData;
  }

  // IoT Sensor Network
  async registerIoTDevice(
    deviceData: Omit<IoTSensorData, "timestamp" | "status">,
  ): Promise<boolean> {
    try {
      const device: IoTSensorData = {
        ...deviceData,
        timestamp: new Date(),
        status: "active",
      };

      this.sensorNetwork.set(device.deviceId, device);
      this.logger.log(`IoT device registered: ${device.deviceId}`);
      return true;
    } catch (error) {
      this.logger.error("Failed to register IoT device:", error);
      return false;
    }
  }

  async updateSensorReading(
    deviceId: string,
    reading: number,
    timestamp?: Date,
  ): Promise<boolean> {
    try {
      const device = this.sensorNetwork.get(deviceId);
      if (!device) {
        this.logger.warn(`Device not found: ${deviceId}`);
        return false;
      }

      device.reading = reading;
      device.timestamp = timestamp || new Date();
      device.status = this.determineSensorStatus(device);

      this.sensorNetwork.set(deviceId, device);

      // Check for anomalies
      await this.checkForAnomalies(device);

      return true;
    } catch (error) {
      this.logger.error("Failed to update sensor reading:", error);
      return false;
    }
  }

  private determineSensorStatus(
    device: IoTSensorData,
  ): IoTSensorData["status"] {
    // Determine status based on reading and thresholds
    const thresholds = this.getSensorThresholds(device.sensorType);

    if (device.reading > thresholds.critical) return "critical";
    if (device.reading > thresholds.warning) return "warning";
    if (device.batteryLevel && device.batteryLevel < 10) return "warning";

    return "active";
  }

  private getSensorThresholds(sensorType: IoTSensorData["sensorType"]) {
    const thresholds = {
      seismic: { warning: 3.0, critical: 5.0 },
      radiation: { warning: 0.1, critical: 1.0 },
      weather: { warning: 50, critical: 80 }, // Wind speed
      air_quality: { warning: 100, critical: 200 }, // AQI
      water_quality: { warning: 8.5, critical: 9.0 }, // pH
      acoustic: { warning: 85, critical: 100 }, // Decibels
      electromagnetic: { warning: 50, critical: 100 }, // Field strength
    };

    return thresholds[sensorType] || { warning: 50, critical: 100 };
  }

  // Threat Detection and Alerting
  async analyzeThreats(region?: string): Promise<ThreatAlert[]> {
    try {
      const threats: ThreatAlert[] = [];

      // Analyze satellite data for threats
      const satelliteThreats = await this.analyzeSatelliteThreats(region);
      threats.push(...satelliteThreats);

      // Analyze IoT sensor data for threats
      const sensorThreats = await this.analyzeSensorThreats(region);
      threats.push(...sensorThreats);

      // Update active alerts
      threats.forEach((threat) => {
        this.activeAlerts.set(threat.id, threat);
      });

      this.logger.log(`Analyzed threats: ${threats.length} identified`);
      return threats;
    } catch (error) {
      this.logger.error("Failed to analyze threats:", error);
      return [];
    }
  }

  private async analyzeSatelliteThreats(
    region?: string,
  ): Promise<ThreatAlert[]> {
    // Simulate threat analysis from satellite data
    const threats: ThreatAlert[] = [];

    // Mock military movement detection
    if (Math.random() > 0.7) {
      threats.push({
        id: `sat_threat_${Date.now()}`,
        type: "military_movement",
        severity: "medium",
        location: {
          latitude: 40.7128 + (Math.random() - 0.5) * 10,
          longitude: -74.006 + (Math.random() - 0.5) * 10,
          region: region || "Global",
          country: "Unknown",
        },
        description:
          "Satellite imagery shows unusual military vehicle concentrations",
        confidence: 85,
        sources: ["landsat", "sentinel"],
        predictedImpact: {
          population: Math.floor(Math.random() * 100000),
          economicLoss: Math.floor(Math.random() * 1000000),
          environmentalDamage: "Low",
        },
        recommendedActions: [
          "Monitor situation closely",
          "Engage diplomatic channels",
          "Prepare humanitarian resources",
        ],
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });
    }

    return threats;
  }

  private async analyzeSensorThreats(region?: string): Promise<ThreatAlert[]> {
    const threats: ThreatAlert[] = [];

    // Analyze critical sensor readings
    for (const [deviceId, device] of this.sensorNetwork.entries()) {
      if (device.status === "critical") {
        if (device.sensorType === "seismic" && device.reading > 5.0) {
          threats.push({
            id: `sensor_threat_${deviceId}_${Date.now()}`,
            type: "natural_disaster",
            severity: "high",
            location: {
              latitude: device.location.latitude,
              longitude: device.location.longitude,
              region: device.location.region,
              country: "Unknown",
            },
            description: `Seismic activity detected: ${device.reading} magnitude`,
            confidence: 90,
            sources: [deviceId],
            predictedImpact: {
              population: Math.floor(Math.random() * 50000),
              economicLoss: Math.floor(Math.random() * 500000),
              environmentalDamage: "Medium",
            },
            recommendedActions: [
              "Issue earthquake warning",
              "Evacuate high-risk areas",
              "Deploy emergency response teams",
            ],
            timestamp: new Date(),
            expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
          });
        }
      }
    }

    return threats;
  }

  // Resource Monitoring
  async monitorResources(region: string): Promise<ResourceMonitoring[]> {
    try {
      const resources: ResourceMonitoring[] = [];

      // Monitor different resource types
      const resourceTypes: ResourceMonitoring["resourceType"][] = [
        "water",
        "food",
        "energy",
        "medical_supplies",
        "fuel",
      ];

      for (const resourceType of resourceTypes) {
        const resource = await this.getResourceStatus(resourceType, region);
        resources.push(resource);
      }

      this.logger.log(
        `Resource monitoring completed for ${region}: ${resources.length} resources`,
      );
      return resources;
    } catch (error) {
      this.logger.error("Failed to monitor resources:", error);
      return [];
    }
  }

  private async getResourceStatus(
    resourceType: ResourceMonitoring["resourceType"],
    region: string,
  ): Promise<ResourceMonitoring> {
    // Simulate resource monitoring
    const currentLevel = Math.random() * 100;
    const capacity = 100;
    const utilizationRate = Math.random() * 0.8 + 0.1;

    let trend: ResourceMonitoring["trend"];
    if (currentLevel < 20) trend = "critical";
    else if (currentLevel < 40) trend = "decreasing";
    else if (currentLevel > 80) trend = "increasing";
    else trend = "stable";

    return {
      resourceType,
      region,
      country: "Unknown",
      currentLevel,
      capacity,
      utilizationRate,
      trend,
      projectedDays: Math.floor(currentLevel / (utilizationRate * 2)),
      suppliers: [`${resourceType}_supplier_1`, `${resourceType}_supplier_2`],
      distributionPoints: [
        {
          location: { latitude: 40.7128, longitude: -74.006 },
          capacity: 1000,
          currentStock: Math.floor(Math.random() * 1000),
        },
        {
          location: { latitude: 40.7589, longitude: -73.9851 },
          capacity: 800,
          currentStock: Math.floor(Math.random() * 800),
        },
      ],
      lastUpdated: new Date(),
    };
  }

  // Automated Data Collection
  @Cron(CronExpression.EVERY_10_MINUTES)
  async collectRoutineData() {
    this.logger.log("Starting routine data collection");

    try {
      // Collect from active IoT sensors
      await this.updateIoTReadings();

      // Analyze threats
      await this.analyzeThreats();

      // Monitor critical resources
      await this.monitorCriticalResources();

      // Clean up expired alerts
      this.cleanupExpiredAlerts();
    } catch (error) {
      this.logger.error("Routine data collection failed:", error);
    }
  }

  private async updateIoTReadings() {
    for (const [deviceId, device] of this.sensorNetwork.entries()) {
      // Simulate new readings
      const newReading = this.generateMockReading(device.sensorType);
      await this.updateSensorReading(deviceId, newReading);
    }
  }

  private generateMockReading(sensorType: IoTSensorData["sensorType"]): number {
    const baseReadings = {
      seismic: () => Math.random() * 2 + 1, // 1-3 magnitude
      radiation: () => Math.random() * 0.05, // Low background
      weather: () => Math.random() * 30 + 10, // 10-40 km/h wind
      air_quality: () => Math.random() * 80 + 20, // 20-100 AQI
      water_quality: () => Math.random() * 2 + 6, // pH 6-8
      acoustic: () => Math.random() * 40 + 30, // 30-70 dB
      electromagnetic: () => Math.random() * 20 + 10, // 10-30 field units
    };

    return baseReadings[sensorType]();
  }

  private async monitorCriticalResources() {
    const criticalRegions = [
      "Middle East",
      "Sub-Saharan Africa",
      "Central Asia",
    ];

    for (const region of criticalRegions) {
      await this.monitorResources(region);
    }
  }

  private cleanupExpiredAlerts() {
    const now = new Date();
    for (const [alertId, alert] of this.activeAlerts.entries()) {
      if (alert.expiresAt < now) {
        this.activeAlerts.delete(alertId);
      }
    }
  }

  private async checkForAnomalies(device: IoTSensorData) {
    // Check if reading is anomalous compared to historical data
    if (device.status === "critical") {
      this.logger.warn(
        `Anomaly detected on device ${device.deviceId}: ${device.reading} ${device.unit}`,
      );

      // Could trigger immediate threat analysis
      await this.analyzeThreats(device.location.region);
    }
  }

  // Public API methods
  async getActiveAlerts(region?: string): Promise<ThreatAlert[]> {
    const alerts = Array.from(this.activeAlerts.values());

    if (region) {
      return alerts.filter((alert) =>
        alert.location.region.toLowerCase().includes(region.toLowerCase()),
      );
    }

    return alerts;
  }

  async getSensorStatus(region?: string): Promise<IoTSensorData[]> {
    const sensors = Array.from(this.sensorNetwork.values());

    if (region) {
      return sensors.filter((sensor) =>
        sensor.location.region.toLowerCase().includes(region.toLowerCase()),
      );
    }

    return sensors;
  }

  async getResourceStatus(region: string): Promise<ResourceMonitoring[]> {
    return this.monitorResources(region);
  }

  async triggerEmergencyAlert(
    type: ThreatAlert["type"],
    location: ThreatAlert["location"],
    description: string,
  ): Promise<string> {
    const alert: ThreatAlert = {
      id: `emergency_${Date.now()}`,
      type,
      severity: "critical",
      location,
      description,
      confidence: 100,
      sources: ["manual_trigger"],
      predictedImpact: {
        population: 10000,
        economicLoss: 1000000,
        environmentalDamage: "High",
      },
      recommendedActions: [
        "Immediate evacuation",
        "Deploy emergency response",
        "Contact international aid",
      ],
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
    };

    this.activeAlerts.set(alert.id, alert);
    this.logger.warn(`Emergency alert triggered: ${alert.id}`);

    return alert.id;
  }
}
