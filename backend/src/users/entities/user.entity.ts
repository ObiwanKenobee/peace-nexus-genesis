import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import { MediationSession } from "../../mediation/entities/mediation-session.entity";
import { PeaceCoinTransaction } from "../../peacecoin/entities/peacecoin-transaction.entity";

@ObjectType()
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  languages: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  timezone?: string;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  specializations: string[];

  @Field(() => Float, { defaultValue: 0 })
  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  peaceCoinBalance: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ default: 0 })
  reputationScore: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ default: 0 })
  mediationCount: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ default: 0 })
  successfulMediations: number;

  @Field(() => Float, { defaultValue: 0 })
  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  empathyScore: number;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  certifications: string[];

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isModerator: boolean;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  roles: string[];

  @Field({ defaultValue: "free" })
  @Column({ default: "free" })
  tier: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tierUpdatedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Field(() => [MediationSession], { nullable: true })
  @OneToMany(() => MediationSession, (session) => session.mediator)
  mediatedSessions?: MediationSession[];

  @Field(() => [MediationSession], { nullable: true })
  @ManyToMany(() => MediationSession, (session) => session.participants)
  @JoinTable()
  participatedSessions?: MediationSession[];

  @Field(() => [PeaceCoinTransaction], { nullable: true })
  @OneToMany(() => PeaceCoinTransaction, (transaction) => transaction.user)
  peaceCoinTransactions?: PeaceCoinTransaction[];
}
