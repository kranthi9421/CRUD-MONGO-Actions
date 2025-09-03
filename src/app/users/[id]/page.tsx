import Link from "next/link";
import { UsersProps } from "../UsersView";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const user: UsersProps = await res.json();
  return (
    <div>
      <h1>Name : {user.name}</h1>
      <h1>Name : {user.email}</h1>
      <Link href={`/users`}>Users List</Link>
    </div>
  );
};

export default page;
