import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client/react";

import { GET_CURRENT_USER } from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(GET_CURRENT_USER);

  const currentUserExists = Boolean(data?.me);

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

        {currentUserExists ? (
          <AppBarTab text={"Sign Out"} to={"/login"} onPress={signOut} />
        ) : (
          <AppBarTab text={"Sign In"} to={"/login"} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
