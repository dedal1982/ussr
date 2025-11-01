import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  // Настройки сервера
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        tags: [
          // Предзагрузка критичного изображения
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/CookieIcon-D5mrp4Jt.svg",
              as: "image",
              fetchpriority: "high",
            },
            injectTo: "head",
          },
          // Предзагрузка важного скрипта
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/vendor-esm.js",
              as: "script",
            },
            injectTo: "head",
          },
          // Предзагрузка шрифта
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/font.woff2",
              as: "font",
              type: "font/woff2",
              crossorigin: "anonymous",
            },
            injectTo: "head",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
