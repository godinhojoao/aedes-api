import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsEnum,
} from 'class-validator';

export enum RoleEnum {
  ADMIN = 0,
  USER = 1,
}

export class AccountEntity {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Matches(/^(?:\d{3}\.){2}\d{3}-\d{2}$|^(?:\d{2}\.){2}\d{3}\/\d{4}-\d{2}$/)
  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum, { message: 'Role must be one of: (ADMIN, USER)' })
  role: RoleEnum;
}
