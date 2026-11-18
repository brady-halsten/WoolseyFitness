
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { GlobalStyles } from "@/constants/styles";
import { AvatarImage } from "@/components/profile/profileAvatar";
import { dummyMember } from "@/data/dummyMember";

import { getProfileImage,
        saveProfileImage,
        removeProfileImage } from "@/data/profileStorage";

export default function ProfileScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState(dummyMember.firstName);
  const [lastName, setLastName] = useState(dummyMember.lastName);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [savingImage, setSavingImage] = useState(false);

  // Load saved profile photo
  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      try {
        const savedImage = await getProfileImage();

        if (isMounted) {
          setImageUri(savedImage);
        }
      } catch (error) {
        console.error("Unable to load profile image:", error);
      } finally {
        if (isMounted) {
          setLoadingImage(false);
        }
      }
    }

    loadImage();

    return () => {
      isMounted = false;
    };
  }, []);

  // Select and save a profile photo
  const handleChangePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Photo Access Required",
          "Please allow Woolsey Fitness to access your photos in your device settings."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const selectedUri = result.assets[0].uri;

      setSavingImage(true);

      await saveProfileImage(selectedUri);
      setImageUri(selectedUri);

      Alert.alert(
        "Photo Updated",
        "Your profile photo has been saved."
      );
    } catch (error) {
      console.error("Error updating profile photo:", error);

      Alert.alert(
        "Unable to Update Photo",
        "Something went wrong while saving your profile photo. Please try again."
      );
    } finally {
      setSavingImage(false);
    }
  };

  // Remove saved profile photo
  const handleRemovePhoto = () => {
    Alert.alert(
      "Remove Profile Photo",
      "Are you sure you want to remove your profile photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              setSavingImage(true);

              await removeProfileImage();
              setImageUri(null);

              Alert.alert(
                "Photo Removed",
                "Your initials will now appear as your profile image."
              );
            } catch (error) {
              console.error("Error removing profile photo:", error);

              Alert.alert(
                "Unable to Remove Photo",
                "Something went wrong. Please try again."
              );
            } finally {
              setSavingImage(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.headerTitle}>MY PROFILE</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Photo */}
        <View style={styles.avatarSection}>
          {loadingImage ? (
            <View style={styles.avatarLoading}>
              <ActivityIndicator color="#5DD1DC" size="large" />
            </View>
          ) : (
            <Pressable
              onPress={handleChangePhoto}
              disabled={savingImage}
              style={styles.avatarPressable}
            >
              <AvatarImage
                firstName={firstName}
                lastName={lastName}
                imageUri={imageUri}
                size={110}
              />

              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color="#000000" />
              </View>
            </Pressable>
          )}

          {savingImage && (
            <Text style={styles.photoStatus}>
              Updating photo...
            </Text>
          )}

          <Text style={styles.memberName}>
            {firstName} {lastName}
          </Text>

          <Text style={styles.memberLabel}>
            WOOLSEY FITNESS MEMBER
          </Text>

          <Pressable
            onPress={handleChangePhoto}
            disabled={savingImage || loadingImage}
            style={styles.changePhotoButton}
          >
            <Text style={styles.changePhotoText}>
              Change Profile Photo
            </Text>
          </Pressable>

          {imageUri !== null && (
            <Pressable
              onPress={handleRemovePhoto}
              disabled={savingImage || loadingImage}
              style={styles.removePhotoButton}
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color="#FF6B6B"
              />

              <Text style={styles.removePhotoText}>
                Remove Photo
              </Text>
            </Pressable>
          )}
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            PERSONAL INFORMATION
          </Text>

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

              <Text style={styles.creditLabel}>
                CREDITS LEFT
              </Text>
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

  avatarPressable: {
    position: "relative",
  },

  avatarLoading: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1C1C",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#5DD1DC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#000000",
  },

  photoStatus: {
    color: "#5DD1DC",
    fontSize: 12,
    marginTop: 10,
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

  changePhotoButton: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  changePhotoText: {
    color: "#5DD1DC",
    fontSize: 13,
    fontWeight: "700",
  },

  removePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    paddingVertical: 10,
  },

  removePhotoText: {
    color: "#FF6B6B",
    fontSize: 13,
    fontWeight: "600",
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
