import prisma from "@/app/util/prisma";

export async function POST(request: Request) {
  const user = await request.json();
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
  return new Response("User Succesfuly Created", { status: 201 });
}
