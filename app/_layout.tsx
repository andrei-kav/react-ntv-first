import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* no any idea why the next line is needed */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
