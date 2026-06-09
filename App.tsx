
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MissionProvider } from "./src/services/ContextoMissao";
import MenuLateral from "./src/components/Menulatera";
import Home from "./src/screens/Home";
import Alertas from "./src/screens/Alertas";
import Formulario from "./src/components/Formulário";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MissionProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <MenuLateral />

          <View style={styles.content}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Config" component={Formulario} />
              <Stack.Screen name="Alertas" component={Alertas} />
            </Stack.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </MissionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1020",
  },
  content: {
    flex: 1,
  },
});