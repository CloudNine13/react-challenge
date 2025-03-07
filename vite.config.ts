import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'react-challenge',
      formats: ['iife'],
      fileName: 'bundle',
    },
    sourcemap: false,
  },
});
