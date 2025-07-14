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
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string; // USD, PeaceCoin

  @Column()
  method: string; // credit_card, peacecoin

  @Column()
  tier: string; // free, pro, enterprise, peacepreneurs

  @Column({ default: "pending" })
  status: string; // pending, completed, failed, cancelled

  @Column({ nullable: true })
  externalId: string; // Stripe payment intent ID or blockchain transaction hash

  @Column({ nullable: true })
  subscriptionId: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ nullable: true })
  walletAddress: string; // For PeaceCoin payments

  @Column({ type: "json", nullable: true })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
