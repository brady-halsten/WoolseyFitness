
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
         backgroundColor: "#080808",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
         backgroundColor: "#080808",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Woolsey Fitness",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "flash-sharp" : "flash-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
