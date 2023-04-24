import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { RoleEnum } from './../../core/entities/accounts.entity';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@ObjectType()
export class Account {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  documentNumber: string;

  @Field(() => RoleEnum)
  role: RoleEnum;
}

@InputType()
export class CreateAccountInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  documentNumber: string;

  @Field(() => RoleEnum)
  role?: RoleEnum;
}

@InputType()
export class UpdateAccountInput {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  documentNumber?: string;

  @Field(() => RoleEnum)
  role?: RoleEnum;
}
