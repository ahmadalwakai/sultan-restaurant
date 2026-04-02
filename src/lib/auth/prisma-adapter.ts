import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db/prisma";

export const prismaAdapter = PrismaAdapter(prisma);
