
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    StyleSheet,
  } from "react-native";
  
  import type { ImageSourcePropType } from "react-native";
  
  type FeaturedClassCardProps = {
    image: ImageSourcePropType;
    label: string;
    title: string;
    subtitle: string;
    instructor?: string;
    onPress: () => void;
  };
  
  export default function FeaturedClassCard({
    image,
    label,
    title,
    subtitle,
    instructor,
    onPress,
  }: FeaturedClassCardProps) {
    return (
      <Pressable onPress={onPress} style={styles.card}>
        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={styles.imageBorder}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
  
            {instructor ? (
              <Text style={styles.instructor}>
                Instructor: {instructor}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      width: "100%",
      height: 230,
      borderRadius: 20,
      overflow: "hidden",
      marginVertical: 16,
    },
    image: {
      flex: 1,
      justifyContent: "flex-end",
    },
    imageBorder: {
      borderRadius: 20,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.68)",
      padding: 18,
    },
    label: {
      color: "#F8DC28",
      fontSize: 12,
      fontWeight: "bold",
      letterSpacing: 1.5,
      marginBottom: 6,
    },
    title: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    subtitle: {
      color: "#FFFFFF",
      fontSize: 14,
    },
    instructor: {
      color: "#DDDDDD",
      fontSize: 12,
      marginTop: 6,
    },
  });
  