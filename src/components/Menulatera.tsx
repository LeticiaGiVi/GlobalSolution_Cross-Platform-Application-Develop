

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C, R, S, MONO } from "../styles/app.styles";

const NAV_ITEMS = [
  { label: "Dashboard", screen: "Home"    },
  { label: "Telemetria",  screen: "Config"  },
  { label: "Alertas",   screen: "Alertas" },
];

export default function MenuLateral() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>

      <View style={styles.logoBlock}>
        <View style={styles.logoDot} />
        <Text style={styles.logo}>TERMINAL<Text style={styles.logoAccent}> //</Text></Text>
      </View>


      <View style={styles.nav}>
        {NAV_ITEMS.map(({ label, screen }) => (
          <TouchableOpacity
            key={screen}
            style={styles.navBtn}
            onPress={() => navigation.navigate(screen)}
            activeOpacity={0.7}
          >
            <Text style={styles.navText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: S.md,
    backgroundColor: C.deep,
    borderBottomWidth: 0.5,
    borderBottomColor: C.cyanBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: S.xs,
  },
  logoDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.cyan,
  },
  logo: {
    color: C.starlight,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    ...MONO,
  },
  logoAccent: {
    color: C.cyan,
  },

  nav: {
    flexDirection: "row",
    gap: S.xs,
  },

  navBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: R.sm,
    backgroundColor: C.cosmos,
    borderWidth: 0.5,
    borderColor: C.borderMid,
  },

  navText: {
    color: C.moonDust,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});