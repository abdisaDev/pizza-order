import prisma from "@/app/util/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true, pizzas: true },
  });

  return Response.json(orders, { status: 200 });
}
