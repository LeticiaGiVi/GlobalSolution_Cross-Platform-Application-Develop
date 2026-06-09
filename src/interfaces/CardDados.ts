// interfaces/CardDados.ts

export interface CardProps {
  title: string;          // Nome do sensor (ex: "ENERGIA")
  value: string | number; // Valor atual (ex: 85 ou "Estável")
  unit?: string;          // Unidade opcional (ex: "%", "°C", "kPa")
  statusText?: string;    // Texto auxiliar de status (ex: "Ótimo", "Atenção")
  isAlert?: boolean;      // true → borda e valor ficam vermelhos
}