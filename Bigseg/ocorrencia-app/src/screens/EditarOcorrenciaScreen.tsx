import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  SegmentedButtons,
  Modal,
  Portal,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../services/api";
import { styles } from "./EditarOcorrenciaScreen.styles";
import Header from "../components/Header";
import VoltarButton from "../components/VoltarButton";
import { Ocorrencia } from "../types/Ocorrencia";
import * as Animatable from "react-native-animatable";

type RouteParams = {
  EditarOcorrencia: {
    ocorrencia: Ocorrencia;
  };
};

export default function EditarOcorrenciaScreen() {
  const navigation = useNavigation<any>();
  const { params } = useRoute<RouteParams, "EditarOcorrencia">();
  const ocorrencia = params.ocorrencia;

  const [descricao, setDescricao] = useState(ocorrencia.descricao || "");
  const [local, setLocal] = useState(ocorrencia.local || "");
  const [idade, setIdade] = useState(String(ocorrencia.idade || ""));
  const [sexo, setSexo] = useState(ocorrencia.sexo || "");
  const [produto, setProduto] = useState(ocorrencia.produto || "");
  const [preco, setPreco] = useState(String(ocorrencia.preco || ""));
  const [setor, setSetor] = useState(ocorrencia.setor || "");
  const [observacao, setObservacao] = useState(ocorrencia.observacao || "");
  const [status, setStatus] = useState(ocorrencia.status || "pendente");
  const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const validarCampos = () => {
    const novosErros: { [key: string]: string } = {};

    if (!descricao.trim()) novosErros.descricao = "Campo obrigatório";
    if (!idade.trim()) novosErros.idade = "Campo obrigatório";
    if (!["M", "F"].includes(sexo)) novosErros.sexo = "Selecione M ou F";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarCampos()) {
      Toast.show({ type: "error", text1: "Corrija os campos obrigatórios." });
      setModalSalvarVisible(false);
      return;
    }

    try {
      await api.put(`/ocorrencias/${ocorrencia.id}`, {
        descricao,
        local,
        idade: idade ? Number(idade) : 0,
        sexo,
        produto,
        preco: preco ? Number(preco) : 0,
        setor,
        observacao,
        status,
      });

      Toast.show({ type: "success", text1: "Ocorrência atualizada com sucesso!" });
      setModalSalvarVisible(false);
      navigation.goBack();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Toast.show({ type: "error", text1: "Erro ao atualizar ocorrência." });
      setModalSalvarVisible(false);
    }
  };

  const handleFinalizar = async () => {
    try {
      await api.put(`/ocorrencias/${ocorrencia.id}`, {
        descricao,
        local,
        idade: idade ? Number(idade) : 0,
        sexo,
        produto,
        preco: preco ? Number(preco) : 0,
        setor,
        observacao,
        status: "finalizada",
      });

      Toast.show({ type: "success", text1: "Ocorrência finalizada!" });
      navigation.goBack();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Toast.show({ type: "error", text1: "Erro ao finalizar ocorrência." });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <VoltarButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInUp" duration={500}>
          <Text variant="titleLarge" style={styles.titulo}> Editar Ocorrência</Text>

          <TextInput
            label="* Descrição"
            value={descricao}
            onChangeText={setDescricao}
            style={styles.input}
            error={!!erros.descricao}
          />
          {erros.descricao && <HelperText type="error">{erros.descricao}</HelperText>}

          <TextInput
            label="* Idade"
            value={idade}
            onChangeText={setIdade}
            style={styles.input}
            keyboardType="numeric"
            error={!!erros.idade}
          />
          {erros.idade && <HelperText type="error">{erros.idade}</HelperText>}

          <Text style={{ marginTop: 16, marginBottom: 4 }}>* Sexo</Text>
          <SegmentedButtons
            value={sexo}
            onValueChange={setSexo}
            
            buttons={[
              { value: "M", label: "Masculino" },
              { value: "F", label: "Feminino" },
            ]}
          />
          {erros.sexo && <HelperText type="error">{erros.sexo}</HelperText>}

          <TextInput label="Local" value={local} onChangeText={setLocal} style={styles.input} />
          <TextInput label="Produto" value={produto} onChangeText={setProduto} style={styles.input} />
          <TextInput label="Preço" value={preco} onChangeText={setPreco} style={styles.input} keyboardType="decimal-pad" />
          <TextInput label="Setor" value={setor} onChangeText={setSetor} style={styles.input} />
          <TextInput label="Observação" value={observacao} onChangeText={setObservacao} style={styles.input} multiline />
          <TextInput label="Status" value={status} onChangeText={setStatus} style={styles.input} />
          <HelperText type="info">Use: pendente ou finalizada</HelperText>

          <Button
            mode="contained"
            onPress={() => setModalSalvarVisible(true)}
            style={[ { marginTop: 20, backgroundColor:"#074799" }]}
          >
            💾 Salvar Alterações
          </Button>

          {status === "pendente" && (
            <Button
              mode="outlined"
              onPress={handleFinalizar}
              style={[{ marginTop: 10, backgroundColor:"#F8FAFC" }]}
            >
              ✅ Finalizar Ocorrência
            </Button>
          )}
        </Animatable.View>
      </ScrollView>

      {/* Modal de confirmação */}
      <Portal>
        <Modal
          visible={modalSalvarVisible}
          onDismiss={() => setModalSalvarVisible(false)}
          contentContainerStyle={{
            backgroundColor: "#1976d2",
            padding: 24,
            margin: 24,
            borderRadius: 16,
          }}
        >
          <Animatable.View animation="zoomIn" duration={500}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>
              Confirmar alterações?
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button
                mode="outlined"
                onPress={() => setModalSalvarVisible(false)}
                style={{ flex: 1, marginRight: 8, backgroundColor:"#fff" }}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleSalvar}
                style={{ flex: 1,backgroundColor:"#1f1f1f" }}
              >
                Confirmar
              </Button>
            </View>
          </Animatable.View>
        </Modal>
      </Portal>
    </View>
  );
}
