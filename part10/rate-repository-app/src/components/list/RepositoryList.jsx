import { useState } from "react";
import { Route, Routes, useMatch, useNavigate } from "react-router-native";
import { TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

import useRepositories from "../../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import RepositoryDetails from "./RepositoryDetails";
import RepositoryListContainer from "./RepositoryListContainer";
import theme from "../../styles/theme";

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.textTertiary,
    borderBottomWidth: 1,
    borderColor: theme.colors.textSecondary,
    color: theme.colors.textPrimary,
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  picker: {
    borderWidth: 0,
    padding: 15,
  },
});

const RepositoryList = () => {
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [textFilter, setTextFilter] = useState("");
  const [searchKeyword] = useDebounce(textFilter, 500);

  const { repositories, error, loading, fetchMoreRepositories } =
    useRepositories({
      first: 5,
      orderBy,
      searchKeyword,
    });

  const match = useMatch("/repos/:id");
  const repo = match
    ? repositories.find((r) => r.node.id === match.params.id)?.node
    : null;

  const pickerItemPrefix = "Sort by:";

  const onPressItem = async (id) => navigate(`/repos/${id}`);

  const onEndReached = () => {
    fetchMoreRepositories();
  };

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
        <>
          <>
            <TextInput
              style={[styles.input]}
              placeholder="Filter by text"
              value={textFilter}
              onChangeText={setTextFilter}
            />

            <Picker
              style={styles.picker}
              selectedValue={orderBy}
              onValueChange={(itemValue) => setOrderBy(itemValue)}
            >
              <Picker.Item
                label={`${pickerItemPrefix} Latest Review`}
                value="CREATED_AT"
              />
              <Picker.Item
                label={`${pickerItemPrefix} Rating (desc.)`}
                value="RATING_AVERAGE"
              />
              <Picker.Item
                label={`${pickerItemPrefix} Rating (asc.)`}
                value="RATING_AVERAGE:ASC"
              />
            </Picker>

            <ItemSeparator />
          </>

          <RepositoryListContainer
            repositories={repositories}
            error={error}
            loading={loading}
            onPressItem={onPressItem}
            orderBy={orderBy}
            onEndReached={onEndReached}
          />
        </>
      )}
    </>
  );
};

export default RepositoryList;
