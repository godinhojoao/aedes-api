import { BadRequestException, Injectable } from '@nestjs/common';
import { HashAdapter } from '../../domain/adapters/HashAdapter';
import { ComplaintsRepository } from '../../domain/repositories/complaints.repository';
import { ComplaintEntity } from '../../domain/entities/complaint/complaint.entity';
import {
  ComplaintToViewDto,
  CreateComplaintInputDto,
  FindAllComplaintsInputDto,
  FindComplaintInputDto,
  PaginatedComplaintsToViewDto,
  UpdateComplaintInputDto,
} from '../../domain/entities/complaint/complaint.dtos';
import { ComplaintMapper } from './complaints.mappers';

@Injectable()
export class ComplaintsUseCases {
  constructor(
    private readonly complaintsRepository: ComplaintsRepository,
    private readonly hashAdapter: HashAdapter,
  ) {}

  findAll(input: FindAllComplaintsInputDto): PaginatedComplaintsToViewDto {
    const totalCount = this.complaintsRepository.count(input.denunciatorId);
    const complaints = this.complaintsRepository.findAll(input);

    return {
      items: ComplaintMapper.manyToView(complaints),
      pageInfo: {
        hasNextPage: input.offset + input.limit < totalCount,
        hasPreviousPage: input.offset > 0,
      },
      totalCount: totalCount,
    };
  }

  create(input: CreateComplaintInputDto): ComplaintToViewDto {
    const complaintEntity = ComplaintEntity.createComplaint(
      input,
      this.hashAdapter,
    );
    const createdComplaint = this.complaintsRepository.create(complaintEntity);
    return ComplaintMapper.toView(createdComplaint);
  }

  findOne(input: FindComplaintInputDto): ComplaintToViewDto {
    const complaint = this.complaintsRepository.findOne(input);
    if (!complaint) {
      throw new BadRequestException('No complaint found');
    }
    return ComplaintMapper.toView(complaint);
  }

  update(input: UpdateComplaintInputDto): ComplaintToViewDto {
    const updatedComplaint = this.complaintsRepository.update(input);
    const complaintEntity =
      ComplaintEntity.buildExistentComplaint(updatedComplaint);
    return ComplaintMapper.toView(complaintEntity);
  }
}
