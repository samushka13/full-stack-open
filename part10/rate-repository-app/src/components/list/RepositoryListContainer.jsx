import { FlatList, View, Pressable } from "react-native";

import CustomText from "../CustomText";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";

const RepositoryListContainer = ({
  repositories,
  error,
  loading,
  orderBy,
  onPressItem,
  onEndReached,
}) => {
  const repositoryNodes = repositories.map((r) => r.node);

  const sortedRepositoryNodes =
    orderBy === "RATING_AVERAGE"
      ? repositoryNodes.sort((a, b) => b.ratingAverage - a.ratingAverage)
      : orderBy === "RATING_AVERAGE:ASC"
      ? repositoryNodes.sort((a, b) => a.ratingAverage - b.ratingAverage)
      : repositoryNodes;

  const renderItem = ({ item }) => (
    <Pressable disabled={!onPressItem} onPress={() => onPressItem(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  if (!repositoryNodes.length && loading)
    return (
      <View style={{ padding: 15 }}>
        <CustomText>Loading repositories...</CustomText>
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 15 }}>
        <CustomText color={"error"}>{error.message}</CustomText>
      </View>
    );

  return (
    <FlatList
      data={sortedRepositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryListContainer;
