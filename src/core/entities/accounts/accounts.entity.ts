import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsEnum,
  validateSync,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';
import { CreateAccountInputDto } from './accounts.dtos';

export enum RoleEnum {
  ADMIN = 0,
  USER = 1,
}

const CPF_REGEX = /^\d{11}$/;

export class AccountEntity {
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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

  @IsString()
  @Matches(CPF_REGEX)
  @IsNotEmpty()
  cpf: string;

  @IsEnum(RoleEnum, { message: 'Role must be one of: (ADMIN, USER)' })
  @IsNotEmpty()
  role: RoleEnum;

  private constructor(
    name: string,
    email: string,
    password: string,
    cpf: string,
    role: RoleEnum,
    id?: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.role = role;
    this.id = id;

    const errors = validateSync(this);
    if (errors && errors.length) {
      // create a custom exception
      throw errors[0];
    }
  }

  static createAccount(createAccountInput: CreateAccountInputDto) {
    return new AccountEntity(
      createAccountInput.name,
      createAccountInput.email,
      createAccountInput.password,
      createAccountInput.cpf,
      createAccountInput.role === 0 ? RoleEnum.ADMIN : RoleEnum.USER,
      'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
    );
  }

  static buildExistentAccount(existentAccount: AccountEntity) {
    return new AccountEntity(
      existentAccount.name,
      existentAccount.email,
      existentAccount.password,
      existentAccount.cpf,
      existentAccount.role,
      existentAccount.id,
    );
  }
}
