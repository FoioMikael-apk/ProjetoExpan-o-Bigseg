import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const IP = process.env.API_IP || "192.168.1.55"; // fallback se não achar
const PORT = process.env.API_PORT || "3333";

export const api = axios.create({
  baseURL: `http://${IP}:${PORT}`,
});
