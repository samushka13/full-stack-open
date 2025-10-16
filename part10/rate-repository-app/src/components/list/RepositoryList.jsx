import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Route, Routes, useMatch, useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import CustomText from "../CustomText";
import useRepositories from "../../hooks/useRepositories";
import RepositoryDetails from "./RepositoryDetails";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  error,
  loading,
  onPressItem,
}) => {
  const repositoryNodes = repositories.map((r) => r.node);

  const renderItem = ({ item }) => (
    <Pressable disabled={!onPressItem} onPress={() => onPressItem(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  if (loading) return <CustomText>Loading...</CustomText>;

  if (error) return <CustomText color={"error"}>{error.message}</CustomText>;

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();
  const navigate = useNavigate();
  const match = useMatch("/repos/:id");
  const repo = match
    ? repositories.find((r) => r.node.id === match.params.id)?.node
    : null;

  const onPressItem = async (id) => navigate(`/repos/${id}`);

  return (
    <>
      {repo ? (
        <Routes>
          <Route
            path="/repos/:id"
            element={<RepositoryDetails repo={repo} />}
          />
        </Routes>
      ) : (
        <RepositoryListContainer
          repositories={repositories}
          error={error}
          loading={loading}
          onPressItem={onPressItem}
        />
      )}
    </>
  );
};

export default RepositoryList;
