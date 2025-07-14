import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import {
  ObjectType,
  Field,
  ID,
  Int,
  Float,
  registerEnumType,
} from "@nestjs/graphql";

export enum ThreatLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ConflictType {
  RESOURCE = "RESOURCE",
  TERRITORIAL = "TERRITORIAL",
  ETHNIC = "ETHNIC",
  RELIGIOUS = "RELIGIOUS",
  POLITICAL = "POLITICAL",
  ECONOMIC = "ECONOMIC",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  CYBER = "CYBER",
  OTHER = "OTHER",
}

export enum AlertStatus {
  ACTIVE = "ACTIVE",
  MONITORING = "MONITORING",
  RESOLVED = "RESOLVED",
  ESCALATED = "ESCALATED",
  DISMISSED = "DISMISSED",
}

registerEnumType(ThreatLevel, { name: "ThreatLevel" });
registerEnumType(ConflictType, { name: "ConflictType" });
registerEnumType(AlertStatus, { name: "AlertStatus" });

@ObjectType()
@Entity("conflict_alerts")
export class ConflictAlert {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 7 })
  latitude: number;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 7 })
  longitude: number;

  @Field(() => ThreatLevel)
  @Column({ type: "enum", enum: ThreatLevel })
  threatLevel: ThreatLevel;

  @Field(() => ConflictType)
  @Column({ type: "enum", enum: ConflictType })
  conflictType: ConflictType;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  confidence: number;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  signals: string[];

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  dataSources: string[];

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  affectedPopulations: string[];

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  estimatedAffected?: number;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  potentialCauses: string[];

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  recommendations: string[];

  @Field(() => AlertStatus)
  @Column({ type: "enum", enum: AlertStatus, default: AlertStatus.ACTIVE })
  status: AlertStatus;

  @Field(() => Int)
  @Column({ type: "int", default: 1 })
  priority: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  escalatedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resolvedAt?: Date;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  tags: string[];

  @Field(() => Float, { nullable: true })
  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  economicImpact?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  mediaAttention?: number;

  @Field(() => Float, { nullable: true })
  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  socialMediaSentiment?: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  aiAnalysis?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastUpdated?: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
