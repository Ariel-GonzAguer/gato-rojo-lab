/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import react from '@vitejs/plugin-react';

export default getViteConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}']
  }
});
