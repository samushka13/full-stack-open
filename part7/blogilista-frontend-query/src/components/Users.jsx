import { useQuery } from "@tanstack/react-query";
import { Link, useMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
      <h2 style={{ paddingLeft: 5 }}>Users</h2>

      <Table>
        <TableHead style={{ backgroundColor: "lightcyan" }}>
          <TableCell>
            <b>User</b>
          </TableCell>
          <TableCell align="right">
            <b>Blogs</b>
          </TableCell>
        </TableHead>

        <TableBody>
          {users.map((u, i) => (
            <TableRow
              key={u.id}
              style={{ backgroundColor: i % 2 ? "whitesmoke" : "white" }}
            >
              <TableCell>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </TableCell>
              <TableCell align="right">{u.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
