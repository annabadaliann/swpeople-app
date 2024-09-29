import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const user = {
  email: "test@gmail.com",
  password: "1234",
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const password = Buffer.from(data.password, "base64").toString("ascii");

  if (data.email !== user.email || password !== user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  
  cookies().set("token", jwt.sign({ ok: true }, 'secret'), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({}, { status: 201})
};
