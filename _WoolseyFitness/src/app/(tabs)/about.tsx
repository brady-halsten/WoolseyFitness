
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles, bioImage } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { getFormattedDate } from "../utils/date";

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

        <View>
          <Text style={GlobalStyles.dateText}>
            {getFormattedDate()}
          </Text>
        </View>

        <View style={{ width: "100%" }}>
          <Text style={GlobalStyles.title}>Meet the Trainers!</Text>
        </View>

        {/* Christopher Woolsey */}
        <View>
          <Text style={GlobalStyles.subtitle}>
            Christopher Woolsey
          </Text>
        </View>

        <View style={bioImage.imageContainer}>
          <Image
            source={require("@/assets/images/chris_bio_pic.png")}
            style={bioImage.image}
          />
          <Text style={bioImage.bioText}>
          Allow me to reintroduce myself…. My name is Christopher Hans Woolsey,
          and to all my new haters I’ll give you a free pass; it’s not that you 
          forget, you just never knew. I AM HIM. 🙃😘

          {"\n\n"}

          What you see is what you get, we really are putting in work, getting 
          after it; and living our best lives.
          So if you’re on the fence and you’re looking for some corporate, 
          franchised, watered down revolving door of that same old bullshit, 
          just repackaged with a shiny new bow - keep on walking.
          {"\n\n"}
          
          High vibes, good energy and better people. So if you don’t belong,
          don’t be long 🤪 I’m doing my own thing, and I’m doing it better 
          than you could even dream it ✌🏼


            
          </Text>
        </View>

        {/* Justine Dore */}
        <View>
          <Text style={GlobalStyles.subtitle}>
            Justine Dore
          </Text>
        </View>

        <View style={bioImage.imageContainer}>
          <Image
            source={require("@/assets/images/justine_bio_pic.png")}
            style={bioImage.image}
          />
          <Text style={bioImage.bioText}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            Ad deserunt eiusmod accusamus est cum. Quibusdam duis dolor
            labore ullamco mollit in facere.

            {"\n\n"}
            Assumenda aute sunt sunt eligendi facere et qui qui. Aut est
            aliquip et possimus eiusmod amet animi. Exercitation quos et
            aut blanditiis minim dolore vero voluptas pariatur dolorem
            deserunt minim. Quod facilis at tempore id officia sunt officia
            dolore ducimus aute laborum. Labore eu nulla dolor at sunt odio
            ipsum eum et omnis voluptas.

            {"\n\n"}
            Ex officia officia veniam et fugiat cillum eiusmod sint in
            atque et voluptatum. Eos facilis enim laboris blanditiis
            adipiscing. In minus imperdiet est et fugiat.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
