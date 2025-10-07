import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const handleNotification = () => {
    notification && setTimeout(() => dispatch(setNotification('')), 5000)
  }

  useEffect(handleNotification, [notification, dispatch])
    
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return <></>
}

export default Notification