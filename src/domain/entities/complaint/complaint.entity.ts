import { AccountToViewDto } from '../account/account.dtos';
import { CreateComplaintInputDto, LocationInputDto } from './complaint.dtos';
import { HashAdapter } from '../../../domain/adapters/HashAdapter';

export function buildFormattedAddress(location: LocationInputDto): string {
  return `${location.neighborhood} - ${location.street} ${location.number}`;
}

export enum StatusesEnum {
  WAITING = 0,
  DOING = 1,
  SOLVED = 2,
  REJECTED = 3,
}

export class ComplaintEntity {
  public id: string;
  public status: StatusesEnum;
  public location: LocationInputDto; // change after
  public denunciatorId: string;
  public description: string;
  public formattedAddress: string;
  public solver?: Pick<AccountToViewDto, 'name' | 'id'>;
  public solverDescription?: string;
  public updatedAt?: Date;
  public createdAt: Date;

  private constructor(input: Omit<ComplaintEntity, 'formattedAddress'>) {
    this.id = input.id;
    this.status = input.status;
    this.location = input.location;
    this.denunciatorId = input.denunciatorId;
    this.description = input.description;
    this.solver = input.solver;
    this.formattedAddress = buildFormattedAddress(input.location);
    this.solverDescription = input.solverDescription;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  static createComplaint(
    createComplaintInput: CreateComplaintInputDto,
    hashAdapter: HashAdapter,
  ) {
    createComplaintInput.location.id = hashAdapter.generateRandomUUID();
    return new ComplaintEntity({
      id: hashAdapter.generateRandomUUID(),
      status: createComplaintInput.status || StatusesEnum.WAITING,
      location: createComplaintInput.location,
      denunciatorId: createComplaintInput.denunciatorId,
      description: createComplaintInput.description,
      solver: null,
      solverDescription: '',
      createdAt: new Date(),
      updatedAt: null,
    });
  }

  static buildExistentComplaint(
    existentComplaint: Omit<ComplaintEntity, 'formattedAddress'>,
  ) {
    return new ComplaintEntity({
      id: existentComplaint.id,
      status: existentComplaint.status,
      location: existentComplaint.location,
      denunciatorId: existentComplaint.denunciatorId,
      description: existentComplaint.description,
      solver: existentComplaint.solver,
      solverDescription: existentComplaint.solverDescription,
      createdAt: existentComplaint.createdAt,
      updatedAt: existentComplaint.updatedAt,
    });
  }
}
