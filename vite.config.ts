import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/',
  // server: {
  //   host: true,
  //   port: 28847,
  // },
  optimizeDeps: {
    include: ['vue', 'buffer'],
  },
  plugins: [
    vue()
  ],
  build: {
    outDir: 'docs'
  },
  base: '/demo-dapp-with-vue-ui/',
  // base: process.env.GH_PAGES ? '/demo-dapp-with-vue-ui/' : './',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})
