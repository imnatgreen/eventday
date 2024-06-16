import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
// import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    commonjs({
      filter(id) {
        if (id.includes('node_modules/parkrun.js')) {
          return true;
        }
      }
    }),
    sveltekit()
  ]
  // build: {
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //     include: ['parkrun.js', 'parkrun.js/*']
  //   }
  // }
  // optimizeDeps: {
  //   // esbuildOptions: {
  //   //   plugins: [esbuildCommonjs(['parkrun.js'])] // the problematic cjs module
  //   // },
  //   exclude: ['parkrun.js'] // also here
  // }
});
