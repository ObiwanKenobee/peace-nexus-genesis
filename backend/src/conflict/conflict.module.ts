import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConflictService } from "./conflict.service";
import { ConflictResolver } from "./conflict.resolver";
import { ConflictAlert } from "./entities/conflict-alert.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConflictAlert])],
  providers: [ConflictService, ConflictResolver],
  exports: [ConflictService],
})
export class ConflictModule {}
