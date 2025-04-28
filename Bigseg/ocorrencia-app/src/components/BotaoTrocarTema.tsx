import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

type BotaoTrocarTemaProps = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

export default function BotaoTrocarTema({ toggleTheme, isDarkTheme }: BotaoTrocarTemaProps) {
  return (
    <View style={styles.container}>
      <IconButton
        icon={isDarkTheme ? "white-balance-sunny" : "moon-waning-crescent"}
        size={30}
        onPress={toggleTheme}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 1,
    right: 20,
    zIndex: 999,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
