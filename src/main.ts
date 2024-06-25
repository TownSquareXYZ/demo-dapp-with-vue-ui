import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

import { runSingleInstance } from './utils/run-signle-instance';
import { worker } from './server/worker';


async function enableMocking() {
    return new Promise(async (resolve) => {
        const startMockWorker = () => worker.start({
            onUnhandledRequest: 'bypass',
            quiet: false,
            serviceWorker: {
                url: `${import.meta.env.VITE_GH_PAGES ? '/demo-dapp-with-vue-ui' : ''}/mockServiceWorker.js`
            }
        });
        let serviceWorkerRegistration = await startMockWorker();
        resolve(serviceWorkerRegistration);

        const verifyAndRestartWorker = runSingleInstance(async () => {
            const serviceWorkerRegistrations = await navigator.serviceWorker.getRegistrations();

            if (serviceWorkerRegistrations.length === 0) {
                await serviceWorkerRegistration?.unregister();
                serviceWorkerRegistration = await startMockWorker();
            }
        });

        setInterval(verifyAndRestartWorker, 1000);
    });
}
const app = createApp(App);

app.use(router)

enableMocking().then(() => {
    app.mount('#app')
})
