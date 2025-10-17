import * as yup from "yup";

import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";

import CustomText from "../CustomText";
import theme from "../../styles/theme";
import ItemSeparator from "../list/ItemSeparator";

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.colors.textSecondary,
    height: 50,
    padding: 10,
  },
  error: {
    borderColor: theme.colors.error,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 20,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string().optional(),
});

const ReviewFormContainer = ({
  repositories,
  reviewedRepositories,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const errors = formik.errors;
  const touched = formik.touched;
  const showOwnerNameError = touched.ownerName && errors.ownerName;
  const showRatingError = touched.rating && errors.rating;

  const getRepositoryName = (name) => name.split("/")[1] || name;

  const repositoryExists = repositories.some(
    (r) => getRepositoryName(r.node.fullName) === formik.values.repositoryName
  );
  const repositoryAlreadyReviewed = reviewedRepositories.some(
    (r) => getRepositoryName(r) === formik.values.repositoryName
  );

  const showRepositoryNameError =
    touched.repositoryName &&
    (errors.repositoryName || repositoryAlreadyReviewed || !repositoryExists);

  const repositoryNameErrorText =
    errors.repositoryName ||
    (repositoryAlreadyReviewed
      ? "You have already reviewed this repository"
      : "This repository does not exist");

  return (
    <View style={{ backgroundColor: theme.colors.textTertiary, padding: 15 }}>
      <TextInput
        testID="ownerName"
        style={[styles.input, showOwnerNameError && styles.error]}
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />

      {showOwnerNameError && (
        <View style={{ padding: 5 }}>
          <CustomText color={"error"}>{errors.ownerName}</CustomText>
        </View>
      )}

      <ItemSeparator />

      <TextInput
        testID="repositoryName"
        style={[styles.input, showRepositoryNameError && styles.error]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />

      {showRepositoryNameError && (
        <View style={{ padding: 5 }}>
          <CustomText color={"error"}>{repositoryNameErrorText}</CustomText>
        </View>
      )}

      <ItemSeparator />

      <TextInput
        testID="rating"
        style={[styles.input, showRatingError && styles.error]}
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />

      {showRatingError && (
        <View style={{ padding: 5 }}>
          <CustomText color={"error"}>{errors.rating}</CustomText>
        </View>
      )}

      <ItemSeparator />

      <TextInput
        testID="text"
        style={[styles.input, { minHeight: 100 }]}
        placeholder="text"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
      />

      <ItemSeparator />

      <Pressable
        testID="create"
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <CustomText fontWeight={"bold"} color={"textTertiary"}>
          Send
        </CustomText>
      </Pressable>
    </View>
  );
};

export default ReviewFormContainer;
