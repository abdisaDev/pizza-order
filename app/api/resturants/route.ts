import prisma from "@/app/util/prisma";

export async function GET() {
  try {
    const resturants = await prisma.resturant.findMany({
      include: {
        pizzas: true,
        orders: {
          include: {
            user: true,
            pizzas: { include: { pizza: { include: { toppings: true } } } },
          },
        },
      },
    });

    return Response.json(resturants);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json(
      { error: "Network Error, Failed to fetch resturants." },
      { status: 500 }
    );
  }
}
