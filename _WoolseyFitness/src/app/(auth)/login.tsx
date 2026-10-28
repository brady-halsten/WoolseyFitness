
import { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Enter an email and password.");
      return;
    }

    setError("");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <KeyboardAvoidingView
        style={GlobalStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={GlobalStyles.container}>
          {/* Centered logo */}
          <View style={GlobalStyles.logoContainer}>
            <Image
              source={require("@/assets/images/wzf_new_logo.jpg")}
              style={{
                width: Sizes.splash,
                height: Sizes.splash,
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Login form */}
          <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title}>
              WELCOME BACK
            </Text>

            <Text style={GlobalStyles.description}>
              Log in to continue your fitness journey.
            </Text>

            <TextInput
              style={GlobalStyles.input}
              placeholder="Email address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={GlobalStyles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              secureTextEntry
            />

            {error ? (
              <Text style={GlobalStyles.error}>
                {error}
              </Text>
            ) : null}

            <Pressable
              style={GlobalStyles.button}
              onPress={handleLogin}
            >
              <Text style={GlobalStyles.buttonText}>
                LOG IN
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
