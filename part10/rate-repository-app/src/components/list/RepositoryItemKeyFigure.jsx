import { View } from "react-native";
import CustomText from "../CustomText";

const RepositoryItemKeyFigure = ({ value, subtitle }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <CustomText fontWeight={"bold"}>{value}</CustomText>
      <View style={{ height: 5 }} />
      <CustomText color={"textSecondary"}>{subtitle}</CustomText>
    </View>
  );
};

export default RepositoryItemKeyFigure;
