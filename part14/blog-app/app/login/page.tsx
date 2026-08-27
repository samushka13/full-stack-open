"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const { showNotification } = useNotification();

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-3xl font-bold text-white text-center">
            Welcome back!
          </h2>

          <div>
            <label>
              Username
              <input
                id="username"
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
              Password
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>

          <button
            data-testid="login-button"
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]"
          >
            Login
          </button>

          {error && (
            <p
              data-testid="error-message"
              className="mb-5 rounded-lg border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
