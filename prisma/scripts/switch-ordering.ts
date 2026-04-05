import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.update({ 
    where: { key: 'pickupEnabled' }, 
    data: { value: 'true' } 
  });
  
  await prisma.siteSetting.update({ 
    where: { key: 'deliveryEnabled' }, 
    data: { value: 'false' } 
  });
  
  console.log('✓ Switched: Pickup=Active, Delivery=Paused');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
