"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "", password: "", confirmPassword: "" },
  });

  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>

        <button type="submit">Register</button>

        {Object.keys(state.errors).length > 0 && (
          <div>
            {Object.values(state.errors).map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
