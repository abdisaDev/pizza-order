import prisma from "@/app/util/prisma";

export async function GET(request: Request) {
  const queryParams = request.url?.split("&");
  const filter = queryParams[0].split("?")[1].split("=")[1];
  const search = queryParams[1].split("=")[1];

  const roles = await prisma.role.findMany({
    where: {
      OR: [
        { resturant: { id: filter } },
        { users: { some: { resturant: { id: filter } } } },
      ],
      name: { contains: search as string, mode: "insensitive" },
    },
    include: { users: { include: { resturant: true } } },
  });

  return Response.json(roles, { status: 200 });
}

export async function POST(request: Request) {
  const role = await request.json();

  await prisma.role.create({
    data: {
      name: role.name,
      permissions: { create: role.permissions },
      resturant: { connect: { id: role.resturant_id } },
    },
  });

  return Response.json("Role Registered", { status: 201 });
}
