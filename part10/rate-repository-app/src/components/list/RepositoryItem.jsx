import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";

import theme from "../../styles/theme";
import useRepository from "../../hooks/useRepository";
import CustomText from "../CustomText";
import RepositoryItemKeyFigure from "./RepositoryItemKeyFigure";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textTertiary,
    marginBottom: 0,
    padding: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 20,
  },
});

const RepositoryItem = ({ item, isDetailsView }) => {
  const { getRepositoryData, url } = useRepository(item.id);

  const roundToK = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  const goToGitHubPage = async () => {
    url && (await Linking.openURL(url));
  };

  const getRepoData = async (id) => {
    await getRepositoryData({ variables: { id } });
  };

  useEffect(() => {
    isDetailsView && getRepoData(item.id);
  }, [isDetailsView, item.id]);

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ height: 50, aspectRatio: 1, borderRadius: 5 }}
          source={item.ownerAvatarUrl}
        />

        <View style={{ flex: 1, paddingLeft: 15 }}>
          <CustomText fontWeight={"bold"} fontSize={"subheading"}>
            {item.fullName}
          </CustomText>

          <View style={{ height: 10 }} />

          <CustomText color={"textSecondary"}>{item.description}</CustomText>

          <View style={{ height: 10 }} />

          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: theme.colors.primary,
              borderRadius: 4,
              padding: 6,
            }}
          >
            <CustomText color={"textTertiary"}>{item.language}</CustomText>
          </View>
        </View>
      </View>

      <View style={{ height: 15 }} />

      <View style={{ flexDirection: "row" }}>
        <RepositoryItemKeyFigure
          value={roundToK(item.stargazersCount)}
          subtitle={"Stars"}
        />
        <RepositoryItemKeyFigure
          value={roundToK(item.forksCount)}
          subtitle={"Forks"}
        />
        <RepositoryItemKeyFigure
          value={item.reviewCount}
          subtitle={"Reviews"}
        />
        <RepositoryItemKeyFigure
          value={item.ratingAverage}
          subtitle={"Rating"}
        />
      </View>

      {isDetailsView && url && (
        <>
          <View style={{ height: 15 }} />

          <Pressable style={styles.button} onPress={goToGitHubPage}>
            <CustomText fontWeight={"bold"} color={"textTertiary"}>
              Visit GitHub Page
            </CustomText>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default RepositoryItem;
