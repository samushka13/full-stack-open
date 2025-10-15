import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { Platform } from "react-native";
import Constants from "expo-constants";

const { apolloUriMobile, apolloUriWeb } = Constants.expoConfig.extra;

const uri = Platform.OS !== "web" ? apolloUriMobile : apolloUriWeb;
const httpLink = new HttpLink({ uri });

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const authorization = accessToken ? `Bearer ${accessToken}` : "";

      return { headers: { ...headers, authorization } };
    } catch (e) {
      console.error(e);

      return { headers };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });
};

export default createApolloClient;
