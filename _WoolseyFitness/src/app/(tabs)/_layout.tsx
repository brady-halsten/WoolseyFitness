
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#000",
        },
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused
                  ? "information-circle"
                  : "information-circle-outline"
              }
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
