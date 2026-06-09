// screens/Home.tsx
// Dashboard principal: consome o MissionContext e exibe os dados de telemetria.
// Os Cards refletem automaticamente dados aleatórios (1º boot) ou os dados
// enviados pelo usuário via Formulário.

import React from "react";
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from "react-native";

import { useMission } from "../services/ContextoMissao";
import { styles as appStyles } from "../styles/app.styles";

import Card from "../components/CardDashboard";
import CardEstabilidade from "../components/estabilidadenave";
import CardFelicidade from "../components/cardfelicidade";

export default function Home() {
  const { missionData, loading } = useMission();

  // Aguarda o AsyncStorage terminar antes de renderizar
  if (loading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color="#33ff00" />
        <Text style={loadingStyles.text}>Inicializando telemetria…</Text>
      </View>
    );
  }

  // Regras de alerta — mesmas do AlertCompo para manter consistência
  const energiaAlerta = missionData.energy < 30;
  const temperaturaAlerta =
    missionData.temperature < 5 || missionData.temperature > 50;
  const pressaoAlerta = missionData.pressure < 90;
  const umidadeAlerta = missionData.humidity < 20 || missionData.humidity > 80;

  const statusText = (alerta: boolean, ok: string) => (alerta ? "Fora do limite" : ok);

  return (
    <View style={appStyles.container}>
      <ScrollView contentContainerStyle={appStyles.scrollContent}>

        {/* LINHA 1 — Energia e Temperatura */}
        <View style={appStyles.row}>
          <Card
            title="Energia"
            value={missionData.energy}
            unit="%"
            statusText={statusText(energiaAlerta, "Normal")}
            isAlert={energiaAlerta}
          />
          <Card
            title="Temperatura"
            value={missionData.temperature}
            unit="°C"
            statusText={statusText(temperaturaAlerta, "Estável")}
            isAlert={temperaturaAlerta}
          />
        </View>

        {/* LINHA 2 — Pressão e Umidade */}
        <View style={appStyles.row}>
          <Card
            title="Pressão"
            value={missionData.pressure}
            unit="kPa"
            statusText={statusText(pressaoAlerta, "Normal")}
            isAlert={pressaoAlerta}
          />
          <Card
            title="Umidade"
            value={missionData.humidity}
            unit="%"
            statusText={statusText(umidadeAlerta, "Confortável")}
            isAlert={umidadeAlerta}
          />
        </View>

        {/* CARD — Satisfação (orbitStatus usado como indicador de missão) */}
        <CardFelicidade orbitStatus={missionData.orbitStatus} />

        {/* CARD — Estabilidade Orbital (derivada da energia) */}
        <CardEstabilidade estabilidade={missionData.energy} />

      </ScrollView>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: "#94A3B8",
    fontFamily: "monospace",
    fontSize: 14,
  },
});