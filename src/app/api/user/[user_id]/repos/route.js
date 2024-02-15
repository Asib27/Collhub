import { NextResponse } from "next/server";
// import prisma from "../connect";
import { runShellCommand } from "../../../shell";

import { PrismaClient } from "@prisma/client";
import { getFilePath, init } from "../../../git";
const prisma = new PrismaClient()


// Route to get list of repos for a user
export const GET = async (req, {params}) => {
    const userId = params.user_id; // Assuming you're passing userId as a query parameter
  
    const repos = await prisma.repo_user.findMany({
      where: {
        user_id: Number(userId),
      },
      select: {
        repo: {
          select: {
            repo_id: true,
            name: true,
            type: true,
            updatedAt: true,
            users: {
              where: {
                role: 'author',
              },
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

    // console.log(repos);
  
    const response = repos.map((repoUser) => ({
      id: repoUser.repo.repo_id,
      name: repoUser.repo.name,
      type: repoUser.repo.type,
      lastUpdated: repoUser.repo.updatedAt,
      owner: {
        id: repoUser.repo.users[0]?.user.user_id,
        name: repoUser.repo.users[0]?.user.name,
      },
    }));
  
    return new NextResponse(
      JSON.stringify(response),
      {status: 200}
    )
  }

export const POST = async (req, {params}) => {
  const user_id = params.user_id;
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

  const role_user = await prisma.repo_user.create({
    data: {
      repo_id: repo.repo_id,
      user_id: Number(user_id),
      role: "author",
    },
  });

  const filepath = getFilePath(user_id, repo.repo_id, true);
  runShellCommand(`mkdir -p ${filepath}`)
  init(filepath)

  return new NextResponse(
    JSON.stringify({
      status: "success",
    }),
    { status: 200 }
  );
};