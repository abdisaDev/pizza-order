import prisma from '@/app/util/prisma';

export async function GET() {
  const user = await prisma.user.findMany({
    include: {
      resturant: true,
      role: {
        include: { permissions: true },
      },
      orders: true,
    },
  });

  return Response.json(user);
}
