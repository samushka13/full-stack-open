import { Link } from "react-router-native";

import CustomText from "./CustomText";

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to}>
      <CustomText fontWeight={"bold"} color={"textTertiary"}>
        {text}
      </CustomText>
    </Link>
  );
};

export default AppBarTab;
