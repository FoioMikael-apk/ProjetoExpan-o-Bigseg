import React, { ReactNode } from "react";
import { View, ScrollView, Platform } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { styles } from "./Layout.styles";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>🎥 CFTV Ocorrências</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Desenvolvido por Mikael Santos</Text>
      </View>
    </View>
  );
}
