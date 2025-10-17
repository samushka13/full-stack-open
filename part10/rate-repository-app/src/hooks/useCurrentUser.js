import { useQuery } from "@apollo/client/react";

import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  const user = data?.me || null;

  const reviewedRepositories = user?.reviews?.edges?.map((r) => r.node);

  return { data, user, reviewedRepositories, error, loading };
};

export default useCurrentUser;
