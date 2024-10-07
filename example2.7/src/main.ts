import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { runSingleInstance } from './utils/run-signle-instance';
import { worker } from './server/worker';
import { THEME, TonConnectUIPlugin, TonConnectUIProviderProps } from '@townsquarelabs/ui-vue';
import { isVue2 } from 'vue-demi';
console.log(isVue2);

const options : TonConnectUIProviderProps = {
  manifestUrl:
    "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json",
  uiPreferences: { theme: THEME.DARK },
  walletsListConfiguration: {
    includeWallets: [
      {
        appName: "safepalwallet",
        name: "SafePal",
        imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
        tondns: "",
        aboutUrl: "https://www.safepal.com",
        universalLink: "https://link.safepal.io/ton-connect",
        jsBridgeKey: "safepalwallet",
        bridgeUrl: "https://ton-bridge.safepal.com/tonbridge/v1/bridge",
        platforms: ["ios", "android", "chrome", "firefox"],
      },
      {
        appName: "tonwallet",
        name: "TON Wallet",
        imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
        aboutUrl:
          "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
        universalLink: "https://wallet.ton.org/ton-connect",
        jsBridgeKey: "tonwallet",
        bridgeUrl: "https://bridge.tonapi.io/bridge",
        platforms: ["chrome", "android"],
      },
    ],
  },
  actionsConfiguration: {
    twaReturnUrl: "https://t.me/DemoDappWithTonConnectBot/demo",
  },
};

async function enableMocking() {
  const isGitHubPages = import.meta.env.VITE_GH_PAGES === '1';
  const host = document.baseURI.replace(/\/$/, '');

  return new Promise(async (resolve) => {
      const startMockWorker = () => worker.start({
          onUnhandledRequest: 'bypass',
          quiet: false,
          serviceWorker: {
              url: `${isGitHubPages ? '/demo-dapp-with-vue-ui' : ''}/mockServiceWorker.js`
          }
      });
      let serviceWorkerRegistration: ServiceWorkerRegistration | null | void = await startMockWorker();
      resolve(serviceWorkerRegistration);

      const verifyAndRestartWorker = runSingleInstance(async () => {
          try {
              const serviceWorkerRegistrations = await navigator.serviceWorker?.getRegistrations() || [];
              const isServiceWorkerOk = serviceWorkerRegistrations.length > 0;
              const isApiOk = await fetch(`${host}/api/healthz`)
                  .then(r => r.status === 200 ? r.json().then(p => p.ok).catch(() => false) : false)
                  .catch(() => false);

              if (!isServiceWorkerOk || !isApiOk) {
                  await serviceWorkerRegistration?.unregister().catch(() => { });
                  serviceWorkerRegistration = await startMockWorker().catch(() => null);
              }
          } catch (error) {
              console.error('Error in verifyAndRestartWorker:', error);
              serviceWorkerRegistration = await startMockWorker().catch(() => null);
          }
      });

      setInterval(verifyAndRestartWorker, 1_000);
  });
}
Vue.use(TonConnectUIPlugin, options);

enableMocking().then(() => {
  new Vue({
    render: (h) => h(App),
    router,
  }).$mount('#app')

})
