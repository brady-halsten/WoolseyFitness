
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { getFormattedDate } from "@/utils/date";

import FeaturedClassCard from "@/components/home/FeaturedClassCard";

import {
  dummyMember,
  dummyBooking,
} from "@/data/dummyMember";

import { canBookClasses } from "@/utils/memberUtils";

export default function Index() {
  const router = useRouter();

  // Temporary member and booking data
  const upcomingBooking = dummyBooking;
  const memberCanBook = canBookClasses(dummyMember);

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView style={GlobalStyles.screen}>
        
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

        {/* Current Date */}
        <View>
          <Text style={GlobalStyles.dateText}>
            {getFormattedDate()}
          </Text>
        </View>

        {/* Welcome Message */}
        <Text style={GlobalStyles.title}>
          Let's get after it, {dummyMember.firstName}!
        </Text>

          {/* Featured Class Card */}
          {upcomingBooking ? (
            <FeaturedClassCard
              image={require("@/assets/images/FeaturedWorkoutImage.png")}
              label="YOUR NEXT CLASS"
              title={upcomingBooking.name}
              subtitle={`${upcomingBooking.date} · ${upcomingBooking.time}`}
              instructor={upcomingBooking.instructor}
              onPress={() => router.push("/schedule")}
            />
          ) : memberCanBook ? (
            <FeaturedClassCard
              image={require("@/assets/images/FeaturedWorkoutImage.png")}
              label="RECOMMENDED FOR YOU"
              title="Strength & Sculpt"
              subtitle="Explore your next workout."
              onPress={() => router.push("/schedule")}
            />
          ) : null}


      </ScrollView>
    </SafeAreaView>
  );
}
