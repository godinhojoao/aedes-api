import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AccountsInMemoryRepository } from './../src/infra/repositories/accounts/accounts-in-memory-repository.service';
import { userJwtToken } from './mocks/userJwtToken';
import { adminJwtToken } from './mocks/adminJwtToken';

describe('Accounts Resolver (e2e)', () => {
  let app: INestApplication;
  let createdAccountId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

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
        .set('Authorization', userJwtToken)
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
        .set('Authorization', userJwtToken)
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
        .set('Authorization', userJwtToken)
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
        .set('Authorization', userJwtToken)
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

  describe('deleteAccount', () => {
    it('Given valid id and invalid user jwt token should return error', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', userJwtToken)
        .send({
          query: `mutation deleteAccount ($input: DeleteAccountInputDto!) {
            deleteAccount (input: $input) {
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
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'FORBIDDEN',
          detailedMessage: 'Forbidden resource',
          message: 'Forbidden resource',
          path: ['deleteAccount'],
        },
      ]);
    });

    it('Given valid id and valid admin jwt token should return removed account', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `mutation deleteAccount ($input: DeleteAccountInputDto!) {
            deleteAccount (input: $input) {
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
      expect(response.body.data.deleteAccount).toMatchObject({
        id: createdAccountId,
        name: 'testing name e2e',
        email: 'test@gmail.com',
        cpf: '91293252000',
        role: 'USER',
      });

      const account = new AccountsInMemoryRepository().findOne({
        id: createdAccountId,
      });
      expect(account).toBe(null);
    });
  });

  describe('signIn', () => {
    it('Given valid email and password should return jwt token', async () => {
      const signInInput = {
        email: 'john@example.com',
        password: 'Demo@123',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation signIn ($input: SignInInputDto!) {
            signIn (input: $input) {
              token
              account {
                id
                name
                email
                cpf
                role
              }
            }
          }`,
          variables: { input: signInInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.signIn).toEqual({
        token: expect.any(String),
        account: {
          cpf: '12345678900',
          email: 'john@example.com',
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
          name: 'John Doe',
          role: 'ADMIN',
        },
      });
    });

    it('Given invalid email should return error', async () => {
      const signInInput = {
        email: 'testerror@example.com',
        password: 'Demo@123',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation signIn ($input: SignInInputDto!) {
            signIn (input: $input) {
              token
            }
          }`,
          variables: { input: signInInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'Invalid email or password.',
          message: 'Invalid email or password.',
          path: ['signIn'],
        },
      ]);
    });

    it('Given invalid password should return error', async () => {
      const signInInput = {
        email: 'john@example.com',
        password: 'invalid12',
      };
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation signIn ($input: SignInInputDto!) {
            signIn (input: $input) {
              token
            }
          }`,
          variables: { input: signInInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'BAD_REQUEST',
          detailedMessage: 'Invalid email or password.',
          message: 'Invalid email or password.',
          path: ['signIn'],
        },
      ]);
    });
  });
});
