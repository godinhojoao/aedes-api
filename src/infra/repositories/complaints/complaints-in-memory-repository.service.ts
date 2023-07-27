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
        createdAt: new Date(),
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
        createdAt: new Date(),
      },
      {
        id: '2c9d9294-b9b8-42de-99b1-7445377e3ca6',
        status: 2, // solved
        description: 'Focos de dengue em área de lazer',
        formattedAddress: 'Rua 7 de Setembro - Rua do Comércio 456',
        denunciatorId: '3142070b-bc40-4e88-b776-c8dd9d66a996',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua do Comércio',
          neighborhood: 'Centro',
          cep: '96400020',
          number: '456',
        },
        createdAt: new Date(),
      },
      {
        id: 'c192a8d7-383a-4c37-9c1c-bbd0431e3a2b',
        status: 1, // unsolved
        description: 'Piscina abandonada com risco de focos de dengue',
        formattedAddress: 'Rua dos Pinheiros, 567',
        denunciatorId: 'e799ad51-1c74-4f0c-9902-9296d12ef15e',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua dos Pinheiros',
          neighborhood: 'Jardim Primavera',
          cep: '96400120',
          number: '567',
        },
        createdAt: new Date(),
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
        createdAt: new Date(),
      },
      {
        id: 'd08375f0-846f-4c1f-88e7-96a6a2a77b50',
        status: 1, // unsolved
        description: 'Área de lazer precisa de limpeza para evitar dengue',
        formattedAddress: 'Rua das Palmeiras, 345',
        denunciatorId: '54c0e2c6-aa5b-40a6-8775-7cb8a6bf760c',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Palmeiras',
          neighborhood: 'Parque Residencial',
          cep: '96400250',
          number: '345',
        },
        createdAt: new Date(),
      },
      {
        id: '4912b8b9-99e9-4d47-b14e-cbdfda858570',
        status: 2, // solved
        description: 'Carro estacionado obstruindo a entrada da garagem',
        formattedAddress: 'Rua dos Lírios, 876',
        denunciatorId: '7d8f1c7c-9140-4b5f-b68a-5d3b8c72b21c',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua dos Lírios',
          neighborhood: 'Vila Nova',
          cep: '96400160',
          number: '876',
        },
        createdAt: new Date(),
      },
      {
        id: '2738b5a3-16f5-4d36-a469-1abec3cd93cd',
        status: 1, // unsolved
        description: 'Vazamento de água próximo à praça central',
        formattedAddress: 'Praça da Liberdade, s/n',
        denunciatorId: 'b42f1610-d3d7-446d-b95a-5bf1539f4bb1',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Praça da Liberdade',
          neighborhood: 'Centro',
          cep: '96400050',
          number: 's/n',
        },
        createdAt: new Date(),
      },
      {
        id: 'a8b4fc6c-7412-48e6-9b02-c7ff328e9ef7',
        status: 2, // solved
        description: 'Focos de dengue em terreno baldio',
        formattedAddress: 'Rua dos Ipês, 234',
        denunciatorId: 'a0f5d15c-86ef-4158-a1ce-24b3b365f7be',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua dos Ipês',
          neighborhood: 'Santa Terezinha',
          cep: '96400100',
          number: '234',
        },
        createdAt: new Date(),
      },
      {
        id: '7b3c9a95-42d5-4b4d-a1fb-0cb78d537320',
        status: 1, // unsolved
        description:
          'Terreno baldio com acúmulo de lixo e possível foco de dengue',
        formattedAddress: 'Rua das Magnólias, 789',
        denunciatorId: '705d71de-45a2-4c69-b8f3-c44d2d648197',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Magnólias',
          neighborhood: 'Floresta',
          cep: '96400110',
          number: '789',
        },
        createdAt: new Date(),
      },
      {
        id: '3d2d75c0-36b8-4c98-9cc9-5673cf64e3c5',
        status: 2, // solved
        description: 'Barulho excessivo após o horário permitido',
        formattedAddress: 'Rua das Begônias, 567',
        denunciatorId: '724de656-c95d-47fc-9e4f-b3ef74be4e64',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Begônias',
          neighborhood: 'Jardim das Flores',
          cep: '96400130',
          number: '567',
        },
        createdAt: new Date(),
      },
      {
        id: 'e17de4d1-61a5-4ff4-88de-d1cf09034db0',
        status: 1, // unsolved
        description: 'Entulho abandonado em área pública com risco de dengue',
        formattedAddress: 'Rua das Margaridas, 876',
        denunciatorId: 'a1d5bbd7-7df4-4f36-a63f-308ef3be49a1',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Margaridas',
          neighborhood: 'Jardim Primavera',
          cep: '96400140',
          number: '876',
        },
        createdAt: new Date(),
      },
      {
        id: 'e0c6d812-5c95-4b37-a66f-2b477b7469a6',
        status: 2, // solved
        description:
          'Esgoto a céu aberto na Rua das Violetas e possível foco de dengue',
        formattedAddress: 'Rua das Violetas, 123',
        denunciatorId: 'e71aa7fc-4af9-44ef-b6c4-5a58867ac309',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Violetas',
          neighborhood: 'Vila Nova',
          cep: '96400170',
          number: '123',
        },
        createdAt: new Date(),
      },
      {
        id: '3b5048dd-c3e6-43ce-ba42-eb0e09d88d10',
        status: 1, // unsolved
        description:
          'Rua esburacada no bairro São Judas com possíveis criadouros de dengue',
        formattedAddress: 'Rua das Azaleias, 567',
        denunciatorId: 'eaf79ef2-53e6-41bf-9063-3a1c01d5944f',
        location: {
          city: 'Bagé',
          id: 'a25a807b-2e5f-4c75-8f35-f042ff83b52f',
          state: 'RS',
          street: 'Rua das Azaleias',
          neighborhood: 'São Judas',
          cep: '96400280',
          number: '567',
        },
        createdAt: new Date(),
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
    return paginatedComplaints;
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
