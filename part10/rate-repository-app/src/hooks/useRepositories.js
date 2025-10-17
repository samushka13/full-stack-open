import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (vars) => {
  const first = vars?.first;
  const after = vars?.after;
  const searchKeyword = vars?.searchKeyword;

  const orderBy = vars?.orderBy?.includes("RATING_AVERAGE")
    ? vars?.orderBy?.split(":")[0]
    : vars?.orderBy;

  const orderDirection = vars?.orderBy?.includes(":ASC") ? "ASC" : "DESC";

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { first, after, orderBy, orderDirection, searchKeyword },
  });

  const repositories = data?.repositories?.edges || [];

  const fetchMoreRepositories = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const after = data.repositories.pageInfo.endCursor;

    const variables = { first, after, orderBy, orderDirection, searchKeyword };

    fetchMore({ variables });
  };

  return { data, repositories, error, loading, fetchMoreRepositories };
};

export default useRepositories;
