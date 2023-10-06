/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
  ],
});
