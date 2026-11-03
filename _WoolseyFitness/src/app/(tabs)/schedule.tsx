import {Link} from "expo-router";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import ClassCalendar from "@/components/Booking/ClassCalendar";

export default function Schedule() {
  return (
  
  <SafeAreaView style={GlobalStyles.screen}>
    <ScrollView>
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

          <View style={{ width: "100%" }}>
            <Text style={GlobalStyles.title}>
              Full Class Schedule
            </Text>
          </View>

          <View style={GlobalStyles.centeredScreen}>
            <ClassCalendar />
          </View>
          </ScrollView>
        </SafeAreaView>
      
   );
}

