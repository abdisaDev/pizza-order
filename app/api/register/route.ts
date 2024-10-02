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
          role: {
            create: {
              name: "superadmin",
              permissions: {
                create: [{ name: "read" }, { name: "write" }],
              },
            },
          },
        },
      });
    } else {
      await prisma.user.create({ data: { ...payload, password } });
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return new Response("User Succesfuly Created", { status: 201 });
}
