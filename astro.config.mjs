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
    // Remover localhost de dominios permitidos para producción
    domains: ["gatorojolab.com"],
  },
  
  // Configuración de rendimiento
  build: {
    assets: "public", // Esto habilita el caché en la carpeta public
  },
  
  // Configuración de seguridad
  vite: {
    optimizeDeps: {
      exclude: ['@vercel/analytics']
    },
    // Headers de seguridad para desarrollo
    server: {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      }
    }
  }
});
