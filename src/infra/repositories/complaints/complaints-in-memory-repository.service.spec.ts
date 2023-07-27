import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsInMemoryRepository } from './complaints-in-memory-repository.service';
import {
  ComplaintEntity,
  StatusesEnum,
  buildFormattedAddress,
} from '../../../domain/entities/complaint/complaint.entity';

const validLocation = {
  id: '1',
  cep: '12345321',
  city: 'Bagé',
  neighborhood: 'Test neighborhood',
  number: '1000',
  state: 'RS',
  street: 'Test street',
};

describe('ComplaintsInMemoryRepository', () => {
  let repository: ComplaintsInMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplaintsInMemoryRepository],
    }).compile();

    repository = module.get<ComplaintsInMemoryRepository>(
      ComplaintsInMemoryRepository,
    );
  });

  describe('create', () => {
    it('should create a new complaint', () => {
      const complaintInput = {
        id: '1',
        status: 0,
        location: validLocation,
        denunciatorId: '2',
        description: 'Test complaint',
        createdAt: new Date(),
        formattedAddress: buildFormattedAddress(validLocation),
      };

      const createdComplaint = repository.create(complaintInput);

      expect(createdComplaint).toEqual(complaintInput);
    });
  });

  describe('count', () => {
    it('should count zero complaints', () => {
      expect(repository.count()).toBe(0);
    });

    it('should count many complaints', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;
      expect(repository.count()).toBe(2);
    });

    it('should count many complaints filtering by denunciatorId', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;
      expect(repository.count('3')).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return complaints paginated [0]', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;

      const result = repository.findAll({ offset: 0, limit: 1 });

      expect(result).toEqual([complaints[0]]);
    });

    it('should return complaints paginated [1]', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;

      const result = repository.findAll({ offset: 1, limit: 1 });

      expect(result).toEqual([complaints[1]]);
    });

    it('should return complaints paginated [2]', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;

      const result = repository.findAll({ offset: 0, limit: 2 });

      expect(result).toEqual(complaints);
    });

    it('should return one complaint filtering by denunciatorId', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;

      const result = repository.findAll({
        offset: 0,
        limit: 999,
        denunciatorId: '3',
      });

      expect(result).toEqual([complaints[1]]);
    });

    it('should return zero complaints filtering by non existent denunciatorId', () => {
      const complaints: ComplaintEntity[] = [
        {
          id: '1',
          status: 0,
          location: validLocation,
          denunciatorId: '2',
          description: 'Complaint 1',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
        {
          id: '2',
          status: 1,
          location: validLocation,
          denunciatorId: '3',
          description: 'Complaint 2',
          createdAt: new Date(),
          formattedAddress: buildFormattedAddress(validLocation),
        },
      ];

      repository['complaints'] = complaints;

      const result = repository.findAll({
        offset: 0,
        limit: 999,
        denunciatorId: '32',
      });

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update the complaint if it exists', () => {
      const complaint = {
        id: '1',
        location: {
          id: '2',
          city: 'City',
          state: 'State',
          street: 'Street',
          neighborhood: 'Neighborhood',
          cep: '12345678',
          number: '123',
        },
        denunciatorId: '3',
        description: 'Complaint description',
        solverId: '4',
        status: StatusesEnum.WAITING,
        createdAt: new Date(),
        formattedAddress: buildFormattedAddress(validLocation),
        updatedAt: new Date(),
      };
      repository.create(complaint);

      const updateInput = {
        id: '1',
        solverId: '5',
        solverDescription: 'Updated solver description',
        status: StatusesEnum.SOLVED,
        updatedAt: new Date(),
        description: 'testing',
        location: {
          cep: '54321321',
          city: 'Bagé',
          neighborhood: 'Test neighborhood',
          number: '4321',
          state: 'RS',
          street: 'Test street',
        },
      };

      const updatedComplaint = repository.update(updateInput);

      expect(updatedComplaint).toEqual({
        createdAt: expect.any(Date),
        denunciatorId: '3',
        description: 'testing',
        id: '1',
        location: {
          id: '2',
          cep: '54321321',
          city: 'Bagé',
          neighborhood: 'Test neighborhood',
          number: '4321',
          state: 'RS',
          street: 'Test street',
        },
        solver: {
          id: '5',
          name: '2',
        },
        solverDescription: 'Updated solver description',
        solverId: '4',
        status: 2,
        updatedAt: expect.any(Date),
        formattedAddress: buildFormattedAddress(complaint.location),
      });
    });

    it('should return null if the complaint does not exist', () => {
      const updateInput = {
        id: '200',
        solverId: '5',
        solverDescription: 'Updated solver description',
        status: StatusesEnum.SOLVED,
        updatedAt: new Date(),
        location: {
          cep: '54321321',
          city: 'Bagé',
          neighborhood: 'Test neighborhood',
          number: '4321',
          state: 'RS',
          street: 'Test street',
        },
      };

      const updatedComplaint = repository.update(updateInput);
      expect(updatedComplaint).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return the complaint with the given id', () => {
      const complaint: ComplaintEntity = {
        id: '1',
        status: 0,
        location: validLocation,
        denunciatorId: '2',
        description: 'Test complaint',
        createdAt: new Date(),
        formattedAddress: buildFormattedAddress(validLocation),
      };

      repository['complaints'] = [complaint];

      const foundComplaint = repository.findOne({ id: '1' });

      expect(foundComplaint).toEqual(complaint);
    });

    it('should return null if the complaint with the given id does not exist', () => {
      const foundComplaint = repository.findOne({ id: '1' });

      expect(foundComplaint).toBeNull();
    });
  });
});
