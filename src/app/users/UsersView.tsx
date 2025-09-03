"use client";
import React, { useActionState, useEffect, useState } from "react";
import { createUser, deleteUser, updateUser } from "../actions/UserActions";
import Link from "next/link";

export type UsersProps = {
  _id: string;
  name: string;
  email: string;
};

const UsersView = ({ initialUsers }: { initialUsers: UsersProps[] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [createState, createAction] = useActionState(createUser, undefined);
  const [deleteState, deleteAction] = useActionState(deleteUser, undefined);
  const [updateState, updateAction] = useActionState(updateUser, undefined);

  useEffect(() => {
    if (updateState?.success && updateState?.updatedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === updateState.updatedUser._id
            ? updateState.updatedUser
            : user
        )
      );
    }
  }, [updateState]);

  useEffect(() => {
    if (createState?.user) {
      setUsers((prev) => [...prev, createState.user]);
    }
  }, [createState]);

  useEffect(() => {
    if (deleteState?.success && deleteState?.deletedId) {
      setUsers((prev) => prev.filter((u) => u._id !== deleteState?.deletedId));
    }
  }, [deleteState]);

  return (
    <div>
      <form action={createAction}>
        <h2>Create User</h2>
        <input name="name" />
        <input name="email" />

        <button>Create</button>
      </form>

      {users.map((user) => {
        return (
          <div key={user._id}>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <form
              action={updateAction}
              className="space-y-2 border p-4 rounded"
            >
              <h2>Update User</h2>
              <input
                name="_id"
                defaultValue={user._id}
                style={{ display: "none" }}
              />
              <input name="name" />
              <input name="email" />

              <button className="bg-blue-500 text-white px-3 py-1">
                Update
              </button>
            </form>
            <form action={deleteAction}>
              <input
                name="_id"
                style={{
                  display: "none",
                }}
                defaultValue={user._id}
              />
             <Link href={`/users/${user._id}`}>Detals page</Link>
              <button className="bg-red-500 text-white px-3 py-1">
                Delete
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default UsersView;
