import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Card,
  IconButton,
  Button,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ocorrencia } from "../types/Ocorrencia";
import Header from "../components/Header";
import VoltarButton from "../components/VoltarButton";
import * as Animatable from "react-native-animatable";
import { styles } from "./PendentesScreen.styles";
import Toast from "react-native-toast-message";

export default function PendentesScreen() {
  const navigation = useNavigation<any>();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [busca, setBusca] = useState("");
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [modalFinalizarVisible, setModalFinalizarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<Ocorrencia | null>(null);

  const carregarPendentes = async () => {
    const res = await api.get("/ocorrencias");
    const pendentes = res.data.filter((o: Ocorrencia) => o.status === "pendente");
    setOcorrencias(pendentes);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarPendentes);
    return unsubscribe;
  }, [navigation]);

  const abrirModalFinalizar = (ocorrencia: Ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setModalFinalizarVisible(true);
  };

  const abrirModalExcluir = (ocorrencia: Ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setModalExcluirVisible(true);
  };

  const confirmarFinalizacao = async () => {
    if (ocorrenciaSelecionada) {
      try {
        await api.put(`/ocorrencias/${ocorrenciaSelecionada.id}`, {
          descricao: ocorrenciaSelecionada.descricao,
          local: ocorrenciaSelecionada.local,
          idade: ocorrenciaSelecionada.idade,
          sexo: ocorrenciaSelecionada.sexo,
          produto: ocorrenciaSelecionada.produto,
          preco: ocorrenciaSelecionada.preco,
          setor: ocorrenciaSelecionada.setor,
          observacao: ocorrenciaSelecionada.observacao,
          status: "finalizada",
        });
        setModalFinalizarVisible(false);
        Toast.show({ type: "success", text1: "Ocorrência finalizada com sucesso!" });
        carregarPendentes();
      } catch (error: any) {
        console.error(error.response?.data || error.message);
        Toast.show({ type: "error", text1: "Erro ao finalizar ocorrência." });
        setModalFinalizarVisible(false);
      }
    }
  };

  const confirmarExclusao = async () => {
    if (ocorrenciaSelecionada) {
      try {
        await api.delete(`/ocorrencias/${ocorrenciaSelecionada.id}`);
        setModalExcluirVisible(false);
        Toast.show({ type: "success", text1: "Ocorrência excluída!" });
        carregarPendentes();
      } catch (error: any) {
        console.error(error.response?.data || error.message);
        Toast.show({ type: "error", text1: "Erro ao excluir ocorrência." });
        setModalExcluirVisible(false);
      }
    }
  };

  const ocorrenciasFiltradas = ocorrencias.filter((o) =>
    [o.produto, o.local, o.setor, o.descricao, o.observacao]
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <VoltarButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={styles.titulo}>Ocorrências Pendentes</Text>

          {/* Campo de busca animado */}
          <View style={{ marginBottom: 16, flexDirection: "row", alignItems: "center" }}>
            {!mostrarBusca ? (
              <IconButton
                icon="magnify"
                onPress={() => setMostrarBusca(true)}
                style={{
                  backgroundColor: "#EFEEEA",
                  borderRadius: 15,
                  marginLeft: "auto",
                  marginRight: 8,
                }}
              />
            ) : (
              <Animatable.View animation="fadeInRight" duration={550} style={{ flex: 1, borderRadius: 105 }}>
                <TextInput
                  autoFocus
                  placeholder="Buscar ocorrência..."
                  value={busca}
                  onChangeText={setBusca}
                  onBlur={() => {
                    if (busca.trim() === "") setMostrarBusca(false);
                  }}
                  mode="outlined"
                  right={<TextInput.Icon icon="magnify" />}
                  style={{
                    flex: 1,
                    borderRadius: 25,
                    backgroundColor: "#fff",
                  }}
                  contentStyle={{ borderRadius: 25 }}
                />
              </Animatable.View>
            )}
          </View>

          {/* Lista de ocorrências */}
          {ocorrenciasFiltradas.map((ocorrencia) => (
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
                <Button
                  style={{ backgroundColor: "#074799" }}
                  onPress={() => abrirModalFinalizar(ocorrencia)}
                >
                  Finalizar
                </Button>
                <Button
                  style={{ backgroundColor: "#074799" }}
                  onPress={() => abrirModalExcluir(ocorrencia)}
                >
                  Excluir
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </Animatable.View>
      </ScrollView>

      {/* Modal: Finalizar */}
      <Portal>
        <Modal
          visible={modalFinalizarVisible}
          onDismiss={() => setModalFinalizarVisible(false)}
          contentContainerStyle={{
            backgroundColor: "#1976d2",
            padding: 24,
            margin: 20,
            borderRadius: 12,
          }}
        >
          <Animatable.View animation="zoomIn" duration={400}>
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
              Deseja finalizar esta ocorrência?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button mode="outlined" onPress={() => setModalFinalizarVisible(false)} style={{ flex: 1, marginRight: 8, backgroundColor: "#fff" }}>
                Cancelar
              </Button>
              <Button mode="contained" onPress={confirmarFinalizacao} style={{ flex: 1, backgroundColor: "#1f1f1f" }}>
                Finalizar
              </Button>
            </View>
          </Animatable.View>
        </Modal>
      </Portal>

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
              <Button mode="outlined" onPress={() => setModalExcluirVisible(false)} style={{ flex: 1, marginRight: 8, backgroundColor: "#fff" }}>
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
