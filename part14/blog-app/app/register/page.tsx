"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "", password: "", confirmPassword: "" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <form action={formAction} className="space-y-5">
          <h2 className="text-3xl font-bold text-white text-center">
            Welcome!
          </h2>

          <div>
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>

          <div>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>

          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>

          <div>
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>

          <button
            data-testid="register-button"
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]"
          >
            Register
          </button>

          {state.errors.username && (
            <p
              data-testid={"username-error"}
              className="mb-5 rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-400"
            >
              {state.errors.username}
            </p>
          )}

          {state.errors.password && (
            <p
              data-testid={"password-error"}
              className="mb-5 rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-400"
            >
              {state.errors.password}
            </p>
          )}

          {state.errors.confirmPassword && (
            <p
              data-testid={"passwordConfirm-error"}
              className="mb-5 rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-400"
            >
              {state.errors.confirmPassword}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
