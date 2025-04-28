// components/VoltarButton.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

export default function VoltarButton() {
  const navigation = useNavigation<any>();

  return (
    <IconButton
      icon="arrow-left"
      size={20}
      style={{ position: "absolute", top: 8, left: 8, backgroundColor:"#fff",}}
      onPress={() => navigation.goBack()}
    />
  );
}
