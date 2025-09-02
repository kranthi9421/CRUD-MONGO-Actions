import { NextResponse } from "next/server";
import { Users } from "../route";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const updatedUser = Users.findByIdAndUpdate(id, body, {
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

  await Users.findByIdAndDelete(id);
}
