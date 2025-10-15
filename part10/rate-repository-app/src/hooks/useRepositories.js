import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  const repositories = data?.repositories;

  return { repositories, error, loading };
};

export default useRepositories;
