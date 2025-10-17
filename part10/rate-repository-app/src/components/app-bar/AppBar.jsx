import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client/react";

import { GET_CURRENT_USER } from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";

import AppBarTab from "./AppBarTab";
import useCurrentUser from "../../hooks/useCurrentUser";

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { user } = useCurrentUser();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        horizontal
      >
        <AppBarTab text={"Repositories"} to={"/"} />

        <View style={{ width: 20 }} />

        {user ? (
          <>
            <AppBarTab text={"Review"} to={"/review"} />

            <View style={{ width: 20 }} />

            <AppBarTab text={"My Reviews"} to={"/my-reviews"} />

            <View style={{ width: 20 }} />

            <AppBarTab text={"Sign Out"} to={"/login"} onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab text={"Sign In"} to={"/login"} />

            <View style={{ width: 20 }} />

            <AppBarTab text={"Sign Up"} to={"/signup"} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
