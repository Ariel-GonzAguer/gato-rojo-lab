/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import react from '@vitejs/plugin-react';

export default getViteConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: './tests/setup.ts',
    include: ['src/**/*.{test}.{js,ts,jsx,tsx}'],
    // configuración para poder testar componentes Astro en node y componentes React en jsdom
    workspace: [
      {
        extends: true,
        test: {
          include: ['tests/**.test.{jsx,tsx}'],
          environment: 'jsdom',
          setupFiles: './tests/setup.ts',
        },
      },
      {
        extends: true,
        test: {
          include: ['tests/**.test.{js,ts}'],
          environment: 'node',
          setupFiles: './tests/setup.ts',
        },
      },
    
    ]
    
  }
});
