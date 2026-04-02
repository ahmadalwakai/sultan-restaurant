import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const customersData = [
  { email: "john.doe@example.com", name: "John Doe", phone: "+44 7700 900001" },
  { email: "jane.smith@example.com", name: "Jane Smith", phone: "+44 7700 900002" },
  { email: "ahmed.ali@example.com", name: "Ahmed Ali", phone: "+44 7700 900003" },
  { email: "sarah.jones@example.com", name: "Sarah Jones", phone: "+44 7700 900004" },
  { email: "mohammed.khan@example.com", name: "Mohammed Khan", phone: "+44 7700 900005" },
];

export async function seedSampleCustomers(prisma: PrismaClient) {
  if (process.env.NODE_ENV === "production") return [];

  seedLogger.info("Seeding sample customers (dev only)...");

  const customers = await Promise.all(
    customersData.map((c) =>
      prisma.user.upsert({
        where: { email: c.email },
        update: { name: c.name, phone: c.phone },
        create: { email: c.email, name: c.name, phone: c.phone, role: "CUSTOMER" },
      })
    )
  );

  seedLogger.table("User (sample)", customers.length);
  return customers;
}
