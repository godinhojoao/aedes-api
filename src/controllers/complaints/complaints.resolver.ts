import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ComplaintsUseCases } from '../../application/complaints/complaints.use-cases';
import { JwtTokenPayload } from '../../domain/adapters/JwtAdapter';
import { Roles } from '../../core/decorators/Roles';
import {
  ComplaintToViewDto,
  CreateComplaintInputDto,
  FindAllComplaintsInputDto,
  FindComplaintInputDto,
  PaginatedComplaintsToViewDto,
  UpdateComplaintInputDto,
} from '../../domain/entities/complaint/complaint.dtos';

type AuthenticatedRequest = {
  account: JwtTokenPayload;
};
// @Context('req') req: AuthenticatedRequest // usar isso dentro de alguma func dps

@Resolver(() => ComplaintToViewDto)
export class ComplaintsResolver {
  constructor(private readonly complaintsUseCases: ComplaintsUseCases) {}

  @Mutation(() => ComplaintToViewDto)
  createComplaint(
    @Args('input') input: CreateComplaintInputDto,
  ): ComplaintToViewDto {
    return this.complaintsUseCases.create(input);
  }

  @Query(() => PaginatedComplaintsToViewDto)
  findAllComplaints(
    @Args('input') input: FindAllComplaintsInputDto,
  ): PaginatedComplaintsToViewDto {
    return this.complaintsUseCases.findAll(input);
  }

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
    const updatedComplaint = this.complaintsUseCases.update(input);
    return updatedComplaint;
  }
}
