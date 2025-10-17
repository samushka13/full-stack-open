import Constants from "expo-constants";
import { Platform } from "react-native";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";

const { apolloUriMobile, apolloUriWeb } = Constants.expoConfig.extra;

const uri = Platform.OS !== "web" ? apolloUriMobile : apolloUriWeb;
const httpLink = new HttpLink({ uri });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

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

  const link = authLink.concat(httpLink);

  const defaultOptions = { watchQuery: { fetchPolicy: "cache-and-network" } };

  return new ApolloClient({ link, cache, defaultOptions });
};

export default createApolloClient;
