import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: "/src/main.jsx",
            },
            injectTo: "body",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    cssCodeSplit: true,
    emptyOutDir: true,
    manifest: "manifest.json",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),

      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
