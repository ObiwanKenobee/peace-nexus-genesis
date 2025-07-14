import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @Column()
  tier: string; // pro, enterprise, peacepreneurs

  @Column({ default: "pending" })
  status: string; // pending, active, cancelled, expired

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string; // USD, PeaceCoin

  @Column({ nullable: true })
  externalId: string; // Stripe subscription ID

  @Column({ nullable: true })
  walletAddress: string; // For PeaceCoin subscriptions

  @Column({ type: "timestamp", nullable: true })
  nextBillingDate: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelledAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiredAt: Date;

  @Column({ type: "json", nullable: true })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
