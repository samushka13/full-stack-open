import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  const style = {
    color: notification.isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification.text) {
    return <div style={style}>{notification.text}</div>;
  }

  return <></>;
};

export default Notification;
