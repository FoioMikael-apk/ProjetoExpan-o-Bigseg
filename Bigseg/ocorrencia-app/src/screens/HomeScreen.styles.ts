import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  
  container: {
    padding: 20,
  },
  
  resumoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 10,
  },
  
  cardResumo: {
    flex: 1,
    padding: 1,
    borderRadius: 10,
  },
  
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  
  cardAtalho: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    elevation: 3,
  },
  
  atalhoTexto: {
    fontSize: 14,
    marginTop: 8,
    color: "#fff",
  },
  
  resumoTexto: {
    color: "#fff",
    marginTop: 8,
    fontSize: 10,
  },
  
  resumoNumero: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  
});
