import prisma from "@/app/util/prisma";

export async function GET() {
  try {
    const pizzas = await prisma.pizza.findMany({
      include: {
        resturant: true,
        toppings: true,
        orders: { include: { order: true } },
      },
    });

    return Response.json(pizzas, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json(
      { error: "Network Error, Faild to fetch pizzas." },
      { status: 500 }
    );
  }
}
