<template>
  <div class="ton-proof-demo">
    <h3>Demo backend API with ton_proof verification</h3>
    <button @click="handleClick" v-if="authorized">
      Call backend getAccountInfo()
    </button>
    <div class="ton-proof-demo__error" v-else>Connect wallet to call API</div>
    <Vue3JsonEditor v-model="data" :expandedOnStart="true" mode="view" />
  </div>
</template>
    
    <script  lang="ts">
import { ref, onMounted} from "vue";
import { Vue3JsonEditor } from "vue3-json-editor";

import { TonProofDemoApi } from "../../TonProofDemoApi";
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue";
import useInterval from "../hooks/useInterval";

export default {
  name: "TonProofDemo",
  components: {
    Vue3JsonEditor,
  },
  setup() {
    const data = ref({});
    const wallet = useTonWallet();
    const { tonConnectUI } = useTonConnectUI();
    const authorized = ref(false);

    // Function to check if the user is authorized
    const checkAuthorization = async (walletInfo: any) => {
      if (!walletInfo) {
        authorized.value = false;
        return;
      }

      if (walletInfo.connectItems?.tonProof && "proof" in walletInfo.connectItems.tonProof) {
        const proofValid = await TonProofDemoApi.checkProof(
          walletInfo.connectItems.tonProof.proof,
          walletInfo.account
        );
        if (!proofValid) {
          authorized.value = false;
          return;
        }
      }

      authorized.value = true;
    };

    const handleClick = async () => {
      if (!wallet.value) return;

      const response = await TonProofDemoApi.getAccountInfo(wallet.value!.account);
      data.value = response;
    };

    const setAuthorized = async () => {
      // On initial mount, check the current wallet status
      if (tonConnectUI && tonConnectUI.wallet) {
        await checkAuthorization(tonConnectUI.wallet);
      }

      // Listen for status changes
      tonConnectUI?.onStatusChange(async (newWalletStatus: any) => {
        await checkAuthorization(newWalletStatus);
      });
    };

    const recreateProofPayload = async () => {
      if (tonConnectUI) {
        const payload = await TonProofDemoApi.generatePayload();
        tonConnectUI.setConnectRequestParameters(payload ? { state: "ready", value: payload } : null);
      }
    };

    onMounted(() => {
      recreateProofPayload();
      setAuthorized();  // Immediately check and set authorized status on mount
      useInterval(recreateProofPayload, TonProofDemoApi.refreshIntervalMs);
    });

    return {
      data,
      handleClick,
      authorized,
    };
  },
};
</script>
    
    <style scoped lang="scss">
.ton-proof-demo {
  display: flex;
  width: 98%;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  // margin-top: 60px;
  margin: 60px auto;
  // padding: 20px;

  h3 {
    color: white;
    opacity: 0.8;
  }

  > div:nth-child(3) {
    width: 100%;

    span {
      word-break: break-word;
    }
  }

  &__error {
    color: rgba(102, 170, 238, 0.91);
    font-size: 18px;
    line-height: 20px;
  }

  button {
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
}
</style>
    