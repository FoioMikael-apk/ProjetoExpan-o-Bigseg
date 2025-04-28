import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#e9f0f7",
    flexGrow: 1,
  },
  titulo: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  botao: {
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor:"#074799"
  },
  imagemPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 16,
  },
  erro: {
    color: "#f44336",
    marginTop: -10,
    marginBottom: 10,
    fontSize: 13,
  },
  
});
