import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://gatorojolab.com",
  integrations: [react(), sitemap()],
  experimental: {
    // CSP experimental de Astro: genera meta CSP con hashes para los scripts/estilos procesados
    csp: {
      // Algoritmo por defecto es SHA-256
      directives: [
        "default-src 'none'",
        "img-src 'self' data: https://gatorojolab.com",
        "font-src 'self' data:",
        "connect-src 'self' https://analytics.vercel.com https://api.emailjs.com",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "manifest-src 'self'",
        "media-src 'self'",
        "worker-src 'self'"
      ],
      scriptDirective: {
        // Permitir orígenes externos necesarios además de 'self'
        resources: ["'self'", "https://vercel.live", "https://analytics.vercel.com"]
      },
      styleDirective: {
        // Mantener estilos inline si alguna librería los usa
        resources: ["'self'", "'unsafe-inline'"]
      }
    }
  },

  // (El flag csp: true queda subsumido por la configuración detallada de arriba)

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
