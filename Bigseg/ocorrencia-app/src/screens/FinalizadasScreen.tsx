import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, IconButton, Button, Modal, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ocorrencia } from "../types/Ocorrencia";
import Header from "../components/Header";
import VoltarButton from "../components/VoltarButton";
import * as Animatable from "react-native-animatable";
import { styles } from "./FinalizadasScreen.styles";

export default function FinalizadasScreen() {
  const navigation = useNavigation<any>();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<Ocorrencia | null>(null);

  const carregarFinalizadas = async () => {
    const res = await api.get("/ocorrencias");
    const finalizadas = res.data.filter((o: Ocorrencia) => o.status === "finalizada");
    setOcorrencias(finalizadas);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarFinalizadas);
    return unsubscribe;
  }, [navigation]);

  const abrirModalExcluir = (ocorrencia: Ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setModalExcluirVisible(true);
  };

  const confirmarExclusao = async () => {
    if (ocorrenciaSelecionada) {
      await api.delete(`/ocorrencias/${ocorrenciaSelecionada.id}`);
      setModalExcluirVisible(false);
      carregarFinalizadas();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <VoltarButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInUp" duration={450}>
          <Text style={styles.titulo}>Ocorrências Finalizadas</Text>

          {ocorrencias.map((ocorrencia) => (
            <Card key={ocorrencia.id} style={{ marginBottom: 16 }}>
              <Card.Title
                title={ocorrencia.descricao}
                subtitle={`Produto: ${ocorrencia.produto}`}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="link"
                    onPress={() =>
                      navigation.navigate("DetalhesOcorrencia", {
                        ocorrenciaId: ocorrencia.id,
                      })
                    }
                  />
                )}
              />
              <Card.Content>
                <Text>Local: {ocorrencia.local}</Text>
                <Text>Data: {new Date(ocorrencia.created_at).toLocaleDateString()}</Text>
              </Card.Content>
              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button onPress={() => navigation.navigate("EditarOcorrencia", { ocorrencia })}>
                  Editar
                </Button>
                <Button style={{ backgroundColor:"#074799" }} onPress={() => abrirModalExcluir(ocorrencia)}>Excluir</Button>
              </Card.Actions>
            </Card>
          ))}
        </Animatable.View>
      </ScrollView>

      {/* Modal: Excluir */}
      <Portal>
        <Modal
          visible={modalExcluirVisible}
          onDismiss={() => setModalExcluirVisible(false)}
          contentContainerStyle={{
            backgroundColor: "#1976d2",
            padding: 24,
            margin: 20,
            borderRadius: 12,
          }}
        >
          <Animatable.View animation="zoomIn" duration={450}>
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
              Tem certeza que deseja excluir esta ocorrência?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button mode="outlined" onPress={() => setModalExcluirVisible(false)} style={{ flex: 1, marginRight: 8, backgroundColor:"#fff" }}>
                Cancelar
              </Button>
              <Button mode="contained" onPress={confirmarExclusao} style={{ flex: 1, backgroundColor: "#1f1f1f" }}>
                Excluir
              </Button>
            </View>
          </Animatable.View>
        </Modal>
      </Portal>
    </View>
  );
}
