import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import Header from "../components/Header";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [total, setTotal] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [finalizadas, setFinalizadas] = useState(0);

  useEffect(() => {
    carregarDashboard();
    const unsubscribe = navigation.addListener("focus", carregarDashboard);
    return unsubscribe;
  }, [navigation]);

  const carregarDashboard = async () => {
    const res = await api.get("/ocorrencias");
    setTotal(res.data.length);
    setPendentes(res.data.filter((o: any) => o.status === "pendente").length);
    setFinalizadas(res.data.filter((o: any) => o.status === "finalizada").length);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 24 }]}>
        <Animatable.View animation="fadeInUp" duration={450}>
          <Title style={styles.titulo}>🚀 Acesso Rápido</Title>

          {/* ATALHOS PRIMEIRO */}
          <View style={styles.grid}>
            <Card style={styles.cardAtalho} onPress={() => navigation.navigate("NovaOcorrencia")}>
              <Card.Content style={styles.centered}>
                <Icon name="plus-circle-outline" size={32} color="#2196f3" />
                <Text style={styles.atalhoTexto}>Nova Ocorrência</Text>
              </Card.Content>
            </Card>

            <Card style={styles.cardAtalho} onPress={() => navigation.navigate("Pendentes")}>
              <Card.Content style={styles.centered}>
                <Icon name="clock-alert-outline" size={32} color="#f44336" />
                <Text style={styles.atalhoTexto}>Pendentes</Text>
              </Card.Content>
            </Card>

            <Card style={styles.cardAtalho} onPress={() => navigation.navigate("Finalizadas")}>
              <Card.Content style={styles.centered}>
                <Icon name="check-outline" size={32} color="#4caf50" />
                <Text style={styles.atalhoTexto}>Finalizadas</Text>
              </Card.Content>
            </Card>
          </View>

          {/* DASHBOARD  */}
          <Title style={[styles.titulo, { marginTop: 15}]}>📊 Resumo Geral</Title>
          <View style={styles.resumoContainer}>
            <Card style={[styles.cardResumo, { backgroundColor: "#3f51b5" }]}>
              <Card.Content style={styles.centered}>
                <Icon name="format-list-bulleted-square" size={15} color="#fff" />
                <Text style={styles.resumoTexto}>Total</Text>
                <Text style={styles.resumoNumero}>{total}</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.cardResumo, { backgroundColor: "#f44336" }]}>
              <Card.Content style={styles.centered}>
                <Icon name="alert-circle-outline" size={15} color="#fff" />
                <Text style={styles.resumoTexto}>Pendentes</Text>
                <Text style={styles.resumoNumero}>{pendentes}</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.cardResumo, { backgroundColor: "#4caf50" }]}>
              <Card.Content style={styles.centered}>
                <Icon name="check-circle-outline" size={15} color="#fff" />
                <Text style={styles.resumoTexto}>Finalizadas</Text>
                <Text style={styles.resumoNumero}>{finalizadas}</Text>
              </Card.Content>
            </Card>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}
