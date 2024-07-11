import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default ({ mode }) => {
  const isGitHubPages = loadEnv(mode , process.cwd()).VITE_GH_PAGES == "1";
  console.log(isGitHubPages);
  return defineConfig({
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
    base: isGitHubPages ? '/demo-dapp-with-vue-ui/' : './',
    server: {
      fs: {
        allow: ['../sdk', './'],
      },
    },
  })
}
