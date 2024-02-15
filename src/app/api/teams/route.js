import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../shell";

import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";
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

  let team;
  try {
    team = await prisma.team.create({
      data: {
        name: body.name,
      }
    });
  } catch {
    return new NextResponse(
      JSON.stringify({
        status: 'failure',
        message: 'team name already exists'
      }),
      {status: 200}
    )
  }

  // console.log(team.team_id);

  // console.log(team);

  try {
    await prisma.team_user.create({
      data: {
        user_id: body.user_id,
        team_id: team.team_id,
        role: "author",
      }
    });
  } catch {
    return new NextResponse(
      JSON.stringify({
        status: 'failure',
        message: 'cannot create team_user instance'
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