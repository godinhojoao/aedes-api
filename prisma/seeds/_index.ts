import { PrismaClient } from '@prisma/client';
import { seedAccounts } from './0-accounts';
import { seedLocations } from './1-locations';
import { seedComplaints } from './2-complaints';

async function main() {
  try {
    const prisma = new PrismaClient();
    await seedAccounts(prisma);
    await seedLocations(prisma);
    await seedComplaints(prisma);
  } catch (err) {
    console.error(err);
    console.log('err', err);
  }
}

main();
