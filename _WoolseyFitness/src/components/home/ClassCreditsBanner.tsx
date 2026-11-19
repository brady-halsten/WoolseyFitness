
import {
    View,
    Text,
    Pressable,
    StyleSheet,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  
  type ClassCreditsBannerProps = {
    credits: number;
    onPress: () => void;
  };
  
  export default function ClassCreditsBanner({
    credits,
    onPress,
  }: ClassCreditsBannerProps) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${credits} class credits. Manage membership`}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.topRow}>
          <Ionicons name="flash" size={17} color="#F5D923" />
          <Text style={styles.creditCount}>{credits}</Text>
        </View>
  
        <Text style={styles.label}>CREDITS</Text>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#30301D",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 9,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 76,
    },
  
    pressed: {
      opacity: 0.7,
    },
  
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
  
    creditCount: {
      color: "#F5D923",
      fontSize: 19,
      fontWeight: "900",
    },
  
    label: {
      color: "#F5D923",
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 1,
      marginTop: 2,
    },
  });
  