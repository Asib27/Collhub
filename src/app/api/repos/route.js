import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const GET = async () => {
  const user_id = 1
  const data = await prisma.repo_user.findMany({
    select: {
      repo_id: true
    },
    where: {
      user_id: user_id
    }
  })
  const repo_ids = data.map(d => d.repo_id)

  const repos = await prisma.repo.findMany({
    select: {
      repo_id: true,
      name: true
    },
    where: {
      repo_id: { in: repo_ids }
    }
  })

  return new NextResponse(
    JSON.stringify(repos),
    {status: 200}
  )
}

export const POST = async (req, res) => {
  const body = await req.json(); 
  return new NextResponse(
    JSON.stringify(data),
    {status: 200}
  )
}