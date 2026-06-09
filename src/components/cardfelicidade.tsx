// components/cardfelicidade.tsx
// Exibe o status geral da missão (orbitStatus) no estilo de um gauge.
// Recebe `orbitStatus` como prop vindo do Home.tsx (que lê do Context).

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MissionData } from "../interfaces/missionData";

interface CardFelicidadeProps {
  orbitStatus: MissionData["orbitStatus"];
}

const STATUS_CONFIG = {
  Estável: { cor: "#22C55E", score: "100%", label: "Missão estável" },
  Instável: { cor: "#F59E0B", score: "55%", label: "Atenção necessária" },
  Offline: { cor: "#EF4444", score: "0%", label: "Comunicação perdida" },
};

export default function CardFelicidade({ orbitStatus }: CardFelicidadeProps) {
  const config = STATUS_CONFIG[orbitStatus] ?? STATUS_CONFIG["Estável"];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Status da Missão</Text>

      <View style={[styles.gauge, { borderColor: config.cor }]}>
        <Text style={[styles.score, { color: config.cor }]}>{config.score}</Text>
        <Text style={styles.label}>{config.label}</Text>
      </View>

      <Text style={[styles.badge, { color: config.cor }]}>
        {orbitStatus.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 20,
  },
  gauge: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    borderWidth: 16,
    borderBottomWidth: 0,
    backgroundColor: "#000000",
    marginBottom: 16,
  },
  score: {
    fontSize: 38,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  label: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
  },
  badge: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 2,
    fontFamily: "monospace",
  },
});