// components/estabilidadenave.tsx
// Exibe a estabilidade orbital via barra de progresso colorida.
// A prop `estabilidade` (0–100) é obrigatória — Home.tsx passa missionData.energy.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardEstabilidadeProps {
  estabilidade: number; // 0–100
}

export default function CardEstabilidade({ estabilidade }: CardEstabilidadeProps) {
  const getColor = () => {
    if (estabilidade >= 80) return "#22C55E";
    if (estabilidade >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const getStatus = () => {
    if (estabilidade >= 80) return "Estável";
    if (estabilidade >= 50) return "Atenção";
    return "Crítico";
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Estabilidade Orbital</Text>

      <Text style={[styles.value, { color: getColor() }]}>{estabilidade}%</Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${estabilidade}%`, backgroundColor: getColor() },
          ]}
        />
      </View>

      <Text style={[styles.status, { color: getColor() }]}>{getStatus()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#050505",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  value: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  progressBackground: {
    height: 12,
    backgroundColor: "#334155",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  status: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});