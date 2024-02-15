import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
import { init } from "../git";
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
      name: true,
      type: true
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
  const user_id = 1
  const body = await req.json(); 

  const repo = await prisma.repo.create({
    data: {
      name: body.name,
      type: body.type
    },
    select: {
      repo_id: true
    }
  })

  const role_user = await prisma.repo_user.create({
    data: {
      repo_id: repo.repo_id,
      user_id: user_id,
      role: 'author'
    }
  })

  runShellCommand(`mkdir -p files/users/${user_id}/${body.name}`)
  init(`files/users/${user_id}/${body.name}`)

  return new NextResponse(
    JSON.stringify({
      status: 'success'
    }),
    {status: 200}
  )
}