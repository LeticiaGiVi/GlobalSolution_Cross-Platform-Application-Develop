// components/Formulário.tsx
// Formulário de reconfiguração de telemetria.
// Valida os campos, chama updateMissionData() do Context e navega de volta ao Dashboard.

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useMission } from "../services/ContextoMissao";
import { MissionData } from "../interfaces/missionData";

const ESTADOS_VALIDOS: MissionData["orbitStatus"][] = ["Estável", "Instável", "Offline"];

export default function Formulario() {
  const { missionData, updateMissionData } = useMission();
  const router = useRouter();

  // Inicializa os campos com os valores atuais do Context
  const [energia, setEnergia] = useState(missionData.energy.toString());
  const [temperatura, setTemperatura] = useState(missionData.temperature.toString());
  const [pressao, setPressao] = useState(missionData.pressure.toString());
  const [umidade, setUmidade] = useState(missionData.humidity.toString());
  
  // Corrigido: Tipado explicitamente como string para aceitar a digitação do TextInput
  const [comunicacao, setComunicacao] = useState<string>(missionData.orbitStatus);

  async function validarETransmitir() {
    // 1. Campos vazios
    if (
      energia.trim() === "" ||
      temperatura.trim() === "" ||
      pressao.trim() === "" ||
      umidade.trim() === "" ||
      comunicacao.trim() === ""
    ) {
      Alert.alert(" ERRO DE TRANSMISSÃO", "Preencha todos os campos de telemetria.");
      return;
    }

    const energiaNum = Number(energia);
    const temperaturaNum = Number(temperatura);
    const pressaoNum = Number(pressao);
    const umidadeNum = Number(umidade);

    // 2. Validações de limites
    if (isNaN(energiaNum) || energiaNum < 0 || energiaNum > 100) {
      Alert.alert("FALHA NO SISTEMA", "A Energia deve estar entre 0% e 100%.");
      return;
    }

    if (isNaN(temperaturaNum) || temperaturaNum < -150 || temperaturaNum > 150) {
      Alert.alert(
        " ANOMALIA TÉRMICA",
        "Temperatura inválida para os limites da nave (-150°C a 150°C)."
      );
      return;
    }

    if (isNaN(pressaoNum) || pressaoNum <= 0) {
      Alert.alert(
        " PRESSÃO CRÍTICA",
        "A pressão atmosférica interna deve ser maior que 0 kPa."
      );
      return;
    }

    if (isNaN(umidadeNum) || umidadeNum < 0 || umidadeNum > 100) {
      Alert.alert(" SUPORTE DE VIDA", "A Umidade deve estar entre 0% e 100%.");
      return;
    }

    // Normaliza o status: primeira letra maiúscula, resto minúsculo
    const comunicacaoFormatada = (
      comunicacao.trim().charAt(0).toUpperCase() +
      comunicacao.trim().slice(1).toLowerCase()
    ) as MissionData["orbitStatus"];

    if (!ESTADOS_VALIDOS.includes(comunicacaoFormatada)) {
      Alert.alert(
        "LINK DE COMUNICAÇÃO",
        "O estado deve ser exatamente: Estável, Instável ou Offline"
      );
      return;
    }

    // 3. Envia os dados validados para o Context + AsyncStorage
    await updateMissionData({
      energy: energiaNum,
      temperature: temperaturaNum,
      pressure: pressaoNum,
      humidity: umidadeNum,
      orbitStatus: comunicacaoFormatada,
    });

    Alert.alert(" SUCESSO", "Novos parâmetros transmitidos à central com sucesso!");
    router.push("/");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>RECONFIGURAR PARÂMETROS</Text>

      <Text style={styles.label}>NÍVEL DE ENERGIA (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 85"
        placeholderTextColor="#4A5568"
        keyboardType="numeric"
        value={energia}
        onChangeText={setEnergia}
      />

      <Text style={styles.label}>TEMPERATURA INTERNA (°C)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 22"
        placeholderTextColor="#4A5568"
        keyboardType="numeric"
        value={temperatura}
        onChangeText={setTemperatura}
      />

      <Text style={styles.label}>PRESSÃO DA CABINE (kPa)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 101"
        placeholderTextColor="#4A5568"
        keyboardType="numeric"
        value={pressao}
        onChangeText={setPressao}
      />

      <Text style={styles.label}>UMIDADE DO AR (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 45"
        placeholderTextColor="#4A5568"
        keyboardType="numeric"
        value={umidade}
        onChangeText={setUmidade}
      />

      <Text style={styles.label}>LINK DE COMUNICAÇÃO (Estável | Instável | Offline)</Text>
      <TextInput
        style={styles.input}
        placeholder="Estável, Instável ou Offline"
        placeholderTextColor="#4A5568"
        value={comunicacao}
        onChangeText={setComunicacao}
        autoCorrect={false}
        autoCapitalize="words"
      />

      <TouchableOpacity style={styles.button} onPress={validarETransmitir}>
        <Text style={styles.buttonText}>TRANSMITIR NOVOS DADOS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    color: "#43cb43",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  label: {
    color: "#23b35a",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#000000",
    borderColor: "#48d419",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: "#FFF",
    fontSize: 15,
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: "#40ad2d",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#00ff049d",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#020408",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
});