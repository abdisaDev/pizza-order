import prisma from "@/app/util/prisma";

export async function POST(request: Request) {
  console.log(request);
  return Response.json({ a: "Hello" });
}
