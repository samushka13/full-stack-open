import { useState } from "react";
import { Button } from "@mui/material";

import Spacer from "./Spacer";

const Togglable = ({
  labelWhenVisible,
  labelWhenNotVisible,
  icon,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (isVisible) {
    return (
      <>
        <div>{children}</div>

        <Spacer />

        <div>
          <Button onClick={toggleVisibility} color="primary">
            {labelWhenVisible ?? "Cancel"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <Button
        startIcon={icon}
        onClick={toggleVisibility}
        variant="contained"
        color="primary"
      >
        {labelWhenNotVisible}
      </Button>
    </div>
  );
};

export default Togglable;
