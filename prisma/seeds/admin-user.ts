import { PrismaClient } from "@prisma/client";
import { seedLogger, hashPassword } from "../utils";

export async function seedAdminUser(prisma: PrismaClient) {
  seedLogger.info("Seeding admin user...");

  const email = process.env.SEED_ADMIN_EMAIL || "admin@sultanrestaurant.co.uk";
  const password = process.env.SEED_ADMIN_PASSWORD || "Sultan2024!";

  const passwordHash = await hashPassword(password);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "Sultan Admin" },
    create: {
      email,
      name: "Sultan Admin",
      passwordHash,
      role: "admin",
    },
  });

  seedLogger.table("Admin", 1);
  seedLogger.info(`Admin email: ${email}`);

  return admin;
}
