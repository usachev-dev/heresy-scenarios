import {defineConfig} from 'vite';
// @ts-ignore
import reactPlugin from '@vitejs/plugin-react';
import {imagetools} from 'vite-imagetools'
import svgLoader from 'vite-svg-loader'
import {ViteToml} from 'vite-plugin-toml';
// @ts-ignore
import mdLoader, {Mode} from 'vite-plugin-markdown';

let host = "https://heresy-scenarios.web.app/"
// @ts-ignore
let isDev = process.env.npm_lifecycle_event == "dev";

if (isDev) {
  host = "http://localhost:3000"
}


export default defineConfig({
  plugins: [
    reactPlugin(),
    imagetools(),
    svgLoader(),
    ViteToml(),
    mdLoader({
      mode: [Mode.REACT]
    }),
    // analyze()
  ],
  server: {
    port: 3000,
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {scss: {api: 'modern-compiler', silenceDeprecations: ['import', 'global-builtin']}}
  },
  build: {
    target: 'esnext',
    sourcemap: !isDev ? false : 'inline',
    watch: !isDev ? null : {
      buildDelay: 3000
    }
  },
  base: "/",
  define: {
    HOST: JSON.stringify(host),
    ISDEV: JSON.stringify(isDev),
    VERSION: JSON.stringify(1)
  }
});
