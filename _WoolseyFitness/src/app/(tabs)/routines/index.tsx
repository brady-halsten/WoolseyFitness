
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { getFormattedDate } from "@/utils/date";

type RoutineCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  accentColor: string;
  onPress: () => void;
};

function RoutineCard({
  title,
  subtitle,
  icon,
  backgroundColor,
  accentColor,
  onPress,
}: RoutineCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Explore ${title}`}
      style={({ pressed }) => [
        styles.routineCard,
        { backgroundColor },
        pressed && styles.cardPressed,
      ]}
    >
      {/* Decorative background shapes */}
      <View style={styles.backgroundCircleLarge} />
      <View style={styles.backgroundCircleSmall} />

      {/* Graphic placeholder */}
      <View
        style={[
          styles.graphicContainer,
          { borderColor: accentColor },
        ]}
      >
        <Ionicons
          name={icon}
          size={54}
          color={accentColor}
        />
      </View>

      {/* Card content */}
      <View style={styles.cardContent}>
        <View
          style={[
            styles.accentLine,
            { backgroundColor: accentColor },
          ]}
        />

        <Text style={styles.cardTitle}>{title}</Text>

        <Text style={styles.cardSubtitle}>{subtitle}</Text>

        <View style={styles.cardArrow}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </View>
    </Pressable>
  );
}

export default function RoutinesIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Logo */}
        <View style={GlobalStyles.headerRow}>
          <Image
            source={require("@/assets/images/wzf_new_logo.jpg")}
            style={{
              width: Sizes.logo,
              height: Sizes.logo,
              resizeMode: "contain",
            }}
          />
        </View>

        {/* Date */}
        <Text style={GlobalStyles.dateText}>
          {getFormattedDate()}
        </Text>

        {/* Page Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.pageTitle}>CHOOSE A ROUTINE</Text>
          <Text style={styles.pageSubtitle}>
            Find your next workout.
          </Text>
        </View>

        {/* Routine Categories */}
        <View style={styles.cardsContainer}>
          <RoutineCard
            title="WZF ROUTINES"
            subtitle="Strength · Pilates · Reformer"
            icon="barbell-outline"
            backgroundColor="#163A40"
            accentColor="#5DD1DC"
            onPress={() =>
              router.push("/routines/wzf_routines")
            }
          />

          <RoutineCard
            title="MOVE WITH JUSTINE"
            subtitle="Strength · Pilates · Sculpt"
            icon="body-outline"
            backgroundColor="#51243F"
            accentColor="#F13F91"
            onPress={() =>
              router.push("/routines/move_with_justine")
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },

  headingContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 22,
  },

  pageTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  pageSubtitle: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 6,
  },

  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },

  routineCard: {
    flex: 1,
    minHeight: 390,
    borderRadius: 22,
    padding: 14,
    justifyContent: "space-between",
    overflow: "hidden",
  },

  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  backgroundCircleLarge: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: 35,
    right: -105,
  },

  backgroundCircleSmall: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 130,
    left: -75,
  },

  graphicContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1.5,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },

  cardContent: {
    gap: 10,
  },

  accentLine: {
    width: "65%",
    height: 4,
    borderRadius: 2,
    marginBottom: 6,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    lineHeight: 23,
  },

  cardSubtitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
    opacity: 0.85,
  },

  cardArrow: {
    alignSelf: "flex-end",
    marginTop: 12,
  },
});
