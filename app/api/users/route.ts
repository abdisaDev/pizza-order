import prisma from "@/app/util/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
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

  return Response.json(filtredUsers);
}
