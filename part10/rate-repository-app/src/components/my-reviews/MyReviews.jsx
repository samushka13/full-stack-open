import { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import useCurrentUser from "../../hooks/useCurrentUser";
import ReviewItem from "../list/ReviewItem";
import MyReviewItem from "./MyReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviewedRepositories } = useCurrentUser();

  return (
    <FlatList
      data={reviewedRepositories}
      renderItem={({ item }) => <MyReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
};

export default MyReviews;
