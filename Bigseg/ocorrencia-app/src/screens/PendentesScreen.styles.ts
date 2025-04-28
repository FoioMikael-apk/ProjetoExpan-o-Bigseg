import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding:9,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  titulo: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    marginBottom: 1,
    borderRadius: 10,
    backgroundColor: "#FBFBFB",
    elevation: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vazio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 106,
    color: "#fff",
  },
});
