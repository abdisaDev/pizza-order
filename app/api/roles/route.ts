import prisma from '@/app/util/prisma';

export async function GET() {
  const roles = await prisma.role.findMany();

  return Response.json(roles);
}
