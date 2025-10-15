import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textTertiary: "#ffffff",
    primary: "#0366d6",
    secondary: "#e1e4e8",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main:
      Platform.OS === "ios"
        ? "Arial"
        : Platform.OS === "android"
        ? "Roboto"
        : "System",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
