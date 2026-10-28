import { Image, StyleSheet} from "react-native";

export const bannerImage = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
      },
      featured: {
        width: "100%",
        aspectRatio: 1.7,
        borderRadius: 16,
      },
      featuredImage: {
        flex: 1,
        justifyContent: "flex-end",
      },
      
})