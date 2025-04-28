// components/Header.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Bigseg</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop:5,
    backgroundColor:  "#1976d2", // ou tema claro
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20, 
  },
  logo: {
    marginTop:5,
    width: 40,
    height: 40,
    marginLeft: 95,
   
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 3,
  },
});
