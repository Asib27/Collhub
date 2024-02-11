import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/teams:
 *   get:
 *     description: get all the teams
 *     responses:
 *       200:
 *         description: {team1, team2, team3}
 *   post:
 *     description: create a team
 *     responses:
 *       200:
 *         description: {team1}
 */
export const GET = async () => {
  const teams = await prisma.team.findMany();
  return new NextResponse(
    JSON.stringify(teams),
    {status: 200}
  )
}

export const POST = async (req) => {
  const body = await req.json();

  try {
    const data = await prisma.team.create({
      data: {
        name: body.name,
      }
    })
  } catch {
    return new NextResponse(
      JSON.stringify({
        status: 'failure',
        message: 'team name or email already exists'
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