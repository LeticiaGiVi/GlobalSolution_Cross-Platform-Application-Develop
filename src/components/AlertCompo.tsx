

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMission } from "../services/ContextoMissao";
import { C, R, S, MONO } from "../styles/app.styles";

export function Alerts() {
  const { missionData } = useMission();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const novos: string[] = [];
    if (missionData.energy < 30)
      novos.push("⚡  Energia crítica — nível abaixo de 30%");
    if (missionData.temperature > 50 || missionData.temperature < 5)
      novos.push("🌡  Temperatura fora dos limites operacionais");
    if (missionData.pressure < 90)
      novos.push("⬇  Pressão da cabine abaixo do mínimo seguro");
    if (missionData.humidity > 80 || missionData.humidity < 20)
      novos.push("💧  Umidade fora da faixa de conforto");
    if (missionData.orbitStatus === "Offline")
      novos.push("📡  Link de comunicação OFFLINE");
    if (missionData.orbitStatus === "Instável")
      novos.push("⚠  Instabilidade orbital detectada");
    setAlerts(novos);
  }, [missionData]);

  if (alerts.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>▲ ALERTAS ATIVOS [{alerts.length}]</Text>
      {alerts.map((alerta, i) => (
        <View key={i} style={styles.alertRow}>
          <View style={styles.dot} />
          <Text style={styles.alertText}>{alerta}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F0610",
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: "rgba(255,77,106,0.45)",
    borderLeftWidth: 2,
    borderLeftColor: C.danger,
    padding: S.md,
    marginVertical: S.sm,
  },

  header: {
    color: C.danger,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: S.sm,
    ...MONO,
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: S.xs,
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.danger,
    marginRight: S.sm,
    opacity: 0.8,
  },

  alertText: {
    color: "#FFB3BE",
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
    ...MONO,
  },
});