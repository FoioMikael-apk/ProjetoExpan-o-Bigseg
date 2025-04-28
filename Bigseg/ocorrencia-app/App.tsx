import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

import TabsNavigator from "./src/navigation/TabsNavigator";
import NovaOcorrenciaScreen from "./src/screens/NovaOcorrenciaScreen";
import DetalhesOcorrenciaScreen from "./src/screens/DetalhesOcorrenciaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Começa claro!

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const themePaper = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
  const themeNav = isDarkTheme ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar
        backgroundColor="#1976d2" // Sempre azul fixo
        barStyle="light-content"   // Ícones sempre claros
      />
      <PaperProvider theme={themePaper}>
        <NavigationContainer theme={themeNav}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs">
              {() => <TabsNavigator toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />}
            </Stack.Screen>
            <Stack.Screen name="NovaOcorrencia" component={NovaOcorrenciaScreen} />
            <Stack.Screen name="DetalhesOcorrencia" component={DetalhesOcorrenciaScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </>
  );
}
