import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  ConflictAlert,
  ThreatLevel,
  AlertStatus,
} from "./entities/conflict-alert.entity";
import { CreateConflictAlertInput } from "./dto/create-conflict-alert.input";
import { UpdateConflictAlertInput } from "./dto/update-conflict-alert.input";

@Injectable()
export class ConflictService {
  constructor(
    @InjectRepository(ConflictAlert)
    private readonly conflictAlertRepository: Repository<ConflictAlert>,
  ) {}

  async create(
    createConflictAlertInput: CreateConflictAlertInput,
  ): Promise<ConflictAlert> {
    const alert = this.conflictAlertRepository.create(createConflictAlertInput);
    return this.conflictAlertRepository.save(alert);
  }

  async findAll(): Promise<ConflictAlert[]> {
    return this.conflictAlertRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  async findActive(): Promise<ConflictAlert[]> {
    return this.conflictAlertRepository.find({
      where: { status: AlertStatus.ACTIVE },
      order: { priority: "DESC", threatLevel: "DESC" },
    });
  }

  async findByThreatLevel(threatLevel: ThreatLevel): Promise<ConflictAlert[]> {
    return this.conflictAlertRepository.find({
      where: { threatLevel },
      order: { createdAt: "DESC" },
    });
  }

  async findByRegion(region: string): Promise<ConflictAlert[]> {
    return this.conflictAlertRepository.find({
      where: { region },
      order: { threatLevel: "DESC", createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<ConflictAlert> {
    const alert = await this.conflictAlertRepository.findOne({
      where: { id },
    });

    if (!alert) {
      throw new NotFoundException(`Conflict alert with ID ${id} not found`);
    }

    return alert;
  }

  async update(
    id: string,
    updateConflictAlertInput: UpdateConflictAlertInput,
  ): Promise<ConflictAlert> {
    const alert = await this.findOne(id);
    Object.assign(alert, updateConflictAlertInput);
    alert.lastUpdated = new Date();
    return this.conflictAlertRepository.save(alert);
  }

  async escalate(id: string): Promise<ConflictAlert> {
    const alert = await this.findOne(id);
    alert.status = AlertStatus.ESCALATED;
    alert.escalatedAt = new Date();
    alert.priority = Math.min(alert.priority + 1, 5);
    return this.conflictAlertRepository.save(alert);
  }

  async resolve(id: string): Promise<ConflictAlert> {
    const alert = await this.findOne(id);
    alert.status = AlertStatus.RESOLVED;
    alert.resolvedAt = new Date();
    return this.conflictAlertRepository.save(alert);
  }

  async dismiss(id: string): Promise<ConflictAlert> {
    const alert = await this.findOne(id);
    alert.status = AlertStatus.DISMISSED;
    return this.conflictAlertRepository.save(alert);
  }

  async getGlobalThreatLevel(): Promise<{ level: ThreatLevel; count: number }> {
    const activeAlerts = await this.findActive();
    const highThreats = activeAlerts.filter(
      (a) =>
        a.threatLevel === ThreatLevel.HIGH ||
        a.threatLevel === ThreatLevel.CRITICAL,
    );

    if (highThreats.length > 5) {
      return { level: ThreatLevel.CRITICAL, count: highThreats.length };
    } else if (highThreats.length > 2) {
      return { level: ThreatLevel.HIGH, count: highThreats.length };
    } else if (activeAlerts.length > 10) {
      return { level: ThreatLevel.MEDIUM, count: activeAlerts.length };
    } else {
      return { level: ThreatLevel.LOW, count: activeAlerts.length };
    }
  }

  async getRegionStats(): Promise<any[]> {
    const result = await this.conflictAlertRepository
      .createQueryBuilder("alert")
      .select("alert.region")
      .addSelect("COUNT(*)", "total")
      .addSelect("AVG(alert.confidence)", "avgConfidence")
      .addSelect("MAX(alert.threatLevel)", "maxThreat")
      .where("alert.status != :dismissed", { dismissed: AlertStatus.DISMISSED })
      .groupBy("alert.region")
      .orderBy("total", "DESC")
      .getRawMany();

    return result;
  }

  async getTrendAnalysis(): Promise<any> {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recent = await this.conflictAlertRepository.count({
      where: { createdAt: { $gte: last30Days } as any },
    });

    const previousPeriod = new Date();
    previousPeriod.setDate(previousPeriod.getDate() - 60);

    const previous = await this.conflictAlertRepository.count({
      where: {
        createdAt: {
          $gte: previousPeriod,
          $lt: last30Days,
        } as any,
      },
    });

    const trend = previous > 0 ? ((recent - previous) / previous) * 100 : 0;

    return {
      current: recent,
      previous,
      trend: Math.round(trend * 100) / 100,
    };
  }
}
