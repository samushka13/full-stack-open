const Notification = ({ message }) => {
  const style = {
    color: message.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

export default Notification