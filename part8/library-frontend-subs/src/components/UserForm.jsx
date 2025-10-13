import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../queries";

const UserForm = ({ setMessage }) => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const handleSuccess = () => {
    setUsername("");
    setFavoriteGenre("");
    setMessage({ text: "User created!" });
  };

  const [createUser] = useMutation(CREATE_USER, {
    onError: (e) => setMessage({ text: e.message, isError: true }),
    onCompleted: handleSuccess,
  });

  const submit = async (event) => {
    event.preventDefault();
    createUser({ variables: { username, favoriteGenre } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite genre{" "}
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default UserForm;
