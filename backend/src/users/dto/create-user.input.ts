import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
} from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @Field({ nullable: true })
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  region?: string;

  @Field({ nullable: true })
  @IsOptional()
  timezone?: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsOptional()
  specializations?: string[];
}
