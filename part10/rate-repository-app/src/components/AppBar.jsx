import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    height: 100,
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        horizontal
      >
        <AppBarTab text={"Repositories"} to={"/"} />

        <View style={{ width: 20 }} />

        <AppBarTab text={"Sign In"} to={"/login"} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
