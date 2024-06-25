<template>
  <div class="page-app">
    <TonConnectUIProvider :options="options">
      <div class="m-btn">
        <TonConnectButton className="custom-class" :styles="{ color: 'red' }">
          <!-- the real button is down here -->
        </TonConnectButton>
      </div>
      <tx-form></tx-form>
      <create-jetton-demo></create-jetton-demo>
      <ton-proof-demo></ton-proof-demo>
      <Footer></Footer>
    </TonConnectUIProvider>
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { TonConnectButton, TonConnectUIProvider ,THEME } from "@townsquarexyz/ui-vue";
import TxForm from "../components/TxForm.vue";
import CreateJettonDemo from "../components/CreateJettonDemo.vue";
import TonProofDemo from "../components/TonProofDemo.vue";
import Footer from "../components/Footer/Footer.vue";

const options = {
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
onMounted(()=>{
  console.log("onMounted");
});

</script>

<style lang="scss">
.page-app {
  text-align: center;
  // background-color: #333;
  .m-btn {
    margin: auto;
    float: right;
  }
}
</style>
