import { NextResponse } from "next/server";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export const Users =  mongoose.models.users || mongoose.model("users", UserSchema);

export async function GET() {
  const users = await Users.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUser = await Users.create(body);
    return NextResponse.json(newUser);
  } catch (err: any) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
