import prisma from '@/app/util/prisma';

export async function POST(request: Request) {
  const { pizzas, user_id, resturant_id, status, total_price } =
    await request.json();

  console.log(resturant_id);
  if (!resturant_id) {
    throw new Error('Restaurant ID is required to create an order.');
  }
  const order = await prisma.order.create({
    data: {
      status,
      total_price,
      resturant: { connect: { id: resturant_id } },
      user: { connect: { id: user_id } },
      pizzas: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: pizzas.map((pizza: any) => ({
          name: pizza.name,
          quantity: pizza.quantity,
          price: pizza.price,
          resturant: { connect: { id: resturant_id } },
          toppings: {
            create: pizza.toppings.map((topping) => ({
              name: topping.name, // Create new toppings for the pizza
            })),
          },
        })),
      },
    },
  });

  return Response.json('Ordered Successfuly!', { status: 200 });
}
