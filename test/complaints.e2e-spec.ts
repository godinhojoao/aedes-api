import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { adminJwtToken } from './mocks/adminJwtToken';
import { userJwtToken } from './mocks/userJwtToken';

describe('Complaints Resolver (e2e)', () => {
  let app: INestApplication;
  let createdComplaintId: string;
  const validLocation = {
    cep: '12345-321',
    city: 'Bagé',
    neighborhood: 'Test neighborhood',
    number: '1000',
    state: 'RS',
    street: 'Test street',
  };
  const createComplaintInput = {
    status: 'WAITING',
    location: validLocation,
    denunciatorId: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
    description: 'Test complaint',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

  describe('createComplaint', () => {
    it('Given valid input should return created complaint', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `mutation createComplaint ($input: CreateComplaintInputDto!) {
            createComplaint (input: $input) {
              id
              status
              description
              solverDescription
              location {
                id
                city
                state
                street
                neighborhood
                cep
                number
              }
              solver {
                id
                name
                email
                cpf
                role
              }
              createdAt
              updatedAt
            }
          }`,
          variables: { input: createComplaintInput },
        });
      createdComplaintId = response.body.data.createComplaint.id;
      expect(response.statusCode).toBe(200);
      expect(response.body.data.createComplaint).toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        description: 'Test complaint',
        solverDescription: '',
        location: {
          cep: '12345-321',
          city: 'Bagé',
          id: expect.any(String),
          neighborhood: 'Test neighborhood',
          number: '1000',
          state: 'RS',
          street: 'Test street',
        },
        solver: null,
        status: 'WAITING',
        updatedAt: null,
      });
    });

    it('Given invalid accessToken that is not from an admin should return error', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', userJwtToken)
        .send({
          query: `mutation createComplaint ($input: CreateComplaintInputDto!) {
            createComplaint (input: $input) {
              id
            }
          }`,
          variables: { input: createComplaintInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'FORBIDDEN',
          path: ['createComplaint'],
          detailedMessage: 'Forbidden resource',
          message: 'Forbidden resource',
        },
      ]);
    });

    it('Given empty accessToken should return error', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .send({
          query: `mutation createComplaint ($input: CreateComplaintInputDto!) {
            createComplaint (input: $input) {
              id
            }
          }`,
          variables: { input: createComplaintInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBe(null);
      expect(response.body.errors).toEqual([
        {
          code: 'UNAUTHENTICATED',
          path: ['createComplaint'],
          detailedMessage: 'Unauthorized',
          message: 'Unauthorized',
        },
      ]);
    });
  });

  describe('updateComplaint', () => {
    it('Given valid input should return updated complaint', async () => {
      const updateComplaintInput = {
        id: createdComplaintId,
        solverId: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
        solverDescription: 'Updated solver description',
        status: 'SOLVED',
        updatedAt: new Date(),
      };

      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `mutation updateComplaint ($input: UpdateComplaintInputDto!) {
            updateComplaint (input: $input) {
              id
              status
              solverDescription
              description
              location {
                id
                city
                state
                street
                neighborhood
                cep
                number
              }
              solver {
                id
                name
                email
                cpf
                role
              }
              createdAt
              updatedAt
            }
          }`,
          variables: { input: updateComplaintInput },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.updateComplaint).toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        description: 'Test complaint',
        location: {
          cep: '12345-321',
          city: 'Bagé',
          id: expect.any(String),
          neighborhood: 'Test neighborhood',
          number: '1000',
          state: 'RS',
          street: 'Test street',
        },
        solver: null, // fix it
        solverDescription: 'Updated solver description',
        status: 'SOLVED',
        updatedAt: expect.any(String),
      });
    });
  });

  describe('findComplaint', () => {
    it('Given valid input should return complaint', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `query findComplaint ($input: FindComplaintInputDto!) {
            findComplaint (input: $input) {
              id
              status
              solverDescription
              description
              location {
                id
                city
                state
                street
                neighborhood
                cep
                number
              }
              solver {
                id
                name
                email
                cpf
                role
              }
              createdAt
              updatedAt
            }
          }`,
          variables: { input: { id: createdComplaintId } },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.findComplaint).toEqual({
        createdAt: expect.any(String),
        id: createdComplaintId,
        description: 'Test complaint',
        location: {
          cep: '12345-321',
          city: 'Bagé',
          id: expect.any(String),
          neighborhood: 'Test neighborhood',
          number: '1000',
          state: 'RS',
          street: 'Test street',
        },
        solver: null, // fix it
        solverDescription: 'Updated solver description',
        status: 'SOLVED',
        updatedAt: expect.any(String),
      });
    });
  });

  describe('findAllComplaints', () => {
    it('Given valid input should return paginated complaints [0]', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `query findAllComplaints ($input: FindAllComplaintsInputDto!) {
            findAllComplaints (input: $input) {
              items {
                id
                status
                description
                city
                createdAt
                formattedAddress
              }
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
            }
          }`,
          variables: { input: { offset: 0, limit: 1 } },
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.findAllComplaints.totalCount).toBe(1);
      expect(response.body.data.findAllComplaints.pageInfo).toEqual({
        hasNextPage: false,
        hasPreviousPage: false,
      });
      expect(response.body.data.findAllComplaints.items).toEqual([
        {
          createdAt: expect.any(String),
          id: createdComplaintId,
          city: 'Bagé',
          description: 'Test complaint',
          status: 'SOLVED',
          formattedAddress: 'Test neighborhood - Test street 1000',
        },
      ]);
    });

    it('Given valid input should return paginated complaints [1]', async () => {
      const response = await request(app.getHttpServer())
        .post(`/graphql`)
        .set('Authorization', adminJwtToken)
        .send({
          query: `query findAllComplaints ($input: FindAllComplaintsInputDto!) {
            findAllComplaints (input: $input) {
              items {
                id
                status
                description
                city
                createdAt
                formattedAddress
              }
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
            }
          }`,
          variables: { input: { offset: 0, limit: 0 } },
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.findAllComplaints.totalCount).toBe(1);
      expect(response.body.data.findAllComplaints.pageInfo).toEqual({
        hasNextPage: true,
        hasPreviousPage: false,
      });
      expect(response.body.data.findAllComplaints.items).toEqual([]);
    });
  });
});
