
import { StyleSheet } from "react-native";
import { Colors, Spacing } from "./theme";

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  centeredScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  headerRow: {
    width: "100%",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  content: {
    flex: 1,
    padding: Spacing.md,
  },

  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    color: Colors.text,
    fontSize: 16,
  },

  link: {
    color: Colors.primary,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
