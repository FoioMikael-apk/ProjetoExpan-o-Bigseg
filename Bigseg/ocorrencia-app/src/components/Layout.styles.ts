import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    color:"white"
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flexGrow: 1,
    padding: 200,
    paddingBottom: 100,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  footer: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  footerText: {
    fontSize: 12,
    color: "#fff",
  },
});
