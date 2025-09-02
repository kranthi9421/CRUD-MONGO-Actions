import UsersView from "./UsersView";

const page = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  return (
    <div>
      <UsersView initialUsers={users} />
    </div>
  );
};

export default page;
