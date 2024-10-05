import prisma from "@/app/util/prisma";

export async function GET(request: Request) {
  const queryParams = request.url?.split("?")[1];
  const search = queryParams?.split("=")[1];

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...filteredUser } = user;
    return filteredUser;
  });

  return Response.json(filtredUsers, { status: 200 });
}

export async function POST(request: Request) {
  const { email, status } = await request.json();
  console.log(status, email);
  try {
    await prisma.user.update({
      where: { email },
      data: {
        status,
      },
    });
  } catch (error) {
    // @typescript-eslint/no-explicit-any
    throw new Error((error as any)?.message);
  }

  return Response.json("Status Updated", { status: 201 });
}
