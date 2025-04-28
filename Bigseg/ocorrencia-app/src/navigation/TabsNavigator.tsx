import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLayout from "./MainLayout";
import HomeScreen from "../screens/HomeScreen";
import PendentesScreen from "../screens/PendentesScreen";
import FinalizadasScreen from "../screens/FinalizadasScreen";
import NovaOcorrenciaScreen from "../screens/NovaOcorrenciaScreen";
import EditarOcorrenciaScreen from "../screens/EditarOcorrenciaScreen";
import DetalhesOcorrenciaScreen from "../screens/DetalhesOcorrenciaScreen";
import BotaoTrocarTema from "../components/BotaoTrocarTema"; // Vamos criar já já!

const Stack = createNativeStackNavigator();

type TabsNavigatorProps = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

export default function TabsNavigator({ toggleTheme, isDarkTheme }: TabsNavigatorProps) {
  return (
    <>
      <BotaoTrocarTema toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Início">
          {() => (
            <MainLayout>
              <HomeScreen />
            </MainLayout>
          )}
        </Stack.Screen>

        <Stack.Screen name="Pendentes">
          {() => (
            <MainLayout>
              <PendentesScreen />
            </MainLayout>
          )}
        </Stack.Screen>

        <Stack.Screen name="Finalizadas">
          {() => (
            <MainLayout>
              <FinalizadasScreen />
            </MainLayout>
          )}
        </Stack.Screen>

        <Stack.Screen name="NovaOcorrencia">
          {() => (
            <MainLayout>
              <NovaOcorrenciaScreen />
            </MainLayout>
          )}
        </Stack.Screen>

        <Stack.Screen name="EditarOcorrencia">
          {() => (
            <MainLayout>
              <EditarOcorrenciaScreen />
            </MainLayout>
          )}
        </Stack.Screen>

        <Stack.Screen name="DetalhesOcorrencia">
          {() => (
            <MainLayout>
              <DetalhesOcorrenciaScreen />
            </MainLayout>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
