
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "@/constants/styles";
import { Colors } from "@/constants/theme";
import { AvatarImage } from "@/components/profile/profileAvatar";
import { dummyMember } from "@/data/dummyMember";

export default function ProfileScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState(dummyMember.firstName);
  const [lastName, setLastName] = useState(dummyMember.lastName);

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.headerTitle}>MY PROFILE</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Photo */}
        <View style={styles.avatarSection}>
          <AvatarImage
            firstName={firstName}
            lastName={lastName}
            size={110}
          />

          <Text style={styles.memberName}>
            {firstName} {lastName}
          </Text>

          <Text style={styles.memberLabel}>WOOLSEY FITNESS MEMBER</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FIRST NAME</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor="#777777"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>LAST NAME</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor="#777777"
            />
          </View>
        </View>

        {/* Membership */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MEMBERSHIP</Text>

          <View style={styles.membershipCard}>
            <View>
              <Text style={styles.membershipLabel}>
                MEMBERSHIP STATUS
              </Text>
              <Text style={styles.membershipValue}>
                {dummyMember.hasActiveMembership
                  ? "Active"
                  : "Inactive"}
              </Text>
            </View>

            <View style={styles.creditContainer}>
              <Text style={styles.creditNumber}>
                {dummyMember.classCredits}
              </Text>
              <Text style={styles.creditLabel}>CREDITS LEFT</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  headerSpacer: {
    width: 42,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 36,
  },

  memberName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 16,
  },

  memberLabel: {
    color: "#5DD1DC",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 6,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: "#5DD1DC",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 16,
  },

  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    color: "#999999",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 16,
  },

  membershipCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  membershipLabel: {
    color: "#999999",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  membershipValue: {
    color: "#5DD1DC",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 6,
  },

  creditContainer: {
    alignItems: "center",
  },

  creditNumber: {
    color: "#F5D923",
    fontSize: 30,
    fontWeight: "900",
  },

  creditLabel: {
    color: "#999999",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
