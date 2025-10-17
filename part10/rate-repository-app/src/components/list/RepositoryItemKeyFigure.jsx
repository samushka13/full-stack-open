import { View, StyleSheet } from "react-native";

import CustomText from "../CustomText";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const RepositoryItemKeyFigure = ({ value, subtitle }) => {
  return (
    <View style={styles.container}>
      <CustomText fontWeight={"bold"}>{value}</CustomText>
      <ItemSeparator height={5} />
      <CustomText color={"textSecondary"}>{subtitle}</CustomText>
    </View>
  );
};

export default RepositoryItemKeyFigure;
