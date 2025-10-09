import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: "", durationInSecs: 0, isError: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const showNotification = (notification) => {
  return async (dispatch) => {
    const notificationObject = {
      text: notification.text,
      durationInSecs: notification.durationInSecs ?? 5,
      isError: notification.isError ?? false,
    };

    dispatch(setNotification(notificationObject));

    setTimeout(
      () => dispatch(setNotification(initialState)),
      notificationObject.durationInSecs * 1000,
    );
  };
};

export default notificationSlice.reducer;
