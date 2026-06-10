
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { C, R, S, MONO } from "../styles/app.styles";

interface CardEstabilidadeProps {
  estabilidade: number; 
}

export default function CardEstabilidade({ estabilidade }: CardEstabilidadeProps) {
  const getColor = () => {
    if (estabilidade >= 80) return C.success;
    if (estabilidade >= 50) return C.amber;
    return C.danger;
  };

  const getGlow = () => {
    if (estabilidade >= 80) return "rgba(0,229,160,0.22)";
    if (estabilidade >= 50) return "rgba(245,166,35,0.22)";
    return C.dangerGlow;
  };

  const getStatus = () => {
    if (estabilidade >= 80) return "NOMINAL";
    if (estabilidade >= 50) return "ATENÇÃO";
    return "CRÍTICO";
  };

  const color = getColor();

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.eyebrow}>ESTABILIDADE ORBITAL</Text>
        <View style={[styles.statusPill, { backgroundColor: getGlow(), borderColor: color + "55" }]}>
          <Text style={[styles.statusText, { color }]}>{getStatus()}</Text>
        </View>
      </View>


      <Text style={[styles.value, { color }]}>{estabilidade}%</Text>


      <View style={styles.track}>

        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor:
                  i < Math.round(estabilidade / 5)
                    ? color
                    : C.horizon,
                opacity: i < Math.round(estabilidade / 5) ? 0.9 : 0.4,
              },
            ]}
          />
        ))}
      </View>


      <View style={styles.scale}>
        {["0", "25", "50", "75", "100"].map((v) => (
          <Text key={v} style={styles.scaleText}>{v}</Text>
        ))}
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
    borderTopColor: "rgba(123,104,238,0.55)",
    padding: S.lg,
    marginVertical: S.sm,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: S.sm,
  },

  eyebrow: {
    color: C.moonDust,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    ...MONO,
  },

  statusPill: {
    borderRadius: R.pill,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    ...MONO,
  },

  value: {
    fontSize: 44,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: S.md,
    ...MONO,
  },

  track: {
    flexDirection: "row",
    gap: 3,
    height: 10,
    marginBottom: S.xs,
  },

  segment: {
    flex: 1,
    borderRadius: 2,
  },

  scale: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: S.xs,
  },

  scaleText: {
    color: C.stardust,
    fontSize: 9,
    ...MONO,
  },
});