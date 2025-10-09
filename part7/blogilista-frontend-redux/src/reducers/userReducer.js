import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export const handleUserLoginStatusCheck = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const handleLogout = () => {
  return async (dispatch) => {
    blogService.setToken("");
    window.localStorage.removeItem("loggedInUser");
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
