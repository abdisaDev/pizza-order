import prisma from "@/app/util/prisma";

export async function GET(request: Request) {
  try {
    const queryParams = request.url?.split("&");
    const filter = queryParams[0].split("?")[1].split("=")[1];
    const search = queryParams[1].split("=")[1];
    console.log(search);

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search as string, mode: "insensitive" } },
          { email: { contains: search as string, mode: "insensitive" } },
          { phone_number: { contains: search as string, mode: "insensitive" } },
        ],
        resturant: { id: filter },
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json(
      { error: "Network Error, Failed to fetch users." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error((error as any)?.message);
    }

    return Response.json("User Status Updated", { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json(
      { error: "Failed to update user status." },
      { status: 500 }
    );
  }
}
