import { useApolloClient, useMutation } from "@apollo/client/react";

import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const { data } = await authenticate({ variables: { credentials } });
    await authStorage.setAccessToken(data?.authenticate?.accessToken);
    await apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
