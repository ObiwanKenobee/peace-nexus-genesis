import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: [
        "mediatedSessions",
        "participatedSessions",
        "peaceCoinTransactions",
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isActive: true },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserInput);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  async updatePeaceCoinBalance(userId: string, amount: number): Promise<User> {
    const user = await this.findOne(userId);
    user.peaceCoinBalance = Number(user.peaceCoinBalance) + amount;
    return this.userRepository.save(user);
  }

  async updateReputationScore(userId: string, change: number): Promise<User> {
    const user = await this.findOne(userId);
    user.reputationScore = Math.max(0, user.reputationScore + change);
    return this.userRepository.save(user);
  }

  async updateEmpathyScore(userId: string, newScore: number): Promise<User> {
    const user = await this.findOne(userId);
    user.empathyScore = newScore;
    return this.userRepository.save(user);
  }

  async incrementMediationStats(
    userId: string,
    successful: boolean,
  ): Promise<User> {
    const user = await this.findOne(userId);
    user.mediationCount += 1;
    if (successful) {
      user.successfulMediations += 1;
    }
    return this.userRepository.save(user);
  }

  async findMediators(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        isActive: true,
        roles: { like: "%mediator%" },
      },
      order: { reputationScore: "DESC" },
    });
  }

  async findByLanguage(language: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.isActive = :isActive", { isActive: true })
      .andWhere(":language = ANY(user.languages)", { language })
      .orderBy("user.reputationScore", "DESC")
      .getMany();
  }

  async findBySpecialization(specialization: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.isActive = :isActive", { isActive: true })
      .andWhere(":specialization = ANY(user.specializations)", {
        specialization,
      })
      .orderBy("user.reputationScore", "DESC")
      .getMany();
  }

  async getLeaderboard(limit = 10): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
      order: { reputationScore: "DESC" },
      take: limit,
    });
  }
}
