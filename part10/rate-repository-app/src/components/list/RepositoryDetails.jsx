import { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import CustomText from "../CustomText";
import theme from "../../styles/theme";
import useRepository from "../../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
  reviewItem: {
    backgroundColor: theme.colors.textTertiary,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  rating: {
    alignItems: "center",
    aspectRatio: 1,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repo }) => {
  return (
    <View>
      <RepositoryItem item={repo} isDetailsView={true} />
      <ItemSeparator />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const date = format(parseISO(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewItem}>
      <View style={styles.rating}>
        <CustomText fontWeight={"bold"} color={"primary"}>
          {review.rating}
        </CustomText>
      </View>

      <View style={{ width: 15 }} />

      <View style={{ flex: 1 }}>
        <CustomText fontSize={"subheading"} fontWeight={"bold"}>
          {review.user.username}
        </CustomText>

        <View style={{ height: 5 }} />

        <CustomText color={"textSecondary"}>{date}</CustomText>

        <View style={{ height: 10 }} />

        <View style={{ flexDirection: "row", flexShrink: 1 }}>
          <CustomText multiline color={"textPrimary"}>
            {review.text}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const RepositoryDetails = ({ repo }) => {
  const { getRepositoryData, reviews } = useRepository(repo.id);

  const getRepoData = async (id) => {
    await getRepositoryData({ variables: { id } });
  };

  useEffect(() => {
    getRepoData(repo.id);
  }, [repo.id]);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
};

export default RepositoryDetails;
