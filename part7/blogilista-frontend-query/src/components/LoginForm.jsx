import { useState } from "react";
import { Button, TextField } from "@mui/material";

import { useUserDispatch } from "../UserContext";
import { useNotificationDispatch } from "../NotificationContext";

import loginService from "../services/login";

import Spacer from "./Spacer";

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
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            size="small"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <Spacer />

        <div>
          <TextField
            size="small"
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <Spacer />

        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
