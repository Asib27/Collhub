import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const POST = async (req, {params}) => {
    const { team_id } = params;
    const body = await req.json();
    
    console.log(team_id);
    console.log(body.user_id);
    
    try {
      await prisma.team_user.create({
        data: {
          user_id: Number(body.user_id),
          team_id: Number(team_id),
          role: 'member',
        },
      });
    } catch (err) {
        console.log(err);
      return new NextResponse(
        JSON.stringify({ status: 'failure', message: 'Cannot add member to team' }),
        { status: 500 }
      );
    }
  
    return new NextResponse(
      JSON.stringify({ status: 'success', message: 'Member added to team' }),
      { status: 200 }
    );
  }