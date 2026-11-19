
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
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    padding: Spacing.md,
  },

  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 15,
    padding: Spacing.sm,
  },
  dateText: {
    color: "#aaaaaa",
    fontSize: 12,
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
    width: '100%',
    height: 250, // Explicit height constraint for the flex item
    marginTop: 28,
    alignItems: "center",
  },
  featuredImage: {
    width: '100%',
    height: '100%', // Fills the parent imageWrapper completely
    borderRadius: 20,
  },
  keyboardView: {
    flex: 1,
  },
  
  container: {
    flex: 1,
    width: "100%",
    padding: Spacing.md,
  },
  
  form: {
    width: "100%",
    gap: Spacing.sm,
  },
  textContainer: {
    flex: 0.5,
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

  },
  
});

export const avatarImage = StyleSheet.create({
  avatarImageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    gap: Spacing.md,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: Colors.primary,
    flexShrink: 0,
  }
});

export const bioImage = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    gap: Spacing.md,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: Colors.primary,
    flexShrink: 0,
  },
  bioText: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 21,
    flexShrink: 1,
  },
});