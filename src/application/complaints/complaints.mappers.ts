import { ComplaintEntity } from '../../domain/entities/complaint/complaint.entity';
import {
  ComplaintItemToViewDto,
  ComplaintToViewDto,
} from '../../domain/entities/complaint/complaint.dtos';

export class ComplaintMapper {
  public static toView(complaint: ComplaintEntity): ComplaintToViewDto {
    return {
      id: complaint.id,
      status: complaint.status,
      location: complaint.location as any, // fix after
      solver: complaint.solver || null,
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
      description: complaint.description,
      solverDescription: complaint.solverDescription,
    };
  }

  public static manyToView(
    complaints: ComplaintEntity[],
  ): ComplaintItemToViewDto[] {
    return complaints.map((complaint) => {
      return {
        id: complaint.id,
        status: complaint.status,
        description: complaint.description,
        city: complaint.location.city,
        formattedAddress: complaint.formattedAddress,
        location: complaint.location as any,
        createdAt: complaint.createdAt,
      };
    });
  }
}
