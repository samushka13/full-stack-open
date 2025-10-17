import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import theme from "../styles/theme";
import AppBar from "./app-bar/AppBar";
import RepositoryList from "./list/RepositoryList";
import MyReviews from "./my-reviews/MyReviews";
import ReviewForm from "./review/ReviewForm";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";

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
        <Route path="*" element={<RepositoryList />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;
