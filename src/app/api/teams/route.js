import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const GET = async () => {
  
  return new NextResponse(
    JSON.stringify(users),
    {status: 200}
  )
}