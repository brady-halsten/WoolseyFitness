import {Link} from "expo-router";
import { Text, View, Image, StyleSheet,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function Index() {
  const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
  return (
  <ScrollView style={GlobalStyles.screen}>
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
          <View>
            <Text style={GlobalStyles.text}>
              {formattedDate}
            </Text>
          </View>
          <Text style={GlobalStyles.title}>
          Let's get after it, Chris!
          </Text>
        <View style={GlobalStyles.imageWrapper}>
          <Image
            source={require("@/assets/images/FeaturedWorkoutImage.png")}
            style={GlobalStyles.featuredImage}
            resizeMode="cover"
          />
        </View>
     </SafeAreaView>
    </ScrollView>
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
    alignItems: 'center',
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
