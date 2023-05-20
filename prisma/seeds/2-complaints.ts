import { PrismaClient } from '@prisma/client';

export function seedComplaints(prisma: PrismaClient) {
  return prisma.complaint.createMany({
    data: [
      {
        status: 'DOING',
        location_id: '634d1882-62e9-439b-9436-9a71ce2e1555',
        denunciator_id: '4152d669-a9a1-49d0-bfdf-9d58040fcfb7',
        solver_id: 'cb990219-5c84-4f59-83ae-30f87f08d1a0',
      },
    ],
  });
}
