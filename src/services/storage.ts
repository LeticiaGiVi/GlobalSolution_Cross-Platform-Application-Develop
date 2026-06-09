import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SensorData = {
  energy: number;
  oxygen: number;
  stability: number;
  communication: number;
};

type MissionContextType = {
  sensors: SensorData;
  updateSensors: (data: SensorData) => void;
};

const MissionContext = createContext({} as MissionContextType);

export function MissionProvider({ children }: any) {
  const [sensors, setSensors] = useState<SensorData>({
    energy: 80,
    oxygen: 70,
    stability: 90,
    communication: 85,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await AsyncStorage.getItem("mission");
    if (data) setSensors(JSON.parse(data));
  }

  async function updateSensors(data: SensorData) {
    setSensors(data);
    await AsyncStorage.setItem("mission", JSON.stringify(data));
  }
}