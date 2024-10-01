import prisma from "@/app/util/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { restaurantId, name } = await request.json();

    if (!restaurantId || !name) {
      return NextResponse.json(
        { error: "restaurantId and name are required." },
        { status: 400 }
      );
    }

    const pizza = await prisma.pizza.create({
      data: {
        name,
        resturant: {
          connect: { id: restaurantId },
        },
        toppings: {
          create: {},
        },
      },
    });

    return NextResponse.json(pizza, { status: 201 });
  } catch (error) {
    console.error("Error adding pizza:", error);
    return NextResponse.json(
      { error: "Failed to add pizza." },
      { status: 500 }
    );
  }
}
