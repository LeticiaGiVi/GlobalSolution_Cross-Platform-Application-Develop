// styles/app.styles.ts
// Estilos globais compartilhados entre as telas.
// Arquivos Adimin_styles.ts e consultaCard_styles.ts foram removidos
// por serem incoerentes com o tema espacial.

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.88)"

  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
  },
  header: {
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#77eb0abe",
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 16,
    color: "#26e633d3",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

