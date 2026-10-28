
import { StyleSheet } from "react-native";
import { Colors, Spacing } from "./theme";

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
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
  description: {
    color: "#aaaaaa",
    fontSize: 15,
    marginBottom: 28,
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

  input: {
    backgroundColor: "#222222",
    borderColor: "#383838",
    borderWidth: 1,
    borderRadius: 12,
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 14,
  },
  error: {
    color: "#f34491",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f8dc28",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  imageWrapper: {
    width: '80%',
    height: 150, // Explicit height constraint for the flex item
    marginTop: 28,
  },
  featuredImage: {
    width: '100%',
    height: '100%', // Fills the parent imageWrapper completely
    borderRadius: 20,
  },
});
