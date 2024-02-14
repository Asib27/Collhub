import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/team/{teamId}:
 *   get:
 *     description: Get a team by its ID
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The team ID
 *     responses:
 *       200:
 *         description: The team data
 */
export const GET = async (req, {params}) => {
  const { team_id } = params;

  const team = await prisma.team.findUnique({
    where: {
      team_id: Number(team_id),
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              user_id: true,
              name: true,
            },
          },
          role: true,
        },
      },
      repos: {
        select: {
          repo: {
            select: {
              repo_id: true,
              name: true,
              type: true,
              updatedAt: true,
              users: {
                select: {
                  user: {
                    select: {
                      user_id: true,
                      name: true,
                    },
                  },
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!team) {
    return new NextResponse(
      JSON.stringify({ status: 'failure', message: 'Team not found' }),
      { status: 404 }
    );
  }

  const response = {
    id: team.team_id,
    name: team.name,
    members: team.users.map((teamUser) => ({
      id: teamUser.user.user_id,
      name: teamUser.user.name,
      role: teamUser.role, // Add the team role
    })),
    admin_id: team.users.find((teamUser) => teamUser.role === 'admin')?.user.user_id,
    repos: team.repos.map((repoTeam) => ({
      id: repoTeam.repo.repo_id,
      name: repoTeam.repo.name,
      type: repoTeam.repo.type,
      lastUpdated: repoTeam.repo.updatedAt,
      teamName: team.name,
      authors: {
        id: repoTeam.repo.users.find((repoUser) => repoUser.role === 'author')?.user.user_id,
        name: repoTeam.repo.users.find((repoUser) => repoUser.role === 'author')?.user.name,
      },
      contributors: repoTeam.repo.users.filter((repoUser) => repoUser.role === 'contributor').map((contributor) => ({
        id: contributor.user.user_id,
        name: contributor.user.name,
      })),
    })),
  };

  return new NextResponse(
    JSON.stringify(response),
    {status: 200}
  )
}