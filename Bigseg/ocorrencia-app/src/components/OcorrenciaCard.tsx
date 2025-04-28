import React from "react";
import { Card, Text, Button } from "react-native-paper";
import { Ocorrencia } from "../types/Ocorrencia";
import { useNavigation } from "@react-navigation/native";

interface Props {
  ocorrencia: Ocorrencia;
}

export default function OcorrenciaCard({ ocorrencia }: Props) {
  const navigation = useNavigation<any>();

  return (
    <Card style={{ marginBottom: 20, borderRadius: 12 }} elevation={3}>
      <Card.Cover
        source={{ uri: `http://192.168.1.553333/uploads/${ocorrencia.imagem}` }}
        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: 5 }}>
          {ocorrencia.descricao}
        </Text>
        <Text variant="bodySmall">📍 Local: {ocorrencia.local}</Text>
        <Text variant="bodySmall">🛡️ Status: {ocorrencia.status}</Text>
        <Text variant="bodySmall">
          🕒 {new Date(ocorrencia.created_at).toLocaleString()}
        </Text>
      </Card.Content>

      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate("DetalhesOcorrencia", { ocorrencia })
          }
        >
          Ver Detalhes
        </Button>
      </Card.Actions>
    </Card>
  );
}
