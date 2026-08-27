"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <NavLink href="/">The Blog App</NavLink>

      <div className="ml-auto flex items-center gap-4">
        <NavLink href="/blogs">blogs</NavLink>
        {" | "}
        <NavLink href="/users">users</NavLink>
        {" | "}
        {session ? (
          <>
            <NavLink href="/blogs/new">add blog</NavLink>
            {" | "}
            <NavLink href="/me">me</NavLink>
            {" | "}
            <button onClick={handleSignOut} className="hover:text-gray-300">
              logout
            </button>
            {" | "}
            <em className="text-gray-300">{session.user?.name} logged in</em>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            {" | "}
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
