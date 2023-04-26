import { AccountEntity, RoleEnum } from './accounts.entity';

export type CreateAccountInputDto = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  role?: RoleEnum;
};

export type UpdateAccountInputDto = Partial<AccountEntity> & {
  id: string;
};

export type AccountToViewDto = Omit<AccountEntity, 'password'>;
