// components/Navbar.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const navigation = useNavigation<any>();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon="home"
       
        onPress={() => navigation.navigate("MainTabs", { screen: "Início" })}
      />
      <Appbar.Action
        icon="clipboard-text-clock"
        onPress={() => navigation.navigate("MainTabs", { screen: "Pendentes" })}
      />
      <Appbar.Action
        icon="clipboard-check"
        onPress={() => navigation.navigate("MainTabs", { screen: "Finalizadas" })}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1976d2",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    height: 60,
    color: "white",
  
    
    
    position:"relative",
    right:15
  },
  
});
