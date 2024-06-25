<template>
  <div class="ton-proof-demo">
    <h3>Demo backend API with ton_proof verification</h3>
    <button @click="handleClick" v-if="authorized">
      Call backend getAccountInfo()
    </button>
    <div class="ton-proof-demo__error" v-else>Connect wallet to call API</div>
    <Vue3JsonEditor v-model="data" :expandedOnStart="true" />
  </div>
</template>
    
    <script  lang="ts">
import { ref, onMounted, inject, watch } from "vue";
import { Vue3JsonEditor } from "vue3-json-editor";

import { TonProofDemoApi } from "../../TonProofDemoApi";
import { TonConnectUI, useTonWallet } from "@townsquarexyz/ui-vue";
import useInterval from "../hooks/useInterval";

export default {
  name: "TonProofDemo",
  components: {
    Vue3JsonEditor,
  },
  setup() {
    const firstProofLoading = ref(true);
    const data = ref({});

    const wallet = useTonWallet();
    const tonConnectUI = inject<TonConnectUI | null>("tonConnectUI", null);

    const authorized = ref(false);

    const recreateProofPayload = async () => {
      if (tonConnectUI) {
        if (firstProofLoading.value) {
          tonConnectUI.setConnectRequestParameters({ state: "loading" });
          firstProofLoading.value = false;
        }

        const payload = await TonProofDemoApi.generatePayload();

        if (payload) {
          tonConnectUI.setConnectRequestParameters({
            state: "ready",
            value: payload,
          });
        } else {
          tonConnectUI.setConnectRequestParameters(null);
        }
      } else {
        console.error("TonConnectUI instance is not available.");
      }
    };

    /**
     * 点击当存在钱包的时候获取到AccountInfo
     */
    const handleClick = async () => {
      if (!wallet) {
        return;
      }
      const response = await TonProofDemoApi.getAccountInfo(
        wallet.value!.account
      );
      data.value = response;
    };

    /**
     * 当tonConnectUI内容发生改变的时
     * 从新请求tonProof内相应的状态
     */
    const setAuthorized = () => {
      tonConnectUI!.onStatusChange(async (w) => {
        if (!w) {
          TonProofDemoApi.reset();
          authorized.value = false;
          return;
        }

        if (w.connectItems?.tonProof && "proof" in w.connectItems.tonProof) {
          await TonProofDemoApi.checkProof(
            w.connectItems.tonProof.proof,
            w.account
          );
        }

        if (!TonProofDemoApi.accessToken) {
          tonConnectUI!.disconnect();
          authorized.value = false;
          return;
        }

        authorized.value = true;
      });
    };

    watch(tonConnectUI!, () => {
      setAuthorized();
      recreateProofPayload();
    });

    onMounted(() => {
      recreateProofPayload();
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
    