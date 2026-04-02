import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const messagesData = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+44 7700 900001",
    subject: "Catering Enquiry",
    message: "Hi, I'm interested in catering for a corporate event of 50 people. Could you please send me your catering menu and pricing?",
    status: "UNREAD" as const,
  },
  {
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    subject: "Vegetarian Options",
    message: "Hello, I'm planning to visit with a group and some of us are vegetarian. Can you confirm which dishes are suitable? Thanks!",
    status: "READ" as const,
  },
  {
    name: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    phone: "+44 7700 900003",
    subject: "Birthday Celebration",
    message: "We'd like to celebrate a 50th birthday at your restaurant. Do you offer any special arrangements or decorations?",
    status: "REPLIED" as const,
  },
  {
    name: "Emma Brown",
    email: "emma.brown@example.com",
    subject: "Feedback",
    message: "Just wanted to say we had an amazing meal last night. The lamb shank was incredible! Will definitely be back.",
    status: "ARCHIVED" as const,
  },
];

export async function seedSampleMessages(prisma: PrismaClient) {
  if (process.env.NODE_ENV === "production") return [];

  seedLogger.info("Seeding sample messages (dev only)...");

  await prisma.contactMessage.deleteMany({});

  const messages = await Promise.all(
    messagesData.map((m) =>
      prisma.contactMessage.create({ data: m })
    )
  );

  seedLogger.table("ContactMessage (sample)", messages.length);
  return messages;
}
