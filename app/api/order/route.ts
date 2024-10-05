import prisma from "@/app/util/prisma";

export async function POST(request: Request) {
  const { pizzas, user_id, resturant_id, status, total_price, quantity } =
    await request.json();

  if (!resturant_id) {
    throw new Error("Restaurant ID is required to create an order.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderedPizzas = pizzas.map((pizza: { id: any }) => {
    return { pizza: { connect: { id: pizza.id } }, quantity };
  });

  await prisma.order.create({
    data: {
      status,
      total_price,
      resturant: { connect: { id: resturant_id } },
      user: { connect: { id: user_id } },
      pizzas: { create: orderedPizzas },
      quantity,
    },
  });

  return Response.json("Ordered Successfuly!", { status: 200 });
}
