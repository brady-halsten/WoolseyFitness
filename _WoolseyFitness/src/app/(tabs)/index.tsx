
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { getFormattedDate } from "@/utils/date";

import FeaturedClassCard from "@/components/home/FeaturedClassCard";
import { AvatarImage } from "@/components/profile/profileAvatar";

import { dummyMember } from "@/data/dummyMember";
import { getProfileImage } from "@/data/profileStorage";

import {
  ClassItem,
  getBookings,
  getNextUpcomingBooking,
} from "../../data/bookingStorage";

import ClassCreditsBanner from "@/components/home/ClassCreditsBanner";

type ServiceTileProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  onPress: () => void;
};

function ServiceTile({
  title,
  subtitle,
  icon,
  backgroundColor,
  onPress,
}: ServiceTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.serviceTile,
        { backgroundColor },
        pressed && styles.tilePressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={25} color="#171717" />
      </View>

      <View style={styles.tileTextContainer}>
        <Text style={styles.tileTitle}>{title}</Text>
        <Text style={styles.tileSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

export default function Index() {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bookings, setBookings] = useState<ClassItem[]>([]);

  // Refresh profile image and bookings whenever Home becomes active.
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHomeData = async () => {
        const [savedImage, savedBookings] = await Promise.all([
          getProfileImage(),
          getBookings(),
        ]);

        if (isActive) {
          setProfileImage(savedImage);
          setBookings(savedBookings);
        }
      };

      loadHomeData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const upcomingBooking = getNextUpcomingBooking(bookings);

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleSchedulePress = () => {
    router.push("/schedule");
  };

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView
        style={GlobalStyles.screen}
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

          <AvatarImage
            firstName={dummyMember.firstName}
            lastName={dummyMember.lastName}
            imageUri={profileImage}
            size={64}
            onPress={handleProfilePress}
          />
        </View>

        {/* Date */}
        <Text style={GlobalStyles.dateText}>
          {getFormattedDate()}
        </Text>

        <View style={GlobalStyles.headerRow}>
          {/* Member Greeting */}
          <Text style={GlobalStyles.subtitle}>
            Let's get after it, {dummyMember.firstName}!
          </Text>

          <ClassCreditsBanner
            credits={dummyMember.classCredits}
            onPress={() => router.push("/profile")}
          />
        </View>

        {/* Next Booked Class */}
        {upcomingBooking ? (
          <FeaturedClassCard
            image={require("@/assets/images/FeaturedWorkoutImage.png")}
            label="YOUR NEXT CLASS"
            title={upcomingBooking.name}
            subtitle={`${upcomingBooking.date} · ${upcomingBooking.time}`}
            instructor={upcomingBooking.instructor}
            onPress={handleSchedulePress}
          />
        ) : (
          <FeaturedClassCard
            image={require("@/assets/images/FeaturedWorkoutImage.png")}
            label="YOUR NEXT CLASS"
            title="Nothing booked just yet"
            subtitle="Explore the schedule and book your next workout!"
            onPress={handleSchedulePress}
          />
        )}

        {/* Find Your Fit */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionEyebrow}>
            TRAIN YOUR WAY
          </Text>

          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>
              FIND YOUR FIT
            </Text>

            <Pressable
              onPress={handleSchedulePress}
              accessibilityRole="button"
              accessibilityLabel="Explore the schedule"
              style={styles.sectionArrow}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          {/* Service Tiles */}
          <View style={styles.tilesContainer}>
            <ServiceTile
              title="PERSONAL TRAINING"
              subtitle="1-on-1 coaching"
              icon="barbell-outline"
              backgroundColor="#5DD1DC"
              onPress={handleSchedulePress}
            />

            <ServiceTile
              title="GROUP CLASSES"
              subtitle="Move together"
              icon="people-outline"
              backgroundColor="#F13F91"
              onPress={handleSchedulePress}
            />

            <ServiceTile
              title="BOOT CAMPS"
              subtitle="Push your limits"
              icon="flash-outline"
              backgroundColor="#F5D923"
              onPress={handleSchedulePress}
            />
          </View>
        </View>

        {/* Stay Connected */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionEyebrow}>
            STAY CONNECTED
          </Text>

          <View style={styles.socialCards}>
            <Pressable
              onPress={() =>
                Linking.openURL("https://www.instagram.com/woolsey_fitness/")
              }
              accessibilityRole="link"
              accessibilityLabel="Follow Woolsey Fitness on Instagram"
              style={({ pressed }) => [
                styles.socialCard,
                styles.instagramCard,
                pressed && styles.tilePressed,
              ]}
            >
              <Ionicons name="logo-instagram" size={26} color="#FFFFFF" />

              <View style={styles.socialText}>
                <Text style={styles.socialTitle}>INSTAGRAM</Text>
                <Text style={styles.socialSubtitle}>
                  Follow our journey
                </Text>
              </View>

              <Ionicons name="open-outline" size={18} color="#FFFFFF" />
            </Pressable>

            <Pressable
              onPress={() =>
                Linking.openURL("https://www.yelp.com/biz/woolsey-fitness-livermore")
              }
              accessibilityRole="link"
              accessibilityLabel="Leave Woolsey Fitness a Yelp review"
              style={({ pressed }) => [
                styles.socialCard,
                styles.yelpCard,
                pressed && styles.tilePressed,
              ]}
            >
              <Ionicons name="star" size={26} color="#FFFFFF" />

              <View style={styles.socialText}>
                <Text style={styles.socialTitle}>YELP REVIEWS</Text>
                <Text style={styles.socialSubtitle}>
                  Share your experience
                </Text>
              </View>

              <Ionicons name="open-outline" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },

  servicesSection: {
    marginTop: 36,
    paddingHorizontal: 20,
  },

  sectionEyebrow: {
    color: "#5DD1DC",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2.5,
    marginBottom: 12,
  },

  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  sectionArrow: {
    width: 48,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },

  tilesContainer: {
    flexDirection: "row",
    gap: 10,
  },

  serviceTile: {
    flex: 1,
    minHeight: 150,
    borderRadius: 22,
    padding: 14,
    justifyContent: "space-between",
  },

  tilePressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  tileTextContainer: {
    gap: 7,
  },

  tileTitle: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 15,
  },

  tileSubtitle: {
    color: "#222222",
    fontSize: 10,
    fontWeight: "600",
  },

  socialSection: {
    marginTop: 36,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  socialCards: {
    gap: 12,
  },

  socialCard: {
    minHeight: 76,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  instagramCard: {
    backgroundColor: "#B83F83",
  },

  yelpCard: {
    backgroundColor: "#C83232",
  },

  socialText: {
    flex: 1,
    gap: 4,
  },

  socialTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  socialSubtitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    opacity: 0.9,
  },
});
