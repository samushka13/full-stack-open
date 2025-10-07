import { useEffect } from 'react'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADDED":
        return `"${action.payload}" was added!`
    case "VOTED":
        return `You voted for "${action.payload}"!`
    case "ANECDOTE_LENGTH":
        return 'The anecdote length must be at least 5 characters!'
    case "HIDE":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  useEffect(() => {
    notification && setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000)
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const ctx = useContext(NotificationContext)
  return ctx[0]
}

export const useNotificationDispatch = () => {
  const ctx = useContext(NotificationContext)
  return ctx[1]
}

export default NotificationContext
