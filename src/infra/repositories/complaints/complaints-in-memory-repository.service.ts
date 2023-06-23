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
  private complaints: ComplaintEntity[];

  constructor() {
    super();
    this.complaints = [];
  }

  count(): number {
    return this.complaints.length;
  }

  findAll(
    findAllComplaintsInput: FindAllComplaintsInputDto,
  ): ComplaintEntity[] {
    const startIndex = findAllComplaintsInput.offset;
    const endIndex =
      findAllComplaintsInput.offset + findAllComplaintsInput.limit;
    const paginatedComplaints = this.complaints.slice(startIndex, endIndex);
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
      this.complaints[index].status =
        updateComplaintInput.status || this.complaints[index].status;
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
