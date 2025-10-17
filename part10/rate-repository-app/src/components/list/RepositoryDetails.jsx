import { FlatList } from "react-native";

import useRepository from "../../hooks/useRepository";
import ReviewItem from "./ReviewItem";
import ReviewItemSeparator from "./ReviewItemSeparator";
import RepositoryInfo from "./RepositoryInfo";

const RepositoryDetails = ({ repo }) => {
  const reviewItemBatchSize = 5;

  const { url, reviews, fetchMoreReviews } = useRepository({
    id: repo.id,
    first: reviewItemBatchSize,
  });

  const onEndReached = () => {
    fetchMoreReviews();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo} url={url} />}
      ItemSeparatorComponent={() => <ReviewItemSeparator />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryDetails;
