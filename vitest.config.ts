import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Configuração principal do projeto
export default defineConfig({
  // Plugins utilizados pelo Vite
  plugins: [react()],

  // Configurações de teste (Vitest)
  test: {
    // Ambiente de teste simulando navegador
    environment: "jsdom",

    // Permite usar funções globais nos testes
    globals: true,

    // Arquivo de configuração inicial dos testes
    setupFiles: ["./src/test/setup.ts"],

    // Arquivos que serão considerados testes
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },

  // Configuração de caminhos (atalhos de importação)
  resolve: {
    alias: {
      // Permite usar "@/arquivo" no lugar de caminhos longos
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
