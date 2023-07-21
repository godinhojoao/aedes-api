import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ComplaintsUseCases } from '../../application/complaints/complaints.use-cases';
import { JwtTokenPayload } from '../../domain/adapters/JwtAdapter';
import { Roles } from '../../core/decorators/Roles';
import { SkipAuthentication } from '../../core/decorators/SkipAuthentication';
import {
  ComplaintToViewDto,
  CreateComplaintInputDto,
  FindAllComplaintsInputDto,
  FindComplaintInputDto,
  PaginatedComplaintsToViewDto,
  UpdateComplaintInputDto,
} from '../../domain/entities/complaint/complaint.dtos';
import { Type } from 'class-transformer';

type AuthenticatedRequest = {
  account: JwtTokenPayload;
};
// @Context('req') req: AuthenticatedRequest // usar isso dentro de alguma func dps

@Resolver(() => ComplaintToViewDto)
export class ComplaintsResolver {
  constructor(private readonly complaintsUseCases: ComplaintsUseCases) {}

  @Roles('ADMIN')
  @Mutation(() => ComplaintToViewDto)
  createComplaint(
    @Args('input') input: CreateComplaintInputDto,
  ): ComplaintToViewDto {
    return this.complaintsUseCases.create(input);
  }

  @Roles('ADMIN')
  @Query(() => PaginatedComplaintsToViewDto)
  findAllComplaints(
    @Args('input') input: FindAllComplaintsInputDto,
  ): PaginatedComplaintsToViewDto {
    return this.complaintsUseCases.findAll(input);
  }

  @Roles('ADMIN')
  @Query(() => ComplaintToViewDto)
  findComplaint(
    @Args('input') input: FindComplaintInputDto,
  ): ComplaintToViewDto {
    const account = this.complaintsUseCases.findOne(input);
    return account;
  }

  @Roles('ADMIN')
  @Mutation(() => ComplaintToViewDto)
  updateComplaint(
    @Args('input') input: UpdateComplaintInputDto,
  ): ComplaintToViewDto {
    // use the req here to get solver id, and remove from input
    return this.complaintsUseCases.update(input);
  }
}
