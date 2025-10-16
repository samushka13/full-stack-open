import { useLazyQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = () => {
  const [getRepositoryData, { data, error, loading }] =
    useLazyQuery(GET_REPOSITORY);

  const repository = data?.repository || null;
  const url = repository?.url || null;
  const reviews = repository?.reviews?.edges || [];

  return { getRepositoryData, repository, url, reviews, error, loading };
};

export default useRepository;
