import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' gera caminhos relativos no build, então o site funciona no
// GitHub Pages qualquer que seja o nome do repositório.
export default defineConfig({
  plugins: [react()],
  base: './',
});
