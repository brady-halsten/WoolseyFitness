
import { View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { Link } from "expo-router";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const categoryName =
    categoryId === "strength" ? "Strength" : "Pilates";

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
