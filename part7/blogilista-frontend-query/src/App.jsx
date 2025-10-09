import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useUserDispatch, useUserValue } from "./UserContext";

import Blogs from "./components/Blogs";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    userDispatch({ type: "RESUME_SESSION" });
  }, [userDispatch]);

  return (
    <div>
      <h1>Welcome to the Bloglist!</h1>

      <Notification />

      {user ? (
        <>
          <Header />
          <Menu />

          <Routes>
            <Route index element={<Blogs />} />
            <Route path="users/*" element={<Users />} />
            <Route path="blogs/*" element={<Blogs />} />
          </Routes>
        </>
      ) : (
        <Togglable labelWhenNotVisible={"Login"}>
          <LoginForm />
        </Togglable>
      )}
    </div>
  );
};

export default App;
