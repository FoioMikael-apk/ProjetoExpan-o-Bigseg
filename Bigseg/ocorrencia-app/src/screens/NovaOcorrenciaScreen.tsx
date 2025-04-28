import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { styles } from "./NovaOcorrenciaScreen.styles";
import Header from "../components/Header";
import VoltarButton from "../components/VoltarButton";

export default function NovaOcorrenciaScreen() {
  const navigation = useNavigation<any>();

  const [descricao, setDescricao] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [produto, setProduto] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [setor, setSetor] = useState<string>("");
  const [observacao, setObservacao] = useState<string>("");
  const [status, setStatus] = useState<string>("pendente");
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const sexoOptions = ["M", "F"];

  const validarCampos = () => {
    const novosErros: { [key: string]: string } = {};
    if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
    if (!idade.trim()) novosErros.idade = "Idade é obrigatória";
    if (!sexo.trim() || !sexoOptions.includes(sexo.toUpperCase())) {
      novosErros.sexo = "Sexo inválido. Use M ou F";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarCampos()) {
      Toast.show({ type: "error", text1: "Corrija os campos obrigatórios." });
      return;
    }

    const dados = {
      descricao,
      local,
      idade,
      sexo: sexo.toUpperCase(),
      produto,
      preco,
      setor,
      observacao,
      status: status.toLowerCase(),
    };

    try {
      await api.post("/ocorrencias", dados);
      Toast.show({ type: "success", text1: "Ocorrência registrada!" });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Erro ao registrar ocorrência." });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <VoltarButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.titulo}>📝 Nova Ocorrência</Text>

        <TextInput
          label="* Descrição"
          value={descricao || ""}
          onChangeText={(text) => setDescricao(text)}
          style={styles.input}
          error={!!erros.descricao}
        />
        {erros.descricao && <HelperText type="error">{erros.descricao}</HelperText>}

        <TextInput
          label="* Idade"
          value={idade || ""}
          onChangeText={(text) => setIdade(text)}
          style={styles.input}
          keyboardType="numeric"
          error={!!erros.idade}
        />
        {erros.idade && <HelperText type="error">{erros.idade}</HelperText>}

        <TextInput
          label="* Sexo"
          value={sexo || ""}
          onChangeText={(text) => setSexo(text)}
          style={styles.input}
          error={!!erros.sexo}
        />
        <HelperText type={erros.sexo ? "error" : "info"}>
          {erros.sexo || "Digite M ou F"}
        </HelperText>

        <TextInput
          label="Local"
          value={local || ""}
          onChangeText={(text) => setLocal(text)}
          style={styles.input}
        />

        <TextInput
          label="Produto"
          value={produto || ""}
          onChangeText={(text) => setProduto(text)}
          style={styles.input}
        />

        <TextInput
          label="Preço"
          value={preco || ""}
          onChangeText={(text) => setPreco(text)}
          style={styles.input}
          keyboardType="decimal-pad"
        />

        <TextInput
          label="Setor"
          value={setor || ""}
          onChangeText={(text) => setSetor(text)}
          style={styles.input}
        />

        <TextInput
          label="Observação"
          value={observacao || ""}
          onChangeText={(text) => setObservacao(text)}
          style={styles.input}
          multiline
        />

        <TextInput
          label="Status"
          value={status || ""}
          onChangeText={(text) => setStatus(text)}
          style={styles.input}
        />
        <HelperText type="info">Use: pendente, ativa ou finalizada</HelperText>

        <Button
          mode="contained"
          onPress={handleSalvar}
          style={styles.botao}
        >
          ➕ Registrar Ocorrência
        </Button>
      </ScrollView>
    </View>
  );
}
