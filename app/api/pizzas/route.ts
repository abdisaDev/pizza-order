import prisma from "@/app/util/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const pizzas = await prisma.pizza.findMany({
    include: {
      resturant: true,
      toppings: true,
      orders: { include: { order: true } },
    },
  });

  return NextResponse.json(pizzas, { status: 201 });
}
