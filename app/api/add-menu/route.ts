import prisma from "@/app/util/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload) {
      return NextResponse.json(
        { error: "restaurantId and name are required." },
        { status: 400 }
      );
    }

    const pizza = await prisma.pizza.create({
      data: {
        name: payload.name,
        price: payload.price,
        resturant: {
          connect: { id: payload.resturant_id },
        },
        toppings: {
          create: payload.toppings,
        },
      },
    });

    return NextResponse.json(pizza, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add pizza." },
      { status: 500 }
    );
  }
}
