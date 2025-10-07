import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.text) {
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }

  return <></>
}

export default Notification