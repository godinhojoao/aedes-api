import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsRepository } from '../../domain/repositories/complaints.repository';
import { ComplaintsInMemoryRepository } from '../../infra/repositories/complaints/complaints-in-memory-repository.service';
import { HashAdapter } from '../../domain/adapters/HashAdapter';
import { CryptoHashAdapter } from '../../infra/adapters/crypto/CryptoHashAdapter';
import { ComplaintsUseCases } from './complaints.use-cases';
import { StatusesEnum } from '../../domain/entities/complaint/complaint.entity';
import { BadRequestException } from '@nestjs/common';

let createdComplaint = null;
const validLocation = {
  cep: '12345-321',
  city: 'Bagé',
  neighborhood: 'Test neighborhood',
  number: '1000',
  state: 'RS',
  street: 'Test street',
};
const createComplaintInput = {
  id: '1',
  status: 0,
  location: validLocation,
  denunciatorId: '2',
  description: 'Test complaint',
  createdAt: new Date(),
};

describe('ComplaintsUseCases', () => {
  let service: ComplaintsUseCases;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplaintsUseCases,
        {
          provide: ComplaintsRepository,
          useClass: ComplaintsInMemoryRepository,
        },
        {
          provide: HashAdapter,
          useClass: CryptoHashAdapter,
        },
      ],
    }).compile();

    service = module.get<ComplaintsUseCases>(ComplaintsUseCases);
    createdComplaint = service.create(createComplaintInput);
  });

  describe('create', () => {
    it('Given valid input should create a complaint', () => {
      const createdComplaint = service.create(createComplaintInput);
      expect(createdComplaint).toEqual({
        createdAt: expect.any(Date),
        id: expect.any(String),
        description: 'Test complaint',
        solverDescription: '',
        location: {
          id: expect.any(String),
          cep: '12345-321',
          city: 'Bagé',
          neighborhood: 'Test neighborhood',
          number: '1000',
          state: 'RS',
          street: 'Test street',
        },
        solver: null,
        status: 0,
        updatedAt: null,
      });
    });
  });

  describe('findAll', () => {
    it('Should find all complaints paginated [0]', () => {
      const result = service.findAll({ limit: 2, offset: 0 });
      expect(result).toEqual({
        items: [
          {
            city: 'Bagé',
            createdAt: expect.any(Date),
            formattedAddress: 'Test neighborhood - Test street 1000',
            description: 'Test complaint',
            id: expect.any(String),
            status: 0,
          },
          {
            city: 'Bagé',
            createdAt: expect.any(Date),
            formattedAddress: 'Test neighborhood - Test street 1000',
            description: 'Test complaint',
            id: expect.any(String),
            status: 0,
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
        totalCount: 2,
      });
    });

    it('Should find all complaints paginated [1]', () => {
      const result = service.findAll({ limit: 1, offset: 1 });
      expect(result).toEqual({
        items: [
          {
            city: 'Bagé',
            createdAt: expect.any(Date),
            formattedAddress: 'Test neighborhood - Test street 1000',
            id: expect.any(String),
            description: 'Test complaint',
            status: 0,
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: true,
        },
        totalCount: 2,
      });
    });

    it('Should find all complaints paginated [2]', () => {
      const result = service.findAll({ limit: 1, offset: 0 });
      expect(result).toEqual({
        items: [
          {
            city: 'Bagé',
            createdAt: expect.any(Date),
            formattedAddress: 'Test neighborhood - Test street 1000',
            description: 'Test complaint',
            id: expect.any(String),
            status: 0,
          },
        ],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
        totalCount: 2,
      });
    });
  });

  describe('findOne', () => {
    it('Given valid id should find a complaint', () => {
      const complaint = service.findOne({ id: createdComplaint.id });
      expect(complaint).toEqual(createdComplaint);
    });

    it('Given inexistent id should return BadRequestException', () => {
      const noServiceIdCall = () => service.findOne({ id: '12' });
      expect(noServiceIdCall).toThrowError(BadRequestException);
      expect(noServiceIdCall).toThrowError('No complaint found');
    });
  });

  describe('update', () => {
    it('Given valid id should find a complaint', () => {
      const updateComplaintInput = {
        id: createdComplaint.id,
        solverId: '5',
        solverDescription: 'Updated solver description',
        status: StatusesEnum.SOLVED,
        updatedAt: new Date(),
      };
      const updatedComplaint = service.update(updateComplaintInput);

      expect(updatedComplaint).toEqual({
        description: 'Test complaint',
        solverDescription: 'Updated solver description',
        createdAt: expect.any(Date),
        id: createdComplaint.id,
        location: {
          id: expect.any(String),
          cep: '12345-321',
          city: 'Bagé',
          neighborhood: 'Test neighborhood',
          number: '1000',
          state: 'RS',
          street: 'Test street',
        },
        solver: {
          id: '5',
          name: '2',
        },
        status: 2,
        updatedAt: expect.any(Date),
      });
    });
  });
});
