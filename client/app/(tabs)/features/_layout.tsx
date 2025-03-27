import { Stack } from "expo-router"; // Import only what you need

const ProfileLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="chatbot" options={{ headerShown: false }} />
      <Stack.Screen name="hydrationCheck" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
