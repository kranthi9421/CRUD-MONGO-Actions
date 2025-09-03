import { NextResponse } from "next/server";
import { Users } from "../route";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await Users.findById(id);
  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const updatedUser = await Users.findByIdAndUpdate(id, body, {
    new: true,
    overwrite: true,
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedUser = await Users.findByIdAndDelete(id);
  return NextResponse.json({ success: true, deletedId: deletedUser?._id });
}
