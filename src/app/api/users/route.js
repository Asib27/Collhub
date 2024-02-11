import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const GET = async () => {
  const users = await prisma.user.findMany();
  return new NextResponse(
    JSON.stringify(users),
    {status: 200}
  )
}

export const POST = async (req) => {
  const body = await req.json();

  try {
    const data = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email
      }
    })
  } catch {
    return new NextResponse(
      JSON.stringify({
        status: 'failure',
        message: 'usernmae or email already exists'
      }),
      {status: 200}
    )
  }

  runShellCommand(`mkdir -p files/${body.name}`)
  const output = runShellCommand('echo $?')

  if(output === '0\n'){
    return new NextResponse(
      JSON.stringify({
        status: 'success'
      }),
      {status: 200}
    )
  } else {
    return new NextResponse(
      JSON.stringify({
        status: 'failure',
        message: 'cannot create directory'
      }),
      {status: 200}
    )
  }
}