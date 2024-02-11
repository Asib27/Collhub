import { NextResponse } from "next/server";
import prisma from "../connect";

export const GET = async () => {
  const users = await prisma.user.findMany();
  return new NextResponse(
    JSON.stringify(users),
    {status: 200}
  )
}