

import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView, StatusBar,
} from "react-native";
import { Alerts } from "../components/AlertCompo";
import GalaxyBg from "../components/back";
import { C, R, S, MONO } from "../styles/app.styles";

interface AlertaItem {
  id: string;
  sistema: string;
  mensagem: string;
  timestamp: string;
  nivel: "critico" | "aviso" | "estavel";
}

const ALERTAS_MOCK: AlertaItem[] = [
  { id:"1", sistema:"Propulsão",    mensagem:"Temperatura do motor principal acima de 1200°C.", timestamp:"T+ 02:45:12", nivel:"critico" },
  { id:"2", sistema:"Energia",      mensagem:"Painéis solares com 15% menos captação (poeira cósmica).", timestamp:"T+ 02:40:05", nivel:"aviso" },
  { id:"3", sistema:"Suporte de Vida", mensagem:"Níveis de oxigênio estáveis em 21%.", timestamp:"T+ 02:35:50", nivel:"estavel" },
  { id:"4", sistema:"Escudo",        mensagem:"Flutuação de 3% na integridade do escudo — setor primário.", timestamp:"T+ 02:12:18", nivel:"aviso" },
  { id:"5", sistema:"Reentrada",     mensagem:"Sensores de pressão externa calibrados e nominais.", timestamp:"T+ 01:55:00", nivel:"estavel" },
];

const NIVEL_COLOR: Record<string, string> = {
  critico: C.danger,
  aviso:   C.amber,
  estavel: C.success,
};

const NIVEL_BG: Record<string, string> = {
  critico: C.dangerGlow,
  aviso:   "rgba(245,166,35,0.14)",
  estavel: "rgba(0,229,160,0.12)",
};

type Filtro = "todos" | "critico" | "aviso";

export default function Alertas() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const lista = ALERTAS_MOCK.filter(a =>
    filtro === "todos" ? true : a.nivel === filtro
  );

  const renderItem = ({ item }: { item: AlertaItem }) => (
    <View style={[styles.card, { borderLeftColor: NIVEL_COLOR[item.nivel] }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.sistemaText}>{item.sistema.toUpperCase()}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.mensagem}>{item.mensagem}</Text>
      <View style={[styles.badge, { backgroundColor: NIVEL_BG[item.nivel], borderColor: NIVEL_COLOR[item.nivel] + "50" }]}>
        <Text style={[styles.badgeText, { color: NIVEL_COLOR[item.nivel] }]}>
          {item.nivel.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <GalaxyBg />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>MISSÃO ESPACIAL</Text>
        <Text style={styles.title}>Painel de Alertas</Text>
        <Text style={styles.subtitle}>Status atualizado em tempo real</Text>
      </View>

      <View style={{ paddingHorizontal: S.md }}>
        <Alerts />
      </View>

      <View style={styles.filterRow}>
        {([
          { key: "todos",   label: "Todos"    },
          { key: "critico", label: "Críticos" },
          { key: "aviso",   label: "Avisos"   },
        ] as { key: Filtro; label: string }[]).map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.filterBtn,
              filtro === key && { backgroundColor: NIVEL_COLOR[key] ?? C.cyan, borderColor: "transparent" },
            ]}
            onPress={() => setFiltro(key)}
            activeOpacity={0.75}
          >
            <Text style={[
              styles.filterText,
              filtro === key && { color: key === "todos" ? C.nebula : "#fff" },
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <FlatList
        data={lista}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum alerta para este filtro.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.nebula,
  },

  header: {
    paddingHorizontal: S.md,
    paddingTop: S.xxl + S.lg,
    marginBottom: S.md,
  },
  eyebrow: {
    color: C.moonDust,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.6,
    marginBottom: S.xs,
    ...MONO,
  },
  title: {
    color: C.starlight,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subtitle: {
    color: C.moonDust,
    fontSize: 13,
    marginTop: 4,
  },

  filterRow: {
    flexDirection: "row",
    paddingHorizontal: S.md,
    marginBottom: S.md,
    gap: S.sm,
  },
  filterBtn: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: R.pill,
    backgroundColor: C.cosmos,
    borderWidth: 0.5,
    borderColor: C.borderMid,
  },
  filterText: {
    color: C.moonDust,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
  },

  list: {
    paddingHorizontal: S.md,
    paddingBottom: S.xxl,
  },

  card: {
    backgroundColor: C.darkMatter,
    borderRadius: R.md,
    borderWidth: 0.5,
    borderColor: C.borderSubtle,
    borderLeftWidth: 3,
    padding: S.md,
    marginBottom: S.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: S.sm,
  },
  sistemaText: {
    color: C.starlight,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    ...MONO,
  },
  timestamp: {
    color: C.stardust,
    fontSize: 10,
    ...MONO,
  },
  mensagem: {
    color: C.moonDust,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: S.sm,
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: R.sm,
    borderWidth: 0.5,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    ...MONO,
  },

  empty: {
    color: C.stardust,
    textAlign: "center",
    marginTop: S.xxl,
    fontSize: 14,
    ...MONO,
  },
});