# GlobalSolution_Cross-Platform-Application-Develop
# Central de Monitoramento de Missões Espaciais

App mobile em React Native + Expo para simulação de uma central de controle de missão espacial.

## Integrantes 


| Nome Completo | RM |
|---|---|
| Leticia | RM564028 |
| Giovanna | RM562018 |
| Sarah | RM563841 |

### Ciência da computação - 2CCR
---

## Funcionalidades

### Requisitos obrigatórios :

- **Dashboard** com dados em tempo real de energia, oxigênio, comunicação, estabilidade orbital, combustível, temperatura, pressão e radiação
- **Alertas automáticos** gerados quando sensores ultrapassam limiares críticos ou de atenção
- **Formulários com validação** em Config (dados da missão) e Logs (diário) e Equipe (edição de tripulante)
- **Navegação entre telas** com Expo Router / React Navigation (6 telas)
- **Persistência local** com AsyncStorage para configurações, alertas, equipe e logs
- **Gerenciamento de estado global** com Context API (`ContextoMissao`)

---

## Estrutura de Telas

| Tela | Descrição |
|---|---|
| **Dashboard (Home)** | Visão geral: status da missão, sensores críticos, ambiente da nave, tripulação |
| **Sensores** | Dados detalhados por categoria: Energia, Ambiente, Navegação, Comunicação |
| **Equipe** | Status da tripulação, frequência cardíaca, SpO₂, edição individual |
| **Alertas** | Central de alertas automáticos com filtros, confirmação e limpeza |
|  **Config** | Formulário de configuração da missão, status e ajuste manual de sensores |
| **Logs** | Diário da missão com registro de eventos, filtros por tipo |

---

##  Requisitos Técnicos

- **Context API**: `MissionProvider` compartilha estado de sensores, alertas, equipe e configuração entre todas as telas
- **AsyncStorage**: persiste configuração da missão, alertas lidos, status e logs
- **Expo Router / React Navigation**: navegação lateral com 6 rotas
- **Formulários validados**: campos obrigatórios, formatos, ranges numéricos, feedback visual de erro
- **Design temático espacial**: paleta dark com ciano (#00D4FF), roxo (#7B2FFF), fundo escuro (#060B1A), fonte mono

---

## 🚀 Como rodar

```bash
npm install
npx expo start
```
