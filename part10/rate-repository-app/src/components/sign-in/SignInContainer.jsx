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
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be longer than 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be longer than 5 characters")
    .required("Password is required"),
});

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showUsernameError = formik.touched.username && formik.errors.username;
  const showPasswordError = formik.touched.password && formik.errors.password;

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

      <Pressable
        testID="sign-in"
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <CustomText fontWeight={"bold"} color={"textTertiary"}>
          Sign In
        </CustomText>
      </Pressable>
    </View>
  );
};

export default SignInContainer;
