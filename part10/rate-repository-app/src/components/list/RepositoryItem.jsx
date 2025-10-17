import { View, Image, StyleSheet } from "react-native";

import theme from "../../styles/theme";
import CustomText from "../CustomText";
import ItemSeparator from "./ItemSeparator";
import RepositoryItemKeyFigure from "./RepositoryItemKeyFigure";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textTertiary,
    marginBottom: 0,
    padding: 15,
  },
  image: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 6,
  },
  row: {
    flexDirection: "row",
  },
});

const RepositoryItem = ({ item }) => {
  const roundToK = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={item.ownerAvatarUrl} />

        <View style={styles.content}>
          <CustomText fontWeight={"bold"} fontSize={"subheading"}>
            {item.fullName}
          </CustomText>

          <ItemSeparator />

          <CustomText color={"textSecondary"}>{item.description}</CustomText>

          <ItemSeparator />

          <View style={styles.languageTag}>
            <CustomText color={"textTertiary"}>{item.language}</CustomText>
          </View>
        </View>
      </View>

      <ItemSeparator height={15} />

      <View style={styles.row}>
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
    </View>
  );
};

export default RepositoryItem;
