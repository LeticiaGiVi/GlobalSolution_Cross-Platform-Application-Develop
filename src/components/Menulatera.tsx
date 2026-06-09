// components/MenuLateral.tsx
// Header de navegação horizontal.
// Navega entre as telas: Home (Dashboard), Formulário (Config) e Alertas.

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuLateral() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Terminal Espacial...</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Informações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Config")}
        >
          <Text style={styles.buttonText}>Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alertas")}
        >
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: "#0B0E14",
    borderBottomWidth: 1,
    borderBottomColor: "#1ec90f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#3cd029",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  menu: { flexDirection: "row" },
  button: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#000000",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1ec90f",
  },
  buttonText: { color: "#2cac32", fontSize: 13 },
});