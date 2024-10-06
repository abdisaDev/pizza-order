import prisma from "@/app/util/prisma";

export async function GET(request: Request) {
  const queryParams = request.url?.split("&");
  const filter = queryParams[0].split("?")[1].split("=")[1];
  const search = queryParams[1].split("?")[0].split("=")[1];
  console.log(search, "search");
  console.log(filter, "filter");

  const roles = await prisma.role.findMany({
    where: {
      OR: [{ name: { contains: search as string, mode: "insensitive" } }],
      users: {
        some: {
          resturant: {
            id: filter,
          },
        },
      },
    },
    include: { users: { include: { resturant: true } } },
  });

  return Response.json(roles, { status: 200 });
}

export async function POST() {}
