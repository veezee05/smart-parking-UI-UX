import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasource: {
      url: process.env.DATABASE_URL,
    },
  } as any); // Use any because Prisma 7 types might be strict about this if generated without it.

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
