import prisma from "@/app/util/prisma";

export async function GET(request: Request) {
  const queryParams = request.url?.split("?")[1];
  const search = queryParams?.split("=")[1];
  const roles = await prisma.role.findMany({
    where: {
      OR: [{ name: { contains: search as string, mode: "insensitive" } }],
    },
  });

  return Response.json(roles, { status: 200 });
}

export async function POST(request: Request) {}
