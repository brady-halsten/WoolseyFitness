import {Link} from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style ={styles.text}>Welcome to Woolsey Fitness!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#080808"
  },
  text: {
  color: "white"
  },
  button: {
  fontSize: 20,
  textDecorationLine: "underline",
  color: "#fff"
  }
});
