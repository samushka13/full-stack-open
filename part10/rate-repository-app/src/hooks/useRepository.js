import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id, first, after }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first, after },
  });

  const repository = data?.repository || null;
  const url = repository?.url || null;
  const reviews = repository?.reviews?.edges || [];

  const fetchMoreReviews = () => {
    const canFetchMore = !loading && repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const after = repository.reviews.pageInfo.endCursor;

    const variables = { id, first, after };

    fetchMore({ variables });
  };

  return {
    repository,
    url,
    reviews,
    error,
    loading,
    fetchMoreReviews,
  };
};

export default useRepository;
