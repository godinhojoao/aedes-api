import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CPF_REGEX, RoleEnum } from './account.entity';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@InputType()
export abstract class CreateAccountInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 5,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must contain at least: 5 characters, 1 number, 1 special char, 1 lowercase and 1 uppercase char.',
    },
  )
  password: string;

  @Field()
  @IsString()
  @Matches(CPF_REGEX)
  @IsNotEmpty()
  cpf: string;

  @Field(() => RoleEnum, { nullable: true })
  @IsOptional()
  @IsEnum(RoleEnum, { message: 'Role must be one of: (ADMIN, USER)' })
  role?: RoleEnum;
}

@InputType()
export abstract class UpdateAccountInputDto {
  @Field()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 5,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must contain at least: 5 characters, 1 number, 1 special char, 1 lowercase and 1 uppercase char.',
    },
  )
  password: string;

  @Field()
  @IsString()
  @Matches(CPF_REGEX)
  @IsNotEmpty()
  cpf: string;

  @Field(() => RoleEnum)
  @IsEnum(RoleEnum, { message: 'Role must be one of: (ADMIN, USER)' })
  @IsNotEmpty()
  role: RoleEnum;
}

@InputType()
export abstract class FindAccountInputDto {
  @Field({ nullable: true })
  @ValidateIf((input) => !input.cpf && !input.email)
  @IsNotEmpty()
  @IsUUID('4')
  public id?: string;

  @Field({ nullable: true })
  @ValidateIf((input) => !input.id && !input.email)
  @IsNotEmpty()
  @IsString()
  @Matches(CPF_REGEX)
  public cpf?: string;

  @Field({ nullable: true })
  @ValidateIf((input) => !input.id && !input.cpf)
  @IsNotEmpty()
  @IsEmail()
  public email?: string;
}

@InputType()
export abstract class RemoveAccountInputDto {
  @Field()
  @IsNotEmpty()
  @IsUUID('4')
  public id: string;
}

@InputType()
export abstract class SignInInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export abstract class AccountToViewDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field(() => RoleEnum)
  role: RoleEnum;
}

@ObjectType()
export abstract class SignInResultDto {
  @Field()
  token: string;

  @Field(() => AccountToViewDto)
  account: AccountToViewDto;
}
