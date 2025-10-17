import { View, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";

import theme from "../../styles/theme";
import CustomText from "../CustomText";
import RepositoryItem from "./RepositoryItem";
import ReviewItemSeparator from "./ReviewItemSeparator";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.textTertiary,
    padding: 15,
    paddingTop: 0,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
  },
});

const RepositoryInfo = ({ repo, url }) => {
  const goToGitHubPage = async () => {
    url && (await Linking.openURL(url));
  };

  return (
    <View>
      <RepositoryItem item={repo} isDetailsView={true} />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={goToGitHubPage}>
          <CustomText fontWeight={"bold"} color={"textTertiary"}>
            Visit GitHub Page
          </CustomText>
        </Pressable>
      </View>

      <ReviewItemSeparator />
    </View>
  );
};

export default RepositoryInfo;
