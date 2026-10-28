
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function RoutinesIndex() {
  return (
    <SafeAreaView style={GlobalStyles.screen}>
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

      <View style={GlobalStyles.centeredScreen}>
        <Text style={GlobalStyles.title}>Choose a Routine</Text>

        <Link href="/routines/strength" style={GlobalStyles.link}>
          Strength
        </Link>

        <Link href="/routines/pilates" style={GlobalStyles.link}>
          Pilates
        </Link>
      </View>
    </SafeAreaView>
  );
}
