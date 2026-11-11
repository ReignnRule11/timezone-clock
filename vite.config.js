import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repository under /timezone-clock/; Vercel serves at /.
  base: process.env.GITHUB_ACTIONS ? '/timezone-clock/' : '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Use Vite's built-in esbuild minifier; terser is not installed in this project.
    minify: 'esbuild',
  },
});
