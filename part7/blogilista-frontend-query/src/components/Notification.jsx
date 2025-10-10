import { Alert } from "@mui/material";

import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  const style = {
    padding: 10,
    marginBottom: 10,
  };

  if (notification.text)
    return (
      <Alert
        style={style}
        severity={notification.isError ? "error" : "success"}
      >
        {notification.text}
      </Alert>
    );

  return <></>;
};

export default Notification;
