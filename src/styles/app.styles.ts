

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


export const C = {
  
  void:       "#02040A",   
  deep:       "#060B16",   
  nebula:     "#0A0F20",   
  darkMatter: "#0E1428",   
  cosmos:     "#131930",   
  horizon:    "#1A2240",   


  starlight:  "#EAF0FF",   
  moonDust:   "#8A9BBF",   
  stardust:   "#4A5878",  


  cyan:       "#00C8F0",   
  cyanGlow:   "rgba(0, 200, 240, 0.18)",
  cyanBorder: "rgba(0, 200, 240, 0.35)",
  violet:     "#7B68EE",  
  violetGlow: "rgba(123, 104, 238, 0.18)",
  amber:      "#F5A623",   
  danger:     "#FF4D6A",   
  dangerGlow: "rgba(255, 77, 106, 0.18)",
  success:    "#00E5A0",   


  borderSubtle: "rgba(255,255,255,0.06)",
  borderMid:    "rgba(255,255,255,0.12)",
  borderActive: "rgba(0, 200, 240, 0.40)",
};


export const S = {
  xs:  4,
  sm:  8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl:48,
};


export const R = {
  sm:  6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
};


export const SCREEN = { width, height };


export const MONO = { fontFamily: "monospace" } as const;


export const styles = StyleSheet.create({

 
  container: {
    flex: 1,
    backgroundColor: C.nebula,
  },

  scrollContent: {
    paddingHorizontal: S.md,
    paddingTop: S.md,
    paddingBottom: S.xxl,
  },

  
  galaxyBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  
  header: {
    alignItems: "flex-start",
    marginTop: S.xl,
    marginBottom: S.lg,
    paddingHorizontal: S.md,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: C.starlight,
    letterSpacing: 0.4,
    lineHeight: 34,
  },

  tituloAccent: {
    color: C.cyan,
  },

  subtitulo: {
    fontSize: 13,
    fontWeight: "400",
    color: C.moonDust,
    marginTop: S.xs,
    letterSpacing: 0.3,
  },

  
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: S.sm,
    marginBottom: S.sm,
  },

  
  card: {
    backgroundColor: C.darkMatter,
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: C.borderSubtle,
    padding: S.md,
  },

  cardElevated: {
    backgroundColor: C.cosmos,
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: C.cyanBorder,
    padding: S.md,
  },

  cardAlert: {
    backgroundColor: "#130810",
    borderRadius: R.lg,
    borderWidth: 0.5,
    borderColor: "rgba(255, 77, 106, 0.45)",
    padding: S.md,
  },

 
  divider: {
    height: 0.5,
    backgroundColor: C.borderSubtle,
    marginVertical: S.md,
  },

  
  badge: {
    alignSelf: "flex-start",
    backgroundColor: C.cyanGlow,
    borderRadius: R.pill,
    borderWidth: 0.5,
    borderColor: C.cyanBorder,
    paddingHorizontal: S.sm,
    paddingVertical: 3,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: C.cyan,
    letterSpacing: 1,
    ...MONO,
  },

  
  textPrimary: {
    color: C.starlight,
    fontSize: 15,
  },

  textSecondary: {
    color: C.moonDust,
    fontSize: 13,
  },

  textMono: {
    color: C.cyan,
    fontSize: 13,
    ...MONO,
  },

  label: {
    color: C.moonDust,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    ...MONO,
  },
});