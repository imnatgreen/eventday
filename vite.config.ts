import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [viteCommonjs(), sveltekit()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['parkrun.js'])] // the problematic cjs module
    },
    include: ['parkrun.js'] // also here
  }
});
