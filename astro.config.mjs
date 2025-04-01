// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://gatorojolab.com",
  integrations: [react(), sitemap()],
  
  // Configuración de imágenes
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    domains: ["localhost", "gatorojolab.com"],
  },
  
  // Configuración de rendimiento
  build: {
    assets: "public", // Esto habilita el caché en la carpeta public
  },
  
  // Deshabilitar Vercel Insights en modo local
  vite: {
    optimizeDeps: {
      exclude: ['@vercel/analytics']
    }
  }
});
