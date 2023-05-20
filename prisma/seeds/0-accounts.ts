import { PrismaClient, AccountRoles } from '@prisma/client';

export function seedAccounts(prisma: PrismaClient) {
  return prisma.account.createMany({
    data: [
      {
        id: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
        email: 'user@example.com',
        name: 'User',
        password: 'password1',
        cpf: '12345678901',
        role: AccountRoles.USER,
      },
      {
        id: 'cb990219-5c84-4f59-83ae-30f87f08d1a0',
        email: 'admin@example.com',
        name: 'Admin',
        password: 'password2',
        cpf: '12345678902',
        role: AccountRoles.ADMIN,
      },
    ],
  });
}
