import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/user/{userId}/teams:
 *   get:
 *     description: Get all the teams for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The list of teams for the user
 */
export const GET = async (req, {params}) => {
  const { user_id } = params;
  
  console.log(user_id);

  const teams = await prisma.team_user.findMany({
    where: {
      user_id: Number(user_id),
    },
    select: {
      team: {
        select: {
          team_id: true,
          name: true,
        },
      },
    },
  });

  console.log(teams);

  const response = teams.map((teamUser) => ({
    team_id: teamUser.team.team_id,
    name: teamUser.team.name,
  }));

  return new NextResponse(
    JSON.stringify(response),
    {status: 200}
  )
}