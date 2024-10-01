import prisma from "@/app/util/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const queryParams = request.url?.split("?")[1];
  const search = queryParams?.split("=")[1];
  console.log(search);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
        { phone_number: { contains: search as string, mode: "insensitive" } },
      ],
    },
    include: {
      resturant: true,
      role: {
        include: { permissions: true },
      },
      orders: true,
    },
  });

  const filtredUsers = users.map((user) => {
    const { password, ...filteredUser } = user;
    return filteredUser;
  });

  return Response.json(filtredUsers, { status: 200 });
}
