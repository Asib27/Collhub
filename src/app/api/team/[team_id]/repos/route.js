import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../../../shell";

import { PrismaClient } from "@prisma/client";
import { getFilePath, init } from "../../../git";
const prisma = new PrismaClient()


// Route to get list of repos for a team
export const GET = async (req, {params}) => {
    const teamId = params.team_id; // Assuming you're passing team_id as a query parameter
  
    const repos = await prisma.repo_team.findMany({
      where: {
        team_id: Number(teamId),
      },
      select: {
        repo: {
          select: {
            repo_id: true,
            name: true,
            type: true,
            updatedAt: true,
          },
        },
        team: {
          select: {
            team_id: true,
            name: true,
            users: {
              select: {
                user: {
                  select: {
                    user_id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  
    const response = repos.map((repoTeam) => ({
      id: repoTeam.repo.repo_id,
      name: repoTeam.repo.name,
      type: repoTeam.repo.type,
      lastUpdated: repoTeam.repo.updatedAt,
      team: {
        id: repoTeam.team.team_id,
        name: repoTeam.team.name,
        members: repoTeam.team.users.map((teamUser) => ({
          id: teamUser.user.user_id,
          name: teamUser.user.name,
        })),
      },
    }));
  
    return new NextResponse(
      JSON.stringify(response),
      {status: 200}
    )
  }
  
  // Route to create a new repo for a team
  export const POST = async (req, {params}) => {
    const teamId = params.team_id;
    const body = await req.json();
  
    const repo = await prisma.repo.create({
      data: {
        name: body.name,
        type: body.type,
      },
      select: {
        repo_id: true,
      },
    });
  
    await prisma.repo_team.create({
      data: {
        repo_id: repo.repo_id,
        team_id: Number(teamId),
      },
    });
  
    const filepath = getFilePath(teamId, repo.repo_id, true);
    runShellCommand(`mkdir -p ${filepath}`)
    init(filepath)
  
    return new NextResponse(
      JSON.stringify({
        status: "success",
      }),
      { status: 200 }
    );
  };