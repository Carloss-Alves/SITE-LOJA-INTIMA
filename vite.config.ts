import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Configuração do Vite
// Documentação: https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configurações do servidor local
  server: {
    // Permite acesso via rede local
    host: "::",

    // Porta onde o projeto será executado
    port: 8080,

    // Configuração do Hot Module Replacement (HMR)
    hmr: {
      // Desativa o overlay de erros na tela
      overlay: false,
    },
  },

  // Plugins utilizados no projeto
  plugins: [
    react(),
    // Plugin usado apenas em modo desenvolvimento
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // Configuração de atalhos de importação
  resolve: {
    alias: {
      // Atalho para a pasta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
