
import { Stack } from "expo-router";

export default function RoutinesLayout() {
  return <Stack>
    <Stack.Screen name="index"
    options={{
        headerShown: false,
    }}/>

  </Stack>;
}
