import prisma from "@/app/util/prisma";

export async function POST(request: Request) {
  const { pizzas, user_id, resturant_id, status, total_price } =
    await request.json();
  const order = prisma.order.create({
    data: {
      status,
      user_id,
      total_price,
      resturant: { connect: { id: resturant_id } },
      user: { connect: { id: user_id } },
      pizzas: {
        create: pizzas.map((pizza) => ({
          id: pizza.id,
          name: pizza.name,
          toppings: pizza.toppings,
          quantity: pizza.quantity,
        })),
      },
    },
  });
  return Response.json("Ordered Successfuly!", { status: 200 });
}
