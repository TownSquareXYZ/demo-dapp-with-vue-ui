<script setup lang="ts">
import {
  SendTransactionRequest,
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
} from "@townsquarelabs/ui-vue";
import { inject, Ref, ref } from "vue";
import JsonViewer from 'vue-json-viewer';

const tx: Ref<SendTransactionRequest> = ref({
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [
    {
      address:
        "0:8a5a9c7b70d329be670de4e6cce652d464765114aa98038c66c3d8ceaf2d19b0",
      amount: "5000000",
      stateInit:
        "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
      payload: "te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==",
    },
  ],
});
const { tonConnectUI } = useTonConnectUI();
/**
 * address
 */
const userFriendlyAddress = useTonAddress();
const rawAddress = useTonAddress(false);
const wallet = useTonWallet();

const handleSendTransaction = () => {
  if (tonConnectUI) {
    tonConnectUI.sendTransaction(tx.value);
  } else {
    console.error("TonConnectUI instance is not available.");
  }
};
const openWalletModal = () => {
  if (tonConnectUI) {
    tonConnectUI.openModal();
  } else {
    console.error("TonConnectUI instance is not available.");
  }
};
</script>

<template>
  <div class="send-tx-form">
    <div v-if="wallet">
      <!-- <div>Connected Wallet: {{ wallet.name }}</div> -->
      <div>Device: {{ wallet.device.appName }}</div>
      <div>User-friendly address: {{ userFriendlyAddress }}</div>
      <div>Raw address: {{ rawAddress }}</div>
    </div>

    <h3>Configure and send transaction</h3>

    <json-viewer
      :value="tx"
      :expand-depth=5
      copyable
      boxed
      sort></json-viewer>

    <button v-if="wallet" @click="handleSendTransaction">
      Send transaction
    </button>
    <button v-else @click="openWalletModal">
      Connect wallet to send the transaction
    </button>
  </div>
</template>

<style lang="scss" scoped>
.send-tx-form {
  flex: 1;
  display: flex;
  width: 98%;
  flex-direction: column;
  //   gap: 20px;
  //   padding: 20px;
  align-items: center;
  text-align: left;
  margin: 0 auto;
  text-align: left;

  .json-view {
    color: #fff !important;
    width: 100%;
  }

  h3 {
    color: white;
    opacity: 0.8;
    font-size: 28px;
  }

  > div:nth-child(2) {
    width: 100%;

    span {
      word-break: break-word;
    }
  }

  > button {
    margin-top: 30px;
    border: none;
    padding: 7px 15px;
    border-radius: 15px;
    cursor: pointer;

    background-color: rgba(102, 170, 238, 0.91);
    color: white;
    font-size: 16px;
    line-height: 20px;

    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.03);
    }

    &:active {
      transform: scale(0.97);
    }
  }
  div.jsoneditor-field {
    color: #fff !important;
  }
}
</style>
