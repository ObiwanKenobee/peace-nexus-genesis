import { CreateUserInput } from "./create-user.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
