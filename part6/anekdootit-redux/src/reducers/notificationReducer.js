import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const showNotification = (notification) => {
  return async dispatch => {
    dispatch(setNotification(notification))

    setTimeout(() => {
      dispatch(setNotification({ text: '', durationInSecs: 0 }))
    }, (notification.durationInSecs ?? 5) * 1000)
  }
}

export default notificationSlice.reducer
