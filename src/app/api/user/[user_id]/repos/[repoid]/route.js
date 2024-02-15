import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getFilePath } from "@/app/api/git";
const prisma = new PrismaClient()

const fs = require('fs') 

// Route to get list of repos for a user
export const GET = async (req, {params}) => {
  const userId = params.user_id; 
  const repoid = params.repoid;

  const filepath = getFilePath(userId, repoid, true)
  const files = fs.readdirSync(filepath).filter(f => f !== '.gitj')

  return new NextResponse(
    JSON.stringify(files),
    {status: 200}
  )
}

export const POST = async (req, {params}) => {
  const userId = params.user_id; 
  const repoid =  params.repoid;
  const folderpath = getFilePath(userId, repoid, true)
  // const body = await req.json(); 

  const formData = await req.formData();
  const files = formData.getAll("files");

  files.forEach(async (f) => {
    console.log(f);

    const bytes = await f.arrayBuffer();
    const buffer = Buffer.from(bytes);

    fs.writeFileSync(folderpath + '/' + f.name, buffer)
  });

  return new NextResponse(
    JSON.stringify(files),
    {status: 200}
  )
}