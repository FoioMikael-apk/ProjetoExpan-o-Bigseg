import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { List, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ocorrencia } from "../types/Ocorrencia";
import Navbar from "../components/Navbar";

export default function OcorrenciasFinalizadasScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const carregarOcorrencias = async () => {
    try {
      const { data } = await api.get("/ocorrencias");
      const finalizadas = data.filter((o: Ocorrencia) => o.status === "finalizada");
      setOcorrencias(finalizadas);
    } catch (err) {
      console.log("Erro ao buscar ocorrências:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarOcorrencias);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <>
      <Navbar />
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text>Nenhuma ocorrência finalizada.</Text>}
        renderItem={({ item }) => (
          <List.Item
            title={item.descricao}
            description={`Local: ${item.local} • Setor: ${item.setor}`}
            onPress={() =>
              navigation.navigate("DetalhesOcorrencia", { ocorrenciaId: item.id })
            }
          />
        )}
      />
    </>
  );
}
