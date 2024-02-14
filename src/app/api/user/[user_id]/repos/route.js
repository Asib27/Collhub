import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
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