import { View, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns";

import CustomText from "../CustomText";
import theme from "../../styles/theme";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  item: {
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

const ReviewItem = ({ review, showRepositoryName }) => {
  const date = format(parseISO(review.createdAt), "dd.MM.yyyy");

  const title = showRepositoryName
    ? review.repository.fullName
    : review.user.username;

  return (
    <View style={styles.item}>
      <View style={styles.rating}>
        <CustomText fontWeight={"bold"} color={"primary"}>
          {review.rating}
        </CustomText>
      </View>

      <View style={{ width: 15 }} />

      <View style={{ flex: 1 }}>
        <CustomText fontSize={"subheading"} fontWeight={"bold"}>
          {title}
        </CustomText>

        <ItemSeparator height={5} />

        <CustomText color={"textSecondary"}>{date}</CustomText>

        <ItemSeparator />

        <View style={{ flexDirection: "row", flexShrink: 1 }}>
          <CustomText multiline color={"textPrimary"}>
            {review.text}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
