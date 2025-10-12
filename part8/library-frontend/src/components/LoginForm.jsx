import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("password");

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => setMessage({ text: e.message, isError: true }),
    onCompleted: () => setMessage({ text: "Welcome!" }),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
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
          password{" "}
          <input
            disabled
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
