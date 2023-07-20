import {
  CreateComplaintInputDto,
  FindAllComplaintsInputDto,
  UpdateComplaintInputDto,
} from '../entities/complaint/complaint.dtos';
import { ComplaintEntity } from '../entities/complaint/complaint.entity';

export type FindOneInput = {
  id: string;
};

export abstract class ComplaintsRepository {
  abstract count(denunciatorId?: string): number;
  abstract findAll(
    findAllComplaintsInput: FindAllComplaintsInputDto,
  ): ComplaintEntity[];
  abstract update(
    updateComplaintInput: UpdateComplaintInputDto,
  ): ComplaintEntity;
  abstract create(
    createComplaintInput: CreateComplaintInputDto,
  ): ComplaintEntity;
  abstract findOne(input: FindOneInput): ComplaintEntity;
}
