// components/AlertCompo.tsx
// Exibe alertas em tempo real com base nos dados do Context.
// Os campos monitorados são os mesmos de MissionData: energy, temperature, pressure, humidity.

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMission } from "../services/ContextoMissao";

export function Alerts() {
  const { missionData } = useMission();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const novosAlertas: string[] = [];

    if (missionData.energy < 30)
      novosAlertas.push("Energia crítica! Nível abaixo de 30%");

    if (missionData.temperature > 50 || missionData.temperature < 5)
      novosAlertas.push("Temperatura fora dos limites operacionais!");

    if (missionData.pressure < 90)
      novosAlertas.push("Pressão da cabine abaixo do mínimo seguro!");

    if (missionData.humidity > 80 || missionData.humidity < 20)
      novosAlertas.push("Umidade fora da faixa de conforto!");

    if (missionData.orbitStatus === "Offline")
      novosAlertas.push("Link de comunicação OFFLINE!");

    if (missionData.orbitStatus === "Instável")
      novosAlertas.push("Instabilidade orbital detectada!");

    setAlerts(novosAlertas);
  }, [missionData]);

  if (alerts.length === 0) return null;

  return (
    <View style={styles.container}>
      {alerts.map((alerta, i) => (
        <Text key={i} style={styles.alertText}>
          {alerta}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A0B0B",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  alertText: {
    color: "#FCA5A5",
    fontFamily: "monospace",
    fontSize: 13,
    marginBottom: 4,
  },
});