import prisma from '@/app/util/prisma';

export async function POST(request: Request) {
  try {
    const { is_resturant, resturant_name, ...payload } = await request.json();

    if (is_resturant) {
      await prisma.user.create({
        data: {
          ...payload,
          type: 'RESTURANT',
          resturant: {
            create: {
              name: resturant_name,
              total_orders: 0,
              pizzas: { create: [] },
            },
          },
          role: {
            create: {
              name: 'admin',
              permissions: {
                create: [{ name: 'read' }, { name: 'write' }],
              },
            },
          },
        },
      });
    } else {
      await prisma.user.create({ data: payload });
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return new Response('User Succesfuly Created', { status: 201 });
}
