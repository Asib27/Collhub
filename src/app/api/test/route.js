import { NextResponse } from "next/server";
const fs = require("fs").promises;

export const POST = async (req) => {
  const formData = await req.formData();

  const files = formData.getAll("files");

  files.forEach(async (f) => {
    console.log(f);

    const bytes = await f.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log(buffer.toString());
  });

  return new NextResponse(
    JSON.stringify({
      status: "success",
    }),
    { status: 200 }
  );
};
