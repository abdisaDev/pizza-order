import prisma from "@/app/util/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const queryParams = request.url?.split("&");
  const filter = queryParams[0].split("?")[1].split("=")[1];
  const search = queryParams[1].split("=")[1];
  const filterBy = queryParams[2].split("=")[1];
  const user = filterBy === "user";
  const resturant = filterBy === "resturant";
  console.log(resturant);
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        // { created_at: { equals: search as string } },
        { total_price: { contains: search as string, mode: "insensitive" } },
        { status: { contains: search as string, mode: "insensitive" } },
        { quantity: { equals: Number(search) } },
        {
          toppings: {
            some: { name: { contains: search as string, mode: "insensitive" } },
          },
        },
        {
          pizzas: {
            some: {
              pizza: {
                name: { contains: search as string, mode: "insensitive" },
              },
            },
          },
        },
      ],

      ...(user && { user: { id: filter } }),
      ...(resturant && { resturant: { id: filter } }),
    },
    include: {
      user: true,
      pizzas: { include: { pizza: { include: { toppings: true } } } },
      resturant: true,
      toppings: true,
    },
  });

  return Response.json(orders, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { id, status } = await request.json();

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json("Order Status Successfuly Updated", { status: 200 });
}
