import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { Alerts } from "../components/AlertCompo";

interface AlertaItem {
  id: string;
  sistema: string;
  mensagem: string;
  timestamp: string;
  nivel: "critico" | "aviso" | "estavel";
}

const ALERTAS_MOCK: AlertaItem[] = [
  {
    id: "1",
    sistema: "🚀 Propulsão",
    mensagem: "Temperatura do motor principal acima de 1200°C. Risco de superaquecimento.",
    timestamp: "T+ 02:45:12",
    nivel: "critico",
  },
  {
    id: "2",
    sistema: "🔋 Energia",
    mensagem: "Painéis solares com 15% a menos de captação devido à poeira cósmica.",
    timestamp: "T+ 02:40:05",
    nivel: "aviso",
  },
  {
    id: "3",
    sistema: "💨 Suporte de Vida",
    mensagem: "Níveis de oxigênio na cabine principal estáveis em 21%.",
    timestamp: "T+ 02:35:50",
    nivel: "estavel",
  },
  {
    id: "4",
    sistema: "🛡️ Escudo Defletor",
    mensagem: "Flutuação de 3% na integridade do escudo no setor primário.",
    timestamp: "T+ 02:12:18",
    nivel: "aviso",
  },
  {
    id: "5",
    sistema: "🔥 Reentrada",
    mensagem: "Sensores de pressão externa calibrados e operando normalmente.",
    timestamp: "T+ 01:55:00",
    nivel: "estavel",
  },
];

export default function Alertas() {
  const [filtro, setFiltro] = useState<"todos" | "critico" | "aviso">("todos");

  // Filtra a lista de alertas com base no botão selecionado
  const alertasFiltrados = ALERTAS_MOCK.filter((alerta) => {
    if (filtro === "todos") return true;
    return alerta.nivel === filtro;
  });

  // Função para estilizar a borda esquerda com base na gravidade
  const getCorNivel = (nivel: string) => {
    switch (nivel) {
      case "critico":
        return "#EF4444"; // Vermelho
      case "aviso":
        return "#F59E0B"; // Amarelo/Laranja
      default:
        return "#10B981"; // Verde
    }
  };

  const renderItem = ({ item }: { item: AlertaItem }) => (
    <View style={[styles.card, { borderLeftColor: getCorNivel(item.nivel) }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.sistemaText}>{item.sistema}</Text>
        <Text style={styles.timestampText}>{item.timestamp}</Text>
      </View>
      <Text style={styles.mensagemText}>{item.mensagem}</Text>
      <View style={[styles.badge, { backgroundColor: getCorNivel(item.nivel) + "20" }]}>
        <Text style={[styles.badgeText, { color: getCorNivel(item.nivel) }]}>
          {item.nivel.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Título da Página com margem interna para não bater no botão hamburguer do menu */}
      <View style={styles.header}>
        <Text style={styles.title}>Painel de Alertas</Text>
        <Text style={styles.subtitle}>Status atualizado da Missão Espacial</Text>
      </View>

      {/* Botões de Filtro */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filtro === "todos" && styles.filterActive]}
          onPress={() => setFiltro("todos")}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filtro === "critico" && styles.filterActiveCritico]}
          onPress={() => setFiltro("critico")}
        >
          <Text style={styles.filterText}>⚠️ Críticos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filtro === "aviso" && styles.filterActiveAviso]}
          onPress={() => setFiltro("aviso")}
        >
          <Text style={styles.filterText}>🔔 Avisos</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Alertas */}
      <FlatList
        data={alertasFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum alerta encontrado para este filtro.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Mantém o fundo azul escuro do seu menu espacial
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 110, // Recuo grande para o título não sumir atrás do botão "☰" fixo
    marginBottom: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#1E293B",
  },
  filterText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  filterActive: {
    backgroundColor: "#38BDF8", // Azul brilhante estilo sci-fi
  },
  filterActiveCritico: {
    backgroundColor: "#EF4444",
  },
  filterActiveAviso: {
    backgroundColor: "#F59E0B",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5, // A bordinha colorida que indica o perigo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sistemaText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timestampText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace", // Estilo relógio de missão
  },
  mensagemText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});