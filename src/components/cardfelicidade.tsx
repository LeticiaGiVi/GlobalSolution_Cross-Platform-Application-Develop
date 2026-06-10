

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MissionData } from "../interfaces/missionData";
import { C, R, S, MONO } from "../styles/app.styles";

interface CardFelicidadeProps {
  orbitStatus: MissionData["orbitStatus"];
}

const STATUS_CONFIG = {
  Estável:  { cor: C.success,  score: "100%", label: "Todos os sistemas nominais",  glow: "rgba(0,229,160,0.18)"  },
  Instável: { cor: C.amber,    score: "55%",  label: "Monitoramento necessário",    glow: "rgba(245,166,35,0.18)" },
  Offline:  { cor: C.danger,   score: "0%",   label: "Comunicação perdida",         glow: "rgba(255,77,106,0.18)" },
};

export default function CardFelicidade({ orbitStatus }: CardFelicidadeProps) {
  const cfg = STATUS_CONFIG[orbitStatus] ?? STATUS_CONFIG["Estável"];

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.eyebrow}>STATUS DA MISSÃO</Text>
        <View style={[styles.pill, { backgroundColor: cfg.glow, borderColor: cfg.cor + "60" }]}>
          <Text style={[styles.pillText, { color: cfg.cor }]}>
            {orbitStatus.toUpperCase()}
          </Text>
        </View>
      </View>


      <View style={[styles.gauge, { borderColor: cfg.cor, shadowColor: cfg.cor }]}>
        <Text style={[styles.score, { color: cfg.cor }]}>{cfg.score}</Text>
        <Text style={styles.gaugeLabel}>{cfg.label}</Text>
      </View>

  
      <View style={styles.metaRow}>
        <Text style={styles.metaItem}>▲ VELOCIDADE  <Text style={styles.metaValue}>7.9 km/s</Text></Text>
        <Text style={styles.metaItem}>◉ ÓRBITA  <Text style={styles.metaValue}>392 km</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.darkMatter,
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: C.borderSubtle,
    borderTopWidth: 1,
    borderTopColor: C.violetGlow.replace("0.18", "0.6"),
    padding: S.lg,
    marginVertical: S.sm,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: S.lg,
  },

  eyebrow: {
    color: C.moonDust,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    ...MONO,
  },

  pill: {
    borderRadius: R.pill,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pillText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    ...MONO,
  },

  gauge: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 10,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    marginBottom: S.lg,

    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 0,
  },

  score: {
    fontSize: 36,
    fontWeight: "700",
    ...MONO,
  },

  gaugeLabel: {
    fontSize: 11,
    color: C.moonDust,
    marginTop: 4,
    letterSpacing: 0.3,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderTopColor: C.borderSubtle,
    paddingTop: S.sm,
  },

  metaItem: {
    fontSize: 9,
    color: C.stardust,
    letterSpacing: 0.8,
    ...MONO,
  },

  metaValue: {
    color: C.cyan,
    fontWeight: "700",
  },
});