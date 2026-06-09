// components/CardDashboard.tsx
// Card de telemetria reutilizável.
// Props definidas em interfaces/CardDados.ts

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CardProps } from "../interfaces/CardDados";

export default function Card({
  title,
  value,
  unit = "",
  statusText,
  isAlert = false,
}: CardProps) {
  return (
    <View style={[styles.card, isAlert && styles.cardAlert]}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, isAlert && styles.valueAlert]}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>

      {statusText ? (
        <Text style={[styles.statusText, isAlert && styles.statusTextAlert]}>
          {isAlert ? "Atenção " : "Sinal "}
          {statusText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    width: "48%",
    borderWidth: 1,
    borderColor: "#47d627",
  },
  cardAlert: {
    borderColor: "#EF4444",
    backgroundColor: "#1A0B0B",
  },
  title: {
    color: "#f6f6f6",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  value: {
    color: "#5cdd5c",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  valueAlert: {
    color: "#EF4444",
  },
  unit: {
    color: "#fdfdfd",
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "monospace",
  },
  statusText: {
    color: "#3ed738",
    fontSize: 12,
    marginTop: 8,
    fontFamily: "monospace",
  },
  statusTextAlert: {
    color: "#d33535",
  },
});