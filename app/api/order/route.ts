import prisma from "@/app/util/prisma";

export async function POST(request: Request) {
  const { pizzas, user_id, resturant_id, status, total_price } =
    await request.json();

  if (!resturant_id) {
    throw new Error("Restaurant ID is required to create an order.");
  }
  await prisma.order.create({
    data: {
      status,
      total_price,
      resturant: { connect: { id: resturant_id } },
      user: { connect: { id: user_id } },
      pizzas: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connect: pizzas.map((pizza: any) => ({ id: pizza.id })),
      },
    },
  });

  return Response.json("Ordered Successfuly!", { status: 200 });
}
