import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import theme from "../styles/theme";
import AppBar from "./app-bar/AppBar";
import RepositoryList from "./list/RepositoryList";
import SignIn from "./sign-in/SignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;
