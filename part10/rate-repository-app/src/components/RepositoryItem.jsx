import { View, Image, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import RepositoryItemKeyFigure from "./RepositoryItemKeyFigure";
import theme from "../styles/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textTertiary,
    marginBottom: 0,
    padding: 15,
  },
});

const RepositoryItem = ({ item }) => {
  const roundToK = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;
