import { useEffect } from "react";
import { createContext, useReducer, useContext } from "react";

const INITIAL_NOTIFICATION = { text: "", durationInSecs: 0, isError: false };

const notificationReducer = (state, action) => {
  const payload = action.payload ?? {};

  const notification = {
    ...INITIAL_NOTIFICATION,
    durationInSecs: payload.durationInSecs ?? 3,
    isError: payload.isError ?? false,
  };

  switch (action.type) {
    case "INVALID_CREDENTIALS":
      return {
        ...notification,
        text: "Invalid credentials!",
        isError: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...notification,
        text: "Logout successful!",
      };
    case "LOGOUT_FAIL":
      return {
        ...notification,
        text: "Logout failed!",
        isError: true,
      };
    case "ADD_SUCCESS":
      return {
        ...notification,
        text: `"${payload.title}" was added!`,
      };
    case "ADD_FAIL":
      return {
        ...notification,
        text: `Adding "${payload.title}" failed!`,
        isError: true,
      };
    case "LIKE_SUCCESS":
      return {
        ...notification,
        text: `"${payload.title}" liked!`,
      };
    case "LIKE_FAIL":
      return {
        ...notification,
        text: `Liking "${payload.title}" failed!`,
        isError: true,
      };
    case "COMMENT_SUCCESS":
      return {
        ...notification,
        text: `"Comment on ${payload.title}" added!`,
      };
    case "COMMENT_FAIL":
      return {
        ...notification,
        text: `Commenting on "${payload.title}" failed!`,
        isError: true,
      };
    case "DELETE_SUCCESS":
      return {
        ...notification,
        text: `"${payload.title}" was deleted!`,
      };
    case "DELETE_FAIL":
      return {
        ...notification,
        text: `Deleting "${payload.title}" failed!`,
        isError: true,
      };
    case "HIDE":
      return INITIAL_NOTIFICATION;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    INITIAL_NOTIFICATION,
  );

  useEffect(() => {
    notification &&
      setTimeout(() => notificationDispatch({ type: "HIDE" }), 5000);
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const ctx = useContext(NotificationContext);
  return ctx[0];
};

export const useNotificationDispatch = () => {
  const ctx = useContext(NotificationContext);
  return ctx[1];
};

export default NotificationContext;
