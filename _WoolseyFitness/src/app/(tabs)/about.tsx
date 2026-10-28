
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function About() {
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
        <Text style={GlobalStyles.title}>About Woolsey Fitness</Text>
        <Text style={GlobalStyles.text}>
          Welcome to Woolsey Fitness!
        </Text>
      </View>
    </SafeAreaView>
  );
}
