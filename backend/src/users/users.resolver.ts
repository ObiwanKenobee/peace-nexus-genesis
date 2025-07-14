import { Resolver, Query, Mutation, Args, ID, Int } from "@nestjs/graphql";
import { UseGuards, ForbiddenException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: "me" })
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => [User], { name: "mediators" })
  @UseGuards(JwtAuthGuard)
  findMediators() {
    return this.usersService.findMediators();
  }

  @Query(() => [User], { name: "usersByLanguage" })
  @UseGuards(JwtAuthGuard)
  findByLanguage(@Args("language") language: string) {
    return this.usersService.findByLanguage(language);
  }

  @Query(() => [User], { name: "usersBySpecialization" })
  @UseGuards(JwtAuthGuard)
  findBySpecialization(@Args("specialization") specialization: string) {
    return this.usersService.findBySpecialization(specialization);
  }

  @Query(() => [User], { name: "leaderboard" })
  getLeaderboard(
    @Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.usersService.getLeaderboard(limit);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    // Users can only update their own profile or moderators can update any
    if (id !== currentUser.id && !currentUser.isModerator) {
      throw new ForbiddenException("You can only update your own profile");
    }
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  removeUser(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ) {
    if (!currentUser.isModerator) {
      throw new ForbiddenException("Only moderators can remove users");
    }
    return this.usersService.remove(id);
  }
}
