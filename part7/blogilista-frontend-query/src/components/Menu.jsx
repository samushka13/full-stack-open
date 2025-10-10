import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

import { useUserValue, useUserDispatch } from "../UserContext";
import { useNotificationDispatch } from "../NotificationContext";

const Menu = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const style = {
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "lightcyan",
    borderWidth: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  };

  const handleLogout = async () => {
    try {
      userDispatch({ type: "LOGOUT" });
      notificationDispatch({ type: "LOGOUT_SUCCESS" });
    } catch {
      notificationDispatch({ type: "LOGOUT_FAIL" });
    }
  };

  return (
    <AppBar style={style} variant="outlined" position="static">
      <Toolbar>
        <Button variant="outlined" color="primary" component={Link} to="/">
          Blogs
        </Button>

        <div style={{ width: 20 }} />

        <Button color="primary" variant="outlined" component={Link} to="/users">
          Users
        </Button>
      </Toolbar>

      <Toolbar>
        <p style={{ color: "black" }}>{user.username}</p>

        <div style={{ width: 20 }} />

        <Button
          onClick={handleLogout}
          color="secondary"
          variant="outlined"
          component={Link}
          to="/"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
