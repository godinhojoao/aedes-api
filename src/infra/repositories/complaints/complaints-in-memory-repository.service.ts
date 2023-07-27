/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ComplaintsRepository } from '../../../domain/repositories/complaints.repository';
import {
  ComplaintEntity,
  buildFormattedAddress,
} from '../../../domain/entities/complaint/complaint.entity';
import {
  FindAllComplaintsInputDto,
  UpdateComplaintInputDto,
} from '../../../domain/entities/complaint/complaint.dtos';

export type FindOneInput = {
  id: string;
};

function orderComplaintsByCreationDate(complaints: any[]) {
  if (!(complaints && complaints.length)) {
    return [];
  }
  const sortedComplaints = [...complaints];
  const compareCreatedAt = (complaint, nextComplaint): number => {
    const dateA = new Date(complaint.createdAt);
    const dateB = new Date(nextComplaint.createdAt);
    // @ts-ignore
    return dateB - dateA;
  };

  // @ts-ignore
  sortedComplaints.sort(compareCreatedAt);
  return sortedComplaints;
}
export class ComplaintsInMemoryRepository extends ComplaintsRepository {
  private complaints: ComplaintEntity[] = [];

  constructor() {
    super();
    // remove it after (just testing on frontend)
    this.complaints = [
      {
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
        status: 2, // solved
        description: 'Encontrei focos de dengue na casa do meu vizinho',
        formattedAddress: 'Getúlio Vargas - Rua Otávio Hipólito 1940',
        denunciatorId: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua Otávio Hipólito',
          neighborhood: 'Malafaia',
          cep: '96400090',
          number: '1940',
        },
        createdAt: new Date(
          'Thu Jul 27 2023 14:04:57 GMT-0300 (Brasilia Standard Time)',
        ),
      },
      {
        id: '1e29e7d1-05d7-4ab0-9d35-065de8b0670c',
        status: 1, // unsolved
        description: 'Suspeita de focos de dengue em terreno baldio',
        formattedAddress: 'Av. Brasil - Rua das Acácias 987',
        denunciatorId: 'db65413f-00de-41bf-a124-72b31f3d86a3',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Acácias',
          neighborhood: 'Centro',
          cep: '96400030',
          number: '987',
        },
        createdAt: new Date(
          'Thu Jul 27 2023 14:02:57 GMT-0300 (Brasilia Standard Time)',
        ),
      },
      {
        id: 'e9d88cfb-3bcf-4cfc-9d84-0d9d0cd0eafa',
        status: 2, // solved
        description: 'Cachorro abandonado com suspeita de dengue',
        formattedAddress: 'Praça da Amizade, s/n',
        denunciatorId: 'ad01c574-4af2-49ce-8ed6-59122b32a6a2',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Praça da Amizade',
          neighborhood: 'América',
          cep: '96400200',
          number: 's/n',
        },
        createdAt: new Date(
          'Thu Jul 27 2023 14:01:57 GMT-0300 (Brasilia Standard Time)',
        ),
      },
    ];
  }

  count(denunciatorId?: string): number {
    let complaints = this.complaints;
    if (denunciatorId) {
      complaints = complaints.filter((item) => {
        return item.denunciatorId === denunciatorId;
      });
    }
    return complaints.length;
  }

  findAll(
    findAllComplaintsInput: FindAllComplaintsInputDto,
  ): ComplaintEntity[] {
    const startIndex = findAllComplaintsInput.offset;
    const endIndex =
      findAllComplaintsInput.offset + findAllComplaintsInput.limit;
    let paginatedComplaints = this.complaints.slice(startIndex, endIndex);
    if (findAllComplaintsInput.denunciatorId) {
      paginatedComplaints = paginatedComplaints.filter((item) => {
        return item.denunciatorId === findAllComplaintsInput.denunciatorId;
      });
    }
    console.log(
      'orderComplaintsByCreationDate(paginatedComplaints)',
      orderComplaintsByCreationDate(paginatedComplaints),
    );
    return orderComplaintsByCreationDate(paginatedComplaints);
  }

  update(updateComplaintInput: UpdateComplaintInputDto): ComplaintEntity {
    const index = this.complaints.findIndex(
      (complaint) => complaint.id === updateComplaintInput.id,
    );
    if (index !== -1) {
      this.complaints[index].id = updateComplaintInput.id;
      this.complaints[index].solver = {
        id: updateComplaintInput.solverId || this.complaints[index].id,
        name:
          (this.complaints[index].solver &&
            this.complaints[index].solver.name) ||
          '2',
      };
      this.complaints[index].solverDescription =
        updateComplaintInput.solverDescription ||
        this.complaints[index].solverDescription ||
        '';
      this.complaints[index].description =
        updateComplaintInput.description ||
        this.complaints[index].description ||
        '';

      if (updateComplaintInput.location && this.complaints[index].location) {
        this.complaints[index].location = {
          ...this.complaints[index].location,
          ...updateComplaintInput.location,
        };
      }
      this.complaints[index].status = updateComplaintInput.status
        ? updateComplaintInput.status
        : this.complaints[index].status;
      this.complaints[index].updatedAt = updateComplaintInput.updatedAt;
      return this.complaints[index];
    }
    return null;
  }

  create(
    createComplaintInput: Omit<ComplaintEntity, 'formattedAddress'>,
  ): ComplaintEntity {
    const complaint = { ...createComplaintInput } as any;
    complaint.formattedAddress = buildFormattedAddress(
      createComplaintInput.location,
    );
    this.complaints.push(complaint);
    return complaint;
  }

  findOne(input: FindOneInput): ComplaintEntity {
    const complaint = this.complaints.find(
      (complaint) => complaint.id === input.id,
    );
    return complaint || null;
  }
}
