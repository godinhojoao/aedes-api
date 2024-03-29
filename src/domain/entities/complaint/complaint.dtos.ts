import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { StatusesEnum } from './complaint.entity';
import { Type } from 'class-transformer';

registerEnumType(StatusesEnum, {
  name: 'StatusesEnum',
});

// start ---> after i need to separate it
@InputType()
export abstract class LocationInputDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @Field()
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  @Length(8, 8, { message: 'CEP must be exactly 8 digits long' })
  cep: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  number: string;
}

@ObjectType()
export abstract class LocationToViewDto extends LocationInputDto {
  @Field()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @Field()
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  cep: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  number: string;
}
// end ---> after i need to separate it

@InputType()
export abstract class CreateComplaintInputDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationInputDto)
  @Field(() => LocationInputDto)
  location: LocationInputDto;

  @Field()
  @IsNotEmpty()
  @IsUUID('4')
  denunciatorId: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4')
  solverId?: string;

  @Field(() => StatusesEnum, { nullable: true })
  @IsOptional()
  @IsEnum(StatusesEnum, {
    message: 'Status must be one of: (WAITING, DOING , SOLVED, REJECTED)',
  })
  status?: StatusesEnum;
}

@InputType()
export abstract class UpdateComplaintInputDto {
  @Field()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationInputDto)
  @Field(() => LocationInputDto)
  location?: LocationInputDto;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4')
  solverId?: string;

  @Field({ nullable: true })
  @MaxLength(5000)
  @IsOptional()
  solverDescription?: string;

  @Field(() => StatusesEnum, { nullable: false })
  @IsNotEmpty()
  @IsEnum(StatusesEnum, {
    message: 'Status must be one of: (WAITING, DOING , SOLVED, REJECTED)',
  })
  status: StatusesEnum;

  @Field()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

@InputType()
export abstract class FindComplaintInputDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsUUID('4')
  public id: string;
}

@InputType()
export abstract class FindAllComplaintsInputDto {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4')
  denunciatorId?: string;
}

@ObjectType()
export abstract class ComplaintSolverToViewDto {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export abstract class ComplaintToViewDto {
  @Field()
  id: string;

  @Field(() => StatusesEnum)
  status: StatusesEnum;

  @Field(() => LocationToViewDto)
  location: LocationToViewDto;

  @Field(() => ComplaintSolverToViewDto, { nullable: true })
  solver?: ComplaintSolverToViewDto;

  @Field()
  denunciatorId: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  solverDescription: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export abstract class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}

@ObjectType()
export abstract class ComplaintItemToViewDto {
  @Field()
  id: string;

  @Field(() => StatusesEnum)
  status: StatusesEnum;

  @Field()
  description: string;

  @Field()
  denunciatorId: string;

  @Field({ nullable: true })
  solverDescription?: string;

  @Field()
  formattedAddress: string;

  @Field(() => LocationToViewDto)
  location: LocationToViewDto;

  @Field()
  createdAt: Date;
}

@ObjectType()
export abstract class PaginatedComplaintsToViewDto {
  @Field(() => [ComplaintItemToViewDto])
  items: ComplaintItemToViewDto[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
