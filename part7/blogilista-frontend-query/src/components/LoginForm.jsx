import { useState } from "react";

import { useUserDispatch } from "../UserContext";
import { useNotificationDispatch } from "../NotificationContext";

import loginService from "../services/login";

const LoginForm = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch {
      notificationDispatch({ type: "INVALID_CREDENTIALS" });
    }
  };

  return (
    <div>
      <h2>Log in to the app</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:&nbsp;
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Password:&nbsp;
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
