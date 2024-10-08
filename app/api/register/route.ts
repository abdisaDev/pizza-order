import prisma from "@/app/util/prisma";
import bcrypt from "bcryptjs";

const SALT_ROUND = 7;

export async function POST(request: Request) {
  try {
    const { is_resturant, resturant_name, password, ...payload } =
      await request.json();

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    if (is_resturant) {
      await prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          type: "RESTURANT",
          resturant: {
            create: {
              name: resturant_name,
              total_orders: 0,
              pizzas: { create: [] },
            },
          },
          status: true,
          role: {
            create: {
              name: "superadmin",
              permissions: {
                create: [{ name: "all" }],
              },
            },
          },
        },
      });
    } else {
      await prisma.user.create({
        data: { ...payload, password: hashedPassword },
      });
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    return new Response("User Succesfuly Registered", { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json(
      { error: "Failed to register new user." },
      { status: 500 }
    );
  }
}
