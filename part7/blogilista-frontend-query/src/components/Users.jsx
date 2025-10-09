import { useQuery } from "@tanstack/react-query";
import { Link, useMatch } from "react-router-dom";

import User from "./User";

import userService from "../services/users";

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const users = result.data ?? [];

  const match = useMatch("/users/:id");
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  if (user) {
    return <User user={user} />;
  }

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
          <tr>
            <td>
              <b>User</b>
            </td>
            <td align="right">
              <b>Blogs</b>
            </td>
          </tr>

          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td align="right">{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
