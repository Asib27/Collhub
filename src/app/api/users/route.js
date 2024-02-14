import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: get all the users
 *     responses:
 *       200:
 *         description: {user1, user2, user3}
 *   post:
 *     description: get all the users
 *     responses:
 *       200:
 *         description: {user1, user2, user3}
 */
export const GET = async () => {
  const users = await prisma.user.findMany({
    select: {
      user_id: true, // replace with your actual fields
      name: true,
      email: true,
      picture: true,
    },
  });
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

  runShellCommand(`mkdir -p files/${data.user_id}`)
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