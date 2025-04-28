import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform } from "react-native";
import { Text, Button, Card, Modal, Portal } from "react-native-paper";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { api } from "../services/api";
import { styles } from "./DetalhesOcorrenciaScreen.styles";
import Header from "../components/Header";
import VoltarButton from "../components/VoltarButton";
import { Ocorrencia } from "../types/Ocorrencia";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const BASE_URL = "http://192.168.1.55:3333"; // ajuste conforme sua rede

type RouteParams = {
  DetalhesOcorrencia: {
    ocorrenciaId: number;
  };
};

// Função para converter arrayBuffer em base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function DetalhesOcorrenciaScreen() {
  const { params } = useRoute<RouteProp<RouteParams, "DetalhesOcorrencia">>();
  const navigation = useNavigation<any>();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get(`/ocorrencias`).then((res) => {
      const encontrada = res.data.find((o: Ocorrencia) => o.id === params.ocorrenciaId);
      setOcorrencia(encontrada);
    });
  }, []);

  const exportarPDF = async () => {
    try {
      const response = await api.get(`/ocorrencias/export/pdf/${params.ocorrenciaId}`, {
        responseType: "arraybuffer",
      });

      const base64Data = arrayBufferToBase64(response.data);
      const fileUri = FileSystem.documentDirectory + `ocorrencia-${params.ocorrenciaId}.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      await Sharing.shareAsync(fileUri);

      Toast.show({ type: "success", text1: "PDF exportado com sucesso!" });
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Erro ao exportar PDF" });
    }
  };

  const exportarExcel = async () => {
    try {
      const response = await api.get(`/ocorrencias/export/excel/${params.ocorrenciaId}`, {
        responseType: "arraybuffer",
      });

      const base64Data = arrayBufferToBase64(response.data);
      const fileUri = FileSystem.documentDirectory + `ocorrencia-${params.ocorrenciaId}.xlsx`;

      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      await Sharing.shareAsync(fileUri);

      Toast.show({ type: "success", text1: "Excel exportado com sucesso!" });
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Erro ao exportar Excel" });
    }
  };

  if (!ocorrencia) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <VoltarButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.titulo}>Detalhes da Ocorrência</Text>

        <Card style={{ marginBottom: 12 }}>
          <Card.Content>
            <Text variant="bodyLarge">📄 Descrição: {ocorrencia.descricao}</Text>
            <Text>📍 Local: {ocorrencia.local}</Text>
            <Text>📦 Produto: {ocorrencia.produto}</Text>
            <Text>💰 Preço: R$ {ocorrencia.preco}</Text>
            <Text>📌 Setor: {ocorrencia.setor}</Text>
            <Text>🧍 Sexo: {ocorrencia.sexo}</Text>
            <Text>🎂 Idade: {ocorrencia.idade}</Text>
            <Text>📓 Observação: {ocorrencia.observacao}</Text>
            <Text>📌 Status: {ocorrencia.status}</Text>
          </Card.Content>
        </Card>

        {/* Botão principal Exportar */}
        <Button
          icon="export"
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={{
            marginTop: 20,
            borderRadius: 8,
            paddingVertical: 6,
            elevation: 2,
            backgroundColor: "#074799",
          }}
        >
          Exportar
        </Button>

        {/* Modal de opções de exportação */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "#1976d2",
              padding: 24,
              margin: 20,
              borderRadius: 12,
            }}
          >
            <Text style={{ color:"white",fontSize: 18, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>
              Exportar como:
            </Text>
            <Button
              icon="file-pdf-box"
              mode="outlined"
              onPress={() => {
                setModalVisible(false);
                exportarPDF();
              }}
              style={{ marginBottom: 10, backgroundColor:"#fff" }}
            >
              PDF
            </Button>

            <Button
              icon="file-excel"
              mode="outlined"
              style={{ marginBottom: 10, backgroundColor:"#fff" }}
              onPress={() => {
                setModalVisible(false);
                exportarExcel();
                
              }}
            >
              Excel
            </Button>

            <Button
              mode="text"
              onPress={() => setModalVisible(false)}
              style={{ marginBottom: 10, backgroundColor:"1f1f1f" }}
            >
              Cancelar
            </Button>
          </Modal>
        </Portal>

        {/* Botão Editar */}
        <Button
          icon="pencil"
          mode="contained"
          onPress={() => navigation.navigate("EditarOcorrencia", { ocorrencia })}
          style={{
            marginTop: 20,
            borderRadius: 8,
            paddingVertical: 6,
            elevation: 2,
            backgroundColor: "#074799",
          }}
        >
          Editar Ocorrência
        </Button>
      </ScrollView>
    </View>
  );
}
