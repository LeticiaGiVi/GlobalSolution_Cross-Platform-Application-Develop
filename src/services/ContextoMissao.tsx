// context/ContextoMissao.tsx
// Context API principal da aplicação.
// Comportamento:
//   • 1ª abertura → gera telemetria aleatória e grava no AsyncStorage
//   • Aberturas seguintes → carrega o que foi salvo (ou o que o usuário enviou pelo formulário)
//   • updateMissionData() → atualiza o estado global + persiste no disco

import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MissionData } from "../interfaces/missionData";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface MissionContextType {
  missionData: MissionData;
  updateMissionData: (newValues: MissionData) => Promise<void>;
  loading: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "@space_dashboard_mission_data";

const STATUS_OPCOES: MissionData["orbitStatus"][] = ["Estável", "Instável", "Offline"];

function gerarDadosAleatorios(): MissionData {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    energy: rand(75, 95),       // Entre 75% e 95%
    temperature: rand(18, 35),  // Entre 18°C e 35°C
    pressure: rand(98, 105),    // Entre 98 kPa e 105 kPa
    humidity: rand(40, 65),     // Entre 40% e 65%
    orbitStatus: STATUS_OPCOES[rand(0, STATUS_OPCOES.length - 1)],
  };
}

// ─── Context ─────────────────────────────────────────────────────────────────

const MissionContext = createContext<MissionContextType | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [missionData, setMissionData] = useState<MissionData>({
    energy: 0,
    temperature: 0,
    pressure: 0,
    humidity: 0,
    orbitStatus: "Estável",
  });
  const [loading, setLoading] = useState(true);

  // Inicialização assíncrona: lê o disco ou gera dados aleatórios
  useEffect(() => {
    async function inicializar() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos !== null) {
          // Já existe dado salvo (boot 2, 3, 4…) → carrega
          setMissionData(JSON.parse(dadosSalvos));
        } else {
          // Primeiro boot → gera aleatório e persiste
          const dadosIniciais = gerarDadosAleatorios();
          setMissionData(dadosIniciais);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dadosIniciais));
        }
      } catch (error) {
        console.error("[MissionContext] Erro na inicialização:", error);
      } finally {
        setLoading(false);
      }
    }

    inicializar();
  }, []);

  // Chamado pelo Formulário: atualiza estado global + persiste no disco
  const updateMissionData = async (newValues: MissionData): Promise<void> => {
    try {
      setMissionData(newValues);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newValues));
    } catch (error) {
      console.error("[MissionContext] Erro ao salvar dados:", error);
    }
  };

  return (
    <MissionContext.Provider value={{ missionData, updateMissionData, loading }}>
      {children}
    </MissionContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export const useMission = (): MissionContextType => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error("useMission deve ser usado dentro de um <MissionProvider>");
  }
  return context;
};