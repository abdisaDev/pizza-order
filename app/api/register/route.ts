import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log(request);
  return Response.json({ a: 'Hello' });
}
