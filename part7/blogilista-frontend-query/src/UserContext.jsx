import { createContext, useReducer, useContext } from "react";
import blogService from "./services/blogs";

const userReducer = (state, action) => {
  let user = action.payload ?? null;

  switch (action.type) {
    case "LOGIN": {
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      return user;
    }
    case "RESUME_SESSION": {
      const loggedUserJSON = window.localStorage.getItem("loggedInUser");

      if (loggedUserJSON) {
        user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
      }

      return user;
    }
    case "LOGOUT": {
      blogService.setToken("");
      window.localStorage.removeItem("loggedInUser");

      return null;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const ctx = useContext(UserContext);
  return ctx[0];
};

export const useUserDispatch = () => {
  const ctx = useContext(UserContext);
  return ctx[1];
};

export default UserContext;
