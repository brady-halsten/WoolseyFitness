import {
    Image,
    View,
    Text,
    StyleSheet,
    Pressable,
  } from "react-native";
  
  import { Colors } from "@/constants/theme";
  
  type AvatarImageProps = {
    firstName: string;
    lastName?: string;
    imageUri?: string | null;
    size?: number;
    onPress?: () => void;
  };
  
  export function AvatarImage({
    firstName,
    lastName = "",
    imageUri,
    size = 44,
    onPress,
  }: AvatarImageProps) {
  
    const initials = (
        (firstName ?? "").trim().charAt(0) +
        (lastName ?? "").trim().charAt(0)
      ).toUpperCase();
  
    return (
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : undefined}
        accessibilityLabel={
          onPress ? "Change profile photo" : "Member avatar"
        }
      >
        <View
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text
              style={[
                styles.initials,
                { fontSize: size * 0.36 },
              ]}
            >
              {initials || "?"}
            </Text>
          )}
        </View>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    avatar: {
      backgroundColor: Colors.primary,
      borderWidth: 2,
      borderColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  
    image: {
      width: "100%",
      height: "100%",
    },
  
    initials: {
      color: Colors.background,
      fontWeight: "700",
    },
  });