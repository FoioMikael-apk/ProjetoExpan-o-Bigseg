import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { List, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ocorrencia } from "../types/Ocorrencia";
import Navbar from "../components/Navbar";

export default function OcorrenciasPendentesScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const carregarOcorrencias = async () => {
    try {
      const { data } = await api.get("/ocorrencias");
      const pendentes = data.filter((o: Ocorrencia) => o.status === "pendente");
      setOcorrencias(pendentes);
    } catch (err) {
      console.log("Erro ao buscar ocorrências:", err);
    } finally {
      setLoading(false);
    }
  };

  const finalizarOcorrencia = async (id: number) => {
    try {
      await api.put(`/ocorrencias/${id}`, { status: "finalizada" });
      carregarOcorrencias();
    } catch (err) {
      Alert.alert("Erro", "Erro ao finalizar ocorrência.");
    }
  };

  const excluirOcorrencia = async (id: number) => {
    Alert.alert("Excluir Ocorrência", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/ocorrencias/${id}`);
            carregarOcorrencias();
          } catch (err) {
            Alert.alert("Erro", "Erro ao excluir ocorrência.");
          }
        },
      },
    ]);
  };

  const abrirMenu = (ocorrencia: Ocorrencia) => {
    Alert.alert(
      "Ações",
      `Ocorrência #${ocorrencia.id}`,
      [
        {
          text: "Finalizar",
          onPress: () => finalizarOcorrencia(ocorrencia.id),
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirOcorrencia(ocorrencia.id),
        },
        {
          text: "Ver Detalhes",
          onPress: () =>
            navigation.navigate("DetalhesOcorrencia", {
              ocorrenciaId: ocorrencia.id,
            }),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarOcorrencias);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
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
        ListEmptyComponent={<Text>Nenhuma ocorrência pendente.</Text>}
        renderItem={({ item }) => (
          <List.Item
            title={item.descricao}
            description={`Local: ${item.local} • Setor: ${item.setor}`}
            right={() => (
              <IconButton icon="dots-vertical" onPress={() => abrirMenu(item)} />
            )}
          />
        )}
      />
    </>
  );
}
