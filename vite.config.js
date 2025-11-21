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
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/style-BGE8jlOu.css",
              as: "style",
              fetchPriority: "high",
              crossorigin: "anonymous",
            },
            injectTo: "head",
          },
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/CookieIcon-D5mrp4Jt.svg",
              as: "image",
              fetchPriority: "high",
            },
            injectTo: "head",
          },
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
    cssCodeSplit: false,
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
