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
  errorTextContainer: {
    padding: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 20,
  },
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username length must be 5–30 characters")
    .max(30, "Username length must be 5–30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password length must be 5–50 characters")
    .max(50, "Password length must be 5–50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showUsernameError = formik.touched.username && formik.errors.username;
  const showPasswordError = formik.touched.password && formik.errors.password;
  const showPasswordConfirmationError =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  return (
    <View style={{ backgroundColor: theme.colors.textTertiary, padding: 15 }}>
      <TextInput
        testID="username"
        style={[styles.input, showUsernameError && styles.error]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />

      {showUsernameError && (
        <View style={styles.errorTextContainer}>
          <CustomText color={"error"}>{formik.errors.username}</CustomText>
        </View>
      )}

      <ItemSeparator />

      <TextInput
        testID="password"
        style={[styles.input, showPasswordError && styles.error]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />

      {showPasswordError && (
        <View style={styles.errorTextContainer}>
          <CustomText color={"error"}>{formik.errors.password}</CustomText>
        </View>
      )}

      <ItemSeparator />

      <TextInput
        testID="passwordConfirmation"
        style={[styles.input, showPasswordConfirmationError && styles.error]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
      />

      {showPasswordConfirmationError && (
        <View style={styles.errorTextContainer}>
          <CustomText color={"error"}>
            {formik.errors.passwordConfirmation}
          </CustomText>
        </View>
      )}

      <ItemSeparator />

      <Pressable
        testID="sign-up"
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <CustomText fontWeight={"bold"} color={"textTertiary"}>
          Sign Up
        </CustomText>
      </Pressable>
    </View>
  );
};

export default SignUpContainer;
