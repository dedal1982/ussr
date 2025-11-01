import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

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
              href: "/index-Bbjd3EQK.js",
              as: "script",
              crossorigin: "anonymous",
            },
            injectTo: "head",
          },
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: "/index-2AiFykpb.css",
              as: "style",
              fetchpriority: "high",
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
              fetchpriority: "high",
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
    },
  },
  build: {
    minify: "esbuild", // минификация JS
    target: "esnext",
    cssCodeSplit: true,
    emptyOutDir: true,
    manifest: "manifest.json",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("lodash")) {
              return "lodash-vendor";
            }
            return "vendor";
          }
        },
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
