import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { runSingleInstance } from './utils/run-signle-instance';
import { worker } from './server/worker';


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
enableMocking().then(() => {
  new Vue({
    render: (h) => h(App),
    router,
  }).$mount('#app')

})
