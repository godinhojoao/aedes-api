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
        createdAt: new Date(),
        id: '93a2dffa-88eb-4fb9-bd63-85c57074119f',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis ligula a enim maximus, et venenatis lectus placerat. Nam quis sollicitudin neque, id suscipit purus. Suspendisse et ligula ac metus bibendum aliquet. Mauris ac metus augue. Nulla eget augue tristique, aliquam enim a, efficitur nulla. Curabitur euismod tincidunt metus, eget dignissim tortor lacinia eu. Ut sagittis euismod ante a tincidunt. Duis vehicula, ex vel molestie vulputate, purus mauris iaculis mi, id iaculis nunc leo sed lectus. Sed interdum ante in pharetra malesuada.
        Vestibulum nec urna neque. Nulla vitae faucibus turpis, id interdum ipsum. Vivamus eleifend sem in mauris interdum, vel auctor lectus auctor. Donec hendrerit libero in velit efficitur, vitae elementum turpis consectetur. Suspendisse sed tellus ac mauris lacinia lacinia sed id lacus. Quisque facilisis magna urna, sit amet sagittis tortor laoreet in. Nullam efficitur orci eu dui elementum, non feugiat purus scelerisque. Quisque non gravida mauris.
        Etiam vel enim nec risus tempus cursus. Proin pellentesque ultrices lorem, sed venenatis risus. Duis congue convallis neque, eu suscipit leo gravida eget. Suspendisse dictum massa et erat efficitur, sit amet auctor mauris lacinia. Nam facilisis enim non nulla facilisis tempus. Quisque malesuada nunc sit amet erat vestibulum, eget venenatis felis pharetra. Nulla finibus, ex sit amet fringilla bibendum, risus est interdum leo, id faucibus ex libero in leo. Nulla facilisi. Mauris dignissim metus in tristique congue. Vestibulum semper dignissim enim, sed fringilla dolor rhoncus sit amet. Curabitur commodo iaculis ipsum ut viverra. Nam eleifend viverra felis, id varius leo dapibus ac. Donec a urna aliquet, maximus quam eu, aliquam orci.
        Cras vestibulum leo a ligula congue aliquam. Sed efficitur erat eu nulla rutrum interdum. Nam vel sagittis metus. Integer quis tristique neque. Etiam sed neque in dolor rhoncus vulputate id ac nunc. Vestibulum consequat elementum finibus. Suspendisse dapibus dolor et urna sagittis facilisis. Sed placerat nulla id arcu iaculis, nec efficitur sem cursus. Aliquam iaculis purus et tortor consequat, vel scelerisque erat commodo. Integer vel cursus urna. Suspendisse a pellentesque neque. Aenean vitae nisl lorem. In malesuada turpis mi, nec eleifend ligula malesuada vel. Donec convallis dolor a urna maximus facilisis. Aenean sed felis turpis.`,
        status: 0,
        formattedAddress: 'Test formatted address',
        denunciatorId: '6037e83c-7416-4588-9a0a-4d9fe41dbbfb',
        location: {
          id: 'location-id',
          city: 'Bagé',
          state: 'Example State',
          street: 'Example Street',
          neighborhood: 'Example Neighborhood',
          cep: '12345-678',
          number: '123',
        },
      },
      {
        createdAt: new Date(),
        id: '04574544-9018-4428-829f-8c563438b2e2',
        description: 'FODASE',
        status: 0,
        formattedAddress: 'Test formatted address',
        denunciatorId: '38d37972-e937-4b75-8dd7-bef15dbd88da',
        location: {
          id: 'location-id',
          city: 'Bagé',
          state: 'Example State',
          street: 'Example Street',
          neighborhood: 'Example Neighborhood',
          cep: '12345-678',
          number: '123',
        },
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
