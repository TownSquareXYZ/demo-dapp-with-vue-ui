# Demo dapp with @townsquarelabs/ui-vue

Try it out https://townsquarexyz.github.io/demo-dapp-with-vue-ui/

## Learn more about Ton Connect
- https://docs.ton.org/develop/dapps/ton-connect/
- https://github.com/ton-connect/sdk/tree/main/packages/ui

## Different from react demo

### vue3-json-editor
It provides a "code mode" feature in your Vue 3 JSON Editor, where users can select a code editor (such as a textarea), enabling them to modify JSON data.

```vue
<template>
    <Vue3JsonEditor
      v-model="tx"
      :expandedOnStart="true"
      @json-change="jsonChange"
      mode="code"
    />
</template>

<script setup lang='ts'>
import { Vue3JsonEditor } from "vue3-json-editor";

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
</script>