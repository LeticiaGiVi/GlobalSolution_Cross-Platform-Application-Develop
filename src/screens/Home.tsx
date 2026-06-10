
import React from "react";
import {
  View, ScrollView, ActivityIndicator,
  Text, StyleSheet, SafeAreaView, StatusBar,
} from "react-native";
import { useMission } from "../services/ContextoMissao";
import { styles as appStyles, C, S, MONO } from "../styles/app.styles";

import GalaxyBg from "../components/back";
import Card from "../components/CardDashboard";
import CardEstabilidade from "../components/estabilidadenave";
import CardFelicidade from "../components/cardfelicidade";
import { Alerts } from "../components/AlertCompo";

export default function Home() {
  const { missionData, loading } = useMission();

  if (loading) {
    return (
      <View style={loadingStyles.container}>
        <GalaxyBg />
        <ActivityIndicator size="large" color={C.cyan} />
        <Text style={loadingStyles.text}>Inicializando telemetria…</Text>
      </View>
    );
  }

  const energiaAlerta     = missionData.energy < 30;
  const temperaturaAlerta = missionData.temperature < 5 || missionData.temperature > 50;
  const pressaoAlerta     = missionData.pressure < 90;
  const umidadeAlerta     = missionData.humidity < 20 || missionData.humidity > 80;

  const statusText = (alert: boolean, ok: string) => alert ? "Fora do limite" : ok;

  return (
    <SafeAreaView style={appStyles.container}>
      <StatusBar barStyle="light-content" />


      <GalaxyBg />

      <ScrollView contentContainerStyle={appStyles.scrollContent}>


        <View style={appStyles.header}>
          <Text>MISSÃO ATIVA</Text>
          <Text style={appStyles.titulo}>
            Terminal{" "}
            <Text style={appStyles.tituloAccent}>Espacial</Text>
          </Text>
          <Text style={appStyles.subtitulo}>Telemetria em tempo real</Text>
        </View>


        <Alerts />


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


        <CardFelicidade orbitStatus={missionData.orbitStatus} />

        <CardEstabilidade estabilidade={missionData.energy} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: C.moonDust,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.6,
    marginBottom: S.xs,
    ...MONO,
  },
});

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.nebula,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: C.moonDust,
    fontSize: 13,
    ...MONO,
  },
});