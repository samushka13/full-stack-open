import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>

      {user.blogs.length ? (
        <>
          <h3>Added blogs:</h3>

          <ul>
            {user.blogs.map((b) => (
              <li key={b.id}>
                <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No added blogs</p>
      )}
    </div>
  );
};

export default User;
