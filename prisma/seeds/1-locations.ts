import { PrismaClient } from '@prisma/client';

export function seedLocations(prisma: PrismaClient) {
  return prisma.location.createMany({
    data: [
      {
        id: '634d1882-62e9-439b-9436-9a71ce2e1555',
        description: 'Location 1',
        latitude: 123.45,
        longitude: 67.89,
        cep: '12345678',
        state: 'RS',
        city: 'City 1',
        street: 'Street 1',
        number: '1940',
        neighborhood: 'Neighborhood 1',
        formattedAddress: 'Neighborhood - Street 1, 1940',
      },
    ],
  });
}
