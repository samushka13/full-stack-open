import { FlatList, View, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem";
import CustomText from "../CustomText";
import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <RepositoryItem item={item} />;

  if (loading) return <CustomText>Loading...</CustomText>;

  if (error) return <CustomText color={"error"}>{error.message}</CustomText>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
