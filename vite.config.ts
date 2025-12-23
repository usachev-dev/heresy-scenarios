import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import analyze from 'rollup-plugin-analyzer';
import { imagetools } from 'vite-imagetools'
import svgLoader from 'vite-svg-loader'
import { ViteToml } from 'vite-plugin-toml';
// @ts-ignore
import mdLoader, {Mode} from 'vite-plugin-markdown';

let host = "https://clouds-of-smoke.com"
// @ts-ignore
let isDev = process.env.npm_lifecycle_event == "dev";
let isBeta = true;

if (isBeta) {
  host = "https://clouds-beta.web.app"
}
if (isDev) {
  host = "http://localhost:3000"
}

let version = "2.0b"

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
    }
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
    VERSION: JSON.stringify(version)
  }
});
