import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useUserDispatch, useUserValue } from "./UserContext";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import Spacer from "./components/Spacer";

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const style = {
    backgroundColor: "lightcyan",
    display: "flex",
    borderRadius: 5,
    paddingInline: 20,
    justifyContent: "center",
  };

  useEffect(() => {
    userDispatch({ type: "RESUME_SESSION" });
  }, [userDispatch]);

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <div style={style}>
        <h1>Welcome to the Bloglist!</h1>
      </div>

      <Spacer />

      <div>
        <Notification />

        {user ? (
          <>
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
    </div>
  );
};

export default App;
