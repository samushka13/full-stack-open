import { View, StyleSheet, Pressable, Platform, Alert } from "react-native";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";

import { DELETE_REVIEW } from "../../graphql/mutations";
import ReviewItem from "../list/ReviewItem";
import theme from "../../styles/theme";
import CustomText from "../CustomText";
import { GET_CURRENT_USER } from "../../graphql/queries";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    paddingTop: 0,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    flex: 1,
    padding: 15,
  },
});

const MyReviewItem = ({ review }) => {
  const navigate = useNavigate();

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const onViewPress = () => {
    navigate(`/repos/${review.repository.id}`);
  };

  const onDelete = async () => {
    try {
      await deleteReview({ variables: { id: review.id } });
    } catch (e) {
      console.error(e);
    }
  };

  const confirmationText = "Are you sure you want to delete this review?";

  const onDeletePress = async () => {
    if (Platform.OS === "web") {
      window.confirm(confirmationText) && onDelete();
    } else {
      Alert.alert("Delete review", confirmationText, [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onDelete },
      ]);
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.textTertiary }}>
      <ReviewItem review={review} showRepositoryName />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onViewPress}>
          <CustomText fontWeight={"bold"} color={"textTertiary"}>
            View repository
          </CustomText>
        </Pressable>

        <View style={{ width: 10 }} />

        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.error }]}
          onPress={onDeletePress}
        >
          <CustomText fontWeight={"bold"} color={"textTertiary"}>
            Delete review
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
