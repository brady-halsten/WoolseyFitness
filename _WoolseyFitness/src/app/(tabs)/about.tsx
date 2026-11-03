
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function About() {
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
      <View style={{width: "100%"}}>
      <Text style={GlobalStyles.title}>Meet the Trainers!</Text>

      </View>

      <View>
      <Text style={GlobalStyles.subtitle}>
          Christopher Woolsey
        </Text>
      </View>
      <View style={GlobalStyles.textContainer}>
        <Text style={GlobalStyles.text}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Ad deserunt eiusmod accusamus est cum. Quibusdam duis dolor labore ullamco mollit in facere.

Assumenda aute sunt sunt eligendi facere et qui qui. Aut est aliquip et possimus eiusmod amet animi. Exercitation quos et aut blanditiis minim dolore vero voluptas pariatur dolorem deserunt minim. Quod facilis at tempore id officia sunt officia dolore ducimus aute laborum. Labore eu nulla dolor at sunt odio ipsum eum et omnis voluptas.

Ex officia officia veniam et fugiat cillum eiusmod sint in atque et voluptatum. Eos facilis enim laboris blanditiis adipiscing. In minus imperdiet est et fugiat.
        </Text>
      </View>
      <View>
      <Text style={GlobalStyles.subtitle}>
          Justine Dore
        </Text>
      </View>
      <View style={GlobalStyles.textContainer}>
        <Text style={GlobalStyles.text}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Ad deserunt eiusmod accusamus est cum. Quibusdam duis dolor labore ullamco mollit in facere.

Assumenda aute sunt sunt eligendi facere et qui qui. Aut est aliquip et possimus eiusmod amet animi. Exercitation quos et aut blanditiis minim dolore vero voluptas pariatur dolorem deserunt minim. Quod facilis at tempore id officia sunt officia dolore ducimus aute laborum. Labore eu nulla dolor at sunt odio ipsum eum et omnis voluptas.

Ex officia officia veniam et fugiat cillum eiusmod sint in atque et voluptatum. Eos facilis enim laboris blanditiis adipiscing. In minus imperdiet est et fugiat.
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
