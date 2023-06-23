import { PrismaClient } from '@prisma/client';

export function seedComplaints(prisma: PrismaClient) {
  return prisma.complaint.createMany({
    data: [
      {
        status: 'DOING',
        locationId: '634d1882-62e9-439b-9436-9a71ce2e1555',
        denunciatorId: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
        solverId: 'cb990219-5c84-4f59-83ae-30f87f08d1a0',
        description: 'I saw a focus of dengue mosquito in this location',
      },
    ],
  });
}
