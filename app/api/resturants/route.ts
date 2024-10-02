import prisma from "@/app/util/prisma";

export async function GET() {
  const resturants = await prisma.resturant.findMany({
    include: {
      pizzas: true,
      orders: { include: { user: true, pizzas: true } },
    },
  });

  return Response.json(resturants);
}
