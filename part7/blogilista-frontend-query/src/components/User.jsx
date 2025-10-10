import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const User = ({ user }) => {
  return (
    <div>
      <h2 style={{ paddingLeft: 5 }}>{user.name} | Added blogs</h2>

      {user.blogs.length ? (
        <Table>
          <TableHead style={{ backgroundColor: "lightcyan" }}>
            <TableCell>
              <b>Title</b>
            </TableCell>

            <TableCell align="right">Author</TableCell>
          </TableHead>

          <TableBody>
            {user.blogs.map((b, i) => (
              <TableRow
                key={b.id}
                style={{ backgroundColor: i % 2 ? "whitesmoke" : "white" }}
              >
                <TableCell>
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </TableCell>

                <TableCell align="right">{b.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No added blogs</p>
      )}
    </div>
  );
};

export default User;
