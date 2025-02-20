import { Text, View } from "react-native";
import { Link ,Redirect} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect href= "/Landing"/>
      {/* <Text>Edit app/index.tsx to edit screen.</Text>
       <Text>click the link</Text>
      <Link href="/profile" style={{ color: "blue" }}>
       
        Profile Page
      </Link> */}
       
    </View>
  );
}
