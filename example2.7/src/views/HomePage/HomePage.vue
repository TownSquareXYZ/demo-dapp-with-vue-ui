<template>
  <div class="page-app">
      <div class="m-btn">
        <TonConnectButton :button-root-id="`ton-connect-button`" />
      </div>
      <tx-form></tx-form>
      <create-jetton-demo></create-jetton-demo>
      <ton-proof-demo></ton-proof-demo>
      <Footer></Footer>
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  TonConnectButton,
} from "@townsquarelabs/ui-vue";
import TxForm from "../../components/TxForm.vue";
import CreateJettonDemo from "../../components/CreateJettonDemo.vue";
import TonProofDemo from "../../components/TonProofDemo.vue";
import Footer from "../../components/Footer/Footer.vue";

onMounted(() => {
  // console.log("onMounted");
  const divs = document.getElementsByClassName("jsoneditor-modes");
  const divArray = Array.from(divs);
  divArray.forEach((div) => {
    const element = div as HTMLElement;
    element.style.display = "none";
  });
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
