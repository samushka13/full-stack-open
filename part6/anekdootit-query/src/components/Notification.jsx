import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const text = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (text) return (
    <div style={style}>
      {text}
    </div>
  )

  return <></>
}

export default Notification
