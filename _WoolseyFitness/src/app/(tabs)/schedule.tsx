import {Link} from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function Schedule() {
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
          <Text style={GlobalStyles.title}>Book a Class!</Text>
          <Text style={GlobalStyles.text}>
            View Class Schedule
          </Text>
        </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-betweeen',
   },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
   },
  text: {
  color: "white"
  },
  button: {
  fontSize: 20,
  textDecorationLine: "underline",
  color: "#fff"
  }
});
