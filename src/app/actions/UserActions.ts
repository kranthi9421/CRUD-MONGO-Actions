"use server";

import { revalidatePath } from "next/cache";
import { Users } from "../api/users/route";


export async function createUser(prevData: any, formdata: FormData) {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;

  const newUser = await Users.create({ name, email });

  // Ensure the returned object is plain and serializable
  return {
    success: true,
    user: {
      _id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    },
  };
}

export async function updateUser(prevData: any, formData: FormData) {
  const id = formData.get("_id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const updated = await Users.findByIdAndUpdate(id, { name, email },{new:true});
  revalidatePath("/users");
  return {
    success: true,
    updatedUser: {
      _id: updated._id.toString(),
      name: updated.name,
      email: updated.email,
    },
  };
}

export async function deleteUser(prevState: any, formData: FormData) {
  const id = formData.get("_id") as string;

  if (!id) return { error: "User _id required" };

  await Users.findByIdAndDelete(id);
  revalidatePath("/users");
  return { success: true, deletedId: id };
}
