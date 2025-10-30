import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import vitePurgeCss from "vite-plugin-purgecss";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    vitePurgeCss({
      content: ["./index.html", "./src/**/*.jsx", "./src/**/*.tsx"],
      safelist: [],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          // Можно вставлять дополнительные теги или переменные
        },
        tags: [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              as: "style",
              href: "/assets/index-ByPdVx4C.css",
            },
          },
        ],
      },
    }),
  ],
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
  },
});
