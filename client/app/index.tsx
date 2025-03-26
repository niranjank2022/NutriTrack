import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function IndexLa() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Redirect href="/welcome" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
