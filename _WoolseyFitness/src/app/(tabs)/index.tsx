import {Link} from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function Index() {
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
          <Text style={GlobalStyles.title}>
          Welcome, Christopher!
          </Text>
        </View>

        <View style={GlobalStyles.centeredScreen}>
          <Text style={GlobalStyles.title}>Welcome to Woolsey Fitness!</Text>
        </View>
     </SafeAreaView>
   );
}