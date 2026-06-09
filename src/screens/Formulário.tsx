import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/app.styles";
import Formulario from "../components/Formulário";



export default function Home({ navigation }: any) {

  return (

    <>

    <ScrollView>

      <Formulario>
        
      </Formulario>

    </ScrollView>
      
    </>
  );
}