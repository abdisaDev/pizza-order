import prisma from '@/app/util/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true, pizzas: true },
  });

  return Response.json(orders, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { id, status } = await request.json();

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json('Order Status Successfuly Updated', { status: 200 });
}
