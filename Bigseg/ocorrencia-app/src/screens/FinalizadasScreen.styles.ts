import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 9,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  titulo: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vazio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});