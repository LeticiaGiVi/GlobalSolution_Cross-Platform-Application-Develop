// interfaces/missionData.ts
// Única fonte de verdade para os dados de telemetria da missão

export interface MissionData {
  energy: number;      // 0–100 (%)
  temperature: number; // -150 a 150 (°C)
  pressure: number;    // > 0 (kPa)
  humidity: number;    // 0–100 (%)
  orbitStatus: "Estável" | "Instável" | "Offline";
}