

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CardProps } from "../interfaces/CardDados";
import { C, R, S, MONO } from "../styles/app.styles";

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


      <View style={styles.valueRow}>
        <Text style={[styles.value, isAlert && styles.valueAlert]}>
          {value}
        </Text>
        {unit ? (
          <Text style={[styles.unit, isAlert && styles.unitAlert]}>{unit}</Text>
        ) : null}
      </View>


      {statusText ? (
        <View style={[styles.statusPill, isAlert && styles.statusPillAlert]}>
          <Text style={[styles.statusText, isAlert && styles.statusTextAlert]}>
            {isAlert ? "⚠ " : "● "}
            {statusText}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.darkMatter,
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: C.cyanBorder,
    padding: S.md,
    width: "48%",

    borderTopWidth: 1.5,
    borderTopColor: "rgba(0, 200, 240, 0.50)",
  },
  cardAlert: {
    backgroundColor: "#100810",
    borderColor: "rgba(255, 77, 106, 0.40)",
    borderTopColor: C.danger,
  },

  title: {
    color: C.moonDust,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: S.sm,
    ...MONO,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: S.xs,
  },

  value: {
    color: C.cyan,
    fontSize: 30,
    fontWeight: "700",
    ...MONO,
  },
  valueAlert: {
    color: C.danger,
  },

  unit: {
    color: C.moonDust,
    fontSize: 13,
    marginLeft: 4,
    ...MONO,
  },
  unitAlert: {
    color: "rgba(255,77,106,0.7)",
  },

  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: C.cyanGlow,
    borderRadius: R.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: S.xs,
  },
  statusPillAlert: {
    backgroundColor: C.dangerGlow,
  },

  statusText: {
    color: C.cyan,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.6,
    ...MONO,
  },
  statusTextAlert: {
    color: C.danger,
  },
});