import { useNotificationDispatch } from "../NotificationContext";
import { useUserDispatch, useUserValue } from "../UserContext";

const Header = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const handleLogout = async () => {
    try {
      userDispatch({ type: "LOGOUT" });
      notificationDispatch({ type: "LOGOUT_SUCCESS" });
    } catch {
      notificationDispatch({ type: "LOGOUT_FAIL" });
    }
  };

  return (
    <div>
      {user.name} is logged in&nbsp;
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
      <p></p>
    </div>
  );
};

export default Header;
