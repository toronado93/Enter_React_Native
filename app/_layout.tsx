import "../global.css";
import React from "react";
import { Stack, SplashScreen } from "expo-router";
import useFont from "@/hooks/useFont";
import { ActivityIndicator, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const fontsLoaded = useFont();

  if (!fontsLoaded) {
    // Render a loading indicator until fonts are loaded
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="helper" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
