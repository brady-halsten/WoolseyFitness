
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useRouter } from "expo-router";
  import { Ionicons } from "@expo/vector-icons";
  
  import { GlobalStyles } from "@/constants/styles";
  import { Sizes } from "@/constants/theme";
  import { getFormattedDate } from "@/utils/date";
  
  const routines = [
    {
      id: "wzf-4x15",
      title: "WZF 4x15",
      subtitle: "Progressive strength training",
      icon: "barbell-outline" as const,
    },
    {
      id: "reformer-strength",
      title: "REFORMER x STRENGTH",
      subtitle: "Strength meets Pilates",
      icon: "fitness-outline" as const,
    },
    {
      id: "wzf-pilates",
      title: "PILATES",
      subtitle: "Strength, control and movement",
      icon: "body-outline" as const,
    },
  ];
  
  export default function WZFRoutines() {
    const router = useRouter();
  
    const handleRoutinePress = (categoryId: string) => {
      router.push({
        pathname: "/routines/[categoryId]",
        params: { categoryId: categoryId },
      });
    };
  
    return (
      <SafeAreaView style={GlobalStyles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
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
  
          <Text style={GlobalStyles.dateText}>
            {getFormattedDate()}
          </Text>
  
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.eyebrow}>WOOLSEY FITNESS</Text>
            <Text style={styles.pageTitle}>WZF ROUTINES</Text>
            <Text style={styles.pageSubtitle}>
              Choose your training program.
            </Text>
          </View>
  
          {/* Routine Categories */}
          <View style={styles.routinesContainer}>
            {routines.map((routine, index) => (
              <Pressable
                key={routine.id}
                onPress={() => handleRoutinePress(routine.id)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.routineCard,
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={routine.icon}
                      size={27}
                      color="#5DD1DC"
                    />
                  </View>
  
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>
                      {routine.title}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      {routine.subtitle}
                    </Text>
                  </View>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={23}
                  color="#5DD1DC"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    scrollContent: {
      paddingBottom: 32,
    },
  
    headingContainer: {
      paddingHorizontal: 20,
      marginTop: 28,
      marginBottom: 24,
    },
  
    eyebrow: {
      color: "#5DD1DC",
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 2,
      marginBottom: 8,
    },
  
    pageTitle: {
      color: "#FFFFFF",
      fontSize: 27,
      fontWeight: "900",
    },
  
    pageSubtitle: {
      color: "#AAAAAA",
      fontSize: 13,
      marginTop: 7,
    },
  
    routinesContainer: {
      paddingHorizontal: 20,
      gap: 14,
    },
  
    routineCard: {
      minHeight: 100,
      backgroundColor: "#202729",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#344347",
    },
  
    cardPressed: {
      opacity: 0.75,
      transform: [{ scale: 0.98 }],
    },
  
    cardLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 14,
    },
  
    iconContainer: {
      width: 54,
      height: 54,
      borderRadius: 16,
      backgroundColor: "#163A40",
      alignItems: "center",
      justifyContent: "center",
    },
  
    cardText: {
      flex: 1,
      gap: 6,
    },
  
    cardTitle: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "900",
    },
  
    cardSubtitle: {
      color: "#AAAAAA",
      fontSize: 11,
    },
  });
  