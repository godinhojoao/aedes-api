import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AccountsResolver } from './../src/controllers/accounts/accounts.resolver';
import { AccountsUseCases } from './../src/application/accounts/accounts.use-cases';
import { AccountsRepository } from './../src/core/repositories/accounts.repository';
import { AccountsInMemoryRepository } from './../src/infra/repositories/accounts/accounts-in-memory-repository.service';

describe('Accounts Resolvers (e2e)', () => {
  let app: INestApplication;
  let createdAccountId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AccountsResolver,
        AccountsUseCases,
        {
          provide: AccountsRepository,
          useClass: AccountsInMemoryRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('findAccount', () => {
    it('Given valid input should return account', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `query findAccount ($input: FindAccountInputDto!) {
              findAccount (input: $input) {
                id
                name
                email
                cpf
                role
              }
            }`,
          variables: { input: { id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541' } },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.findAccount).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        role: 'ADMIN',
      });
    });

    it('Given invalid id should return validation error', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `query findAccount ($input: FindAccountInputDto!) {
              findAccount (input: $input) {
                id
                name
                email
                cpf
                role
              }
            }`,
          variables: { input: { id: '123' } },
        });
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'id must be a UUID',
          message: 'Bad Request Exception',
          path: ['findAccount'],
        },
      ]);
    });

    it('Given invalid cpf should return validation error', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `query findAccount ($input: FindAccountInputDto!) {
              findAccount (input: $input) {
                id
                name
                email
                cpf
                role
              }
            }`,
          variables: { input: { cpf: '123' } },
        });
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'cpf must match /^\\d{11}$/ regular expression',
          message: 'Bad Request Exception',
          path: ['findAccount'],
        },
      ]);
    });
  });

  describe('findAllAccounts', () => {
    it('Given findAllAccounts should return accounts', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `query findAllAccounts {
              findAllAccounts {
                id
                name
                email
                cpf
                role
              }
            }`,
          variables: { input: { id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541' } },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.findAllAccounts).toEqual([
        {
          cpf: '12345678900',
          email: 'john@example.com',
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
          name: 'John Doe',
          role: 'ADMIN',
        },
        {
          cpf: '98765432100',
          email: 'jane@example.com',
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
          name: 'Jane Smith',
          role: 'USER',
        },
        {
          cpf: '45678912300',
          email: 'bob@example.com',
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
          name: 'Bob Johnson',
          role: 'USER',
        },
      ]);
    });
  });

  describe('createAccount', () => {
    it('Given valid input should return created account', async () => {
      const createAccountInput = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'Demo@123',
        cpf: '91293252000',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation createAccount ($input: CreateAccountInputDto!) {
            createAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: createAccountInput },
        });
      createdAccountId = response.body.data.createAccount.id;
      expect(response.statusCode).toBe(200);
      expect(response.body.data.createAccount).toMatchObject({
        id: expect.any(String),
        name: 'test',
        email: 'test@gmail.com',
        cpf: '91293252000',
        role: 'USER',
      });
    });

    it('Given invalid cpf should return error', async () => {
      const createAccountInput = {
        name: 'test',
        email: 'test22@gmail.com',
        password: 'Demo@123',
        cpf: '91293252002233',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation createAccount ($input: CreateAccountInputDto!) {
            createAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: createAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'cpf must match /^\\d{11}$/ regular expression',
          message: 'Bad Request Exception',
          path: ['createAccount'],
        },
      ]);
    });

    it('Given invalid password should return error', async () => {
      const createAccountInput = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'invalidpass',
        cpf: '912932520022',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation createAccount ($input: CreateAccountInputDto!) {
            createAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: createAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          path: ['createAccount'],
          detailedMessage:
            'Password must contain at least: 5 characters, 1 number, 1 special char, 1 lowercase and 1 uppercase char.',
          message: 'Bad Request Exception',
        },
      ]);
    });

    it('Given invalid email should return error', async () => {
      const createAccountInput = {
        name: 'test',
        email: 'test',
        password: 'Demo@123',
        cpf: '35189233073',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation createAccount ($input: CreateAccountInputDto!) {
            createAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: createAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          path: ['createAccount'],
          detailedMessage: 'email must be an email',
          message: 'Bad Request Exception',
        },
      ]);
    });
  });

  describe('updateAccount', () => {
    it('Given valid input should return updated account', async () => {
      const updateAccountInput = {
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        password: 'Demo@123',
        cpf: '91293252000',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation updateAccount ($input: UpdateAccountInputDto!) {
            updateAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: updateAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.updateAccount).toMatchObject({
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        cpf: '91293252000',
        role: 'USER',
      });
    });

    it('Given invalid cpf should return error', async () => {
      const updateAccountInput = {
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        password: 'Demo@123',
        cpf: '9129325200033',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation updateAccount ($input: UpdateAccountInputDto!) {
            updateAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: updateAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'cpf must match /^\\d{11}$/ regular expression',
          message: 'Bad Request Exception',
          path: ['updateAccount'],
        },
      ]);
    });

    it('Given invalid password should return error', async () => {
      const updateAccountInput = {
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        password: 'daleinvalidpass',
        cpf: '03134515083',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation updateAccount ($input: UpdateAccountInputDto!) {
            updateAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: updateAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          path: ['updateAccount'],
          detailedMessage:
            'Password must contain at least: 5 characters, 1 number, 1 special char, 1 lowercase and 1 uppercase char.',
          message: 'Bad Request Exception',
        },
      ]);
    });

    it('Given invalid email should return error', async () => {
      const updateAccountInput = {
        id: createdAccountId,
        name: 'Demo@123',
        email: 'testing',
        password: 'daleinvalidpass',
        cpf: '03134515083',
        role: 'USER',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation updateAccount ($input: UpdateAccountInputDto!) {
            updateAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: updateAccountInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          path: ['updateAccount'],
          detailedMessage: 'email must be an email',
          message: 'Bad Request Exception',
        },
      ]);
    });
  });

  describe('removeAccount', () => {
    it('Given valid id should return removed account', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation removeAccount ($input: RemoveAccountInputDto!) {
            removeAccount (input: $input) {
              id
              name
              email
              cpf
              role
            }
          }`,
          variables: { input: { id: createdAccountId } },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.removeAccount).toMatchObject({
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        cpf: '91293252000',
        role: 'USER',
      });

      const noIdCall = () =>
        new AccountsInMemoryRepository().findOne({ id: createdAccountId });
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account found');
    });
  });
});
