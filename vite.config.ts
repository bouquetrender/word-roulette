import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      compressionOptions: {
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: false,
        verbose: true,
      },
    }),
    svgr({
      svgrOptions: { icon: true },
    }),
  ],
  optimizeDeps: {
    include: ["@svgr/webpack"],
  },
});
