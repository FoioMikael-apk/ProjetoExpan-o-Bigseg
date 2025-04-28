import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  titulo: string;
  valor: string | number;
  icon?: string;
};

export default function ResumoCard({ titulo, valor, icon }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.valor}>{valor}</Text>
        <Text>{titulo}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 1,
    elevation: 4,
    borderRadius: 12,
  },
  content: {
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    fontSize: 20,
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
