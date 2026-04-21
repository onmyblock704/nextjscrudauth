// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances of Prisma Client in development
  // This is a Next.js/TS thing to avoid hot-reload issues
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // optional, logs all queries
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;