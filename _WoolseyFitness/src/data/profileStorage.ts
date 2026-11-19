
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_IMAGE_KEY = "woolsey-profile-image";

export async function getProfileImage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
  } catch (error) {
    console.error("Error loading profile image:", error);
    return null;
  }
}

export async function saveProfileImage(uri: string): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
  } catch (error) {
    console.error("Error saving profile image:", error);
    throw error;
  }
}

export async function removeProfileImage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
    } catch (error) {
      console.error("Error removing profile image:", error);
      throw error;
    }
  }
