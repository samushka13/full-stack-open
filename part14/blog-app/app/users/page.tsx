import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
        Users
      </h2>

      <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.username}`}
              className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-slate-50"
            >
              <div>
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">@{user.username}</p>
              </div>

              <span className="text-slate-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
