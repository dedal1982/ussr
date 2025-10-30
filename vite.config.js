import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
// Импортируем плагин PurgeCSS для удаления неиспользуемых стилей
import vitePurgeCss from "vite-plugin-purgecss";

export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    // Добавляем PurgeCSS
    vitePurgeCss({
      content: ["./index.html", "./src/**/*.jsx", "./src/**/*.tsx"],
      safelist: [],
    }),
  ],
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
  },
});
