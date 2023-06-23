import {
  ComplaintEntity,
  StatusesEnum,
  buildFormattedAddress,
} from './complaint.entity';
import { CryptoHashAdapter } from '../../../infra/adapters/crypto/CryptoHashAdapter';

const validExistentComplaint = {
  id: 'vamo dale',
  status: StatusesEnum.WAITING,
  location: {
    id: 'location-id',
    city: 'Example City',
    state: 'Example State',
    street: 'Example Street',
    neighborhood: 'Example Neighborhood',
    cep: '12345-678',
    number: '123',
  },
  denunciatorId: 'denunciator-id',
  description: 'Example complaint description',
  solver: {
    id: 'solver-id',
    name: 'Example Solver',
  },
  solverDescription: 'Example solver description',
  updatedAt: new Date(),
  createdAt: new Date(),
};

const validNewComplaint = {
  location: {
    city: 'Example City',
    state: 'Example State',
    street: 'Example Street',
    neighborhood: 'Example Neighborhood',
    cep: '12345-678',
    number: '123',
  },
  denunciatorId: 'denunciator-id',
  description: 'Example complaint description',
};

describe('ComplaintEntity', () => {
  const cryptoHashAdapter = new CryptoHashAdapter();

  describe('createComplaint', () => {
    it('Given valid infos should create complaint', () => {
      const createdComplaint = ComplaintEntity.createComplaint(
        validNewComplaint,
        cryptoHashAdapter,
      );
      expect(createdComplaint).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        solver: null,
        solverDescription: '',
        status: 0,
        updatedAt: null,
        ...validNewComplaint,
        location: {
          ...validNewComplaint.location,
          id: expect.any(String),
        },
        formattedAddress: buildFormattedAddress(validNewComplaint.location),
      });
    });
  });

  describe('buildExistentComplaint', () => {
    it('Given valid infos should build existent complaint', () => {
      const complaint = ComplaintEntity.buildExistentComplaint(
        validExistentComplaint,
      );
      expect(complaint).toEqual({
        ...validExistentComplaint,
        formattedAddress: buildFormattedAddress(
          validExistentComplaint.location,
        ),
      });
    });
  });
});
