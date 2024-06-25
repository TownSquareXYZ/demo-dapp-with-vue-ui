<template>
  <footer class="footer">
    <div>
      <label>language</label>
      <select @change="onLangChange($event)">
        <option value="en">en</option>
        <option value="ru">ru</option>
      </select>
    </div>

    <div>
      <label>theme</label>
      <select @change.stop="onThemeChange($event)">
        <option :value="THEME.DARK">dark</option>
        <option :value="THEME.LIGHT">light</option>
        <option value="SYSTEM">system</option>
      </select>
    </div>

    <div>
      <label>borders</label>
      <select @change="onBordersChange($event)">
        <option value="m">m</option>
        <option value="s">s</option>
        <option value="none">none</option>
      </select>
    </div>

    <div>
      <label>enable android back handler</label>
      <select
        v-model="enableAndroidBackHandler"
        @change="onEnableAndroidBackHandlerChange"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </div>

    <div class="footer-checkbox-container">
      <span>modals</span>
      <label>
        before
        <input type="checkbox" v-model="checkboxes[0]" />
      </label>
      <label>
        success
        <input type="checkbox" v-model="checkboxes[1]" />
      </label>
      <label>
        error
        <input type="checkbox" v-model="checkboxes[2]" />
      </label>
    </div>

    <div class="footer-checkbox-container">
      <span>notifications</span>
      <label>
        before
        <input type="checkbox" v-model="checkboxes[3]" />
      </label>
      <label>
        success
        <input type="checkbox" v-model="checkboxes[4]" />
      </label>
      <label>
        error
        <input type="checkbox" v-model="checkboxes[5]" />
      </label>
    </div>

    <!-- <div>
      <ColorsModal />
    </div> -->

    <div>
      <label>
        return strategy:
        <input
          style="width: 200px"
          v-model="returnStrategy"
          @blur="onReturnStrategyInputBlur"
        />
      </label>
    </div>

    <div>
      <label>
        skip redirect to wallet:
        <div>('ios', 'never', 'always')</div>
        <input
          style="width: 200px"
          v-model="skipRedirect"
          @blur="onSkipRedirectInputBlur"
        />
      </label>
    </div>
  </footer>
</template>
  
  <script setup lang="ts">
import { ref, watch } from "vue";
import { THEME, useTonConnectUI } from "@townsquarexyz/ui-vue";
// import ColorsModal from "./ColorsModal.vue";

const checkboxes = ref([true, false, false, true, true, true]);
const returnStrategy = ref<any>("back");
const skipRedirect = ref<any>("ios");
const enableAndroidBackHandler = ref(true);

const [tonConnectUI, setOptions] = useTonConnectUI();

const onLangChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setOptions({ language: target.value as any });
};

const onThemeChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setOptions({ uiPreferences: { theme: target.value as any } });
};

const onBordersChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setOptions({ uiPreferences: { borderRadius: target.value as any } });
};

const onEnableAndroidBackHandlerChange = () => {
  setOptions({ enableAndroidBackHandler: enableAndroidBackHandler.value });
};

const onReturnStrategyInputBlur = () => {
  if (!returnStrategy.value) {
    returnStrategy.value = "back";
  }

  setOptions({
    actionsConfiguration: { returnStrategy: returnStrategy.value },
  });
};

const onSkipRedirectInputBlur = () => {
  if (!skipRedirect.value) {
    skipRedirect.value = "ios";
  }

  setOptions({
    actionsConfiguration: { skipRedirectToWallet: skipRedirect.value },
  });
};

watch(checkboxes, () => {
  const actionValues = ["before", "success", "error"];
  const modals = actionValues
    .map((item, index) => (checkboxes.value[index] ? item : undefined))
    .filter((i) => i) as ("before" | "success" | "error")[];
  const notifications = actionValues
    .map((item, index) => (checkboxes.value[index + 3] ? item : undefined))
    .filter((i) => i) as ("before" | "success" | "error")[];

  setOptions({ actionsConfiguration: { modals, notifications } });
});

watch(enableAndroidBackHandler, () => {
  setOptions({ enableAndroidBackHandler: enableAndroidBackHandler.value });
});
</script>
  
  <style scoped lang="scss">
.footer {
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  > div > label {
    // color: white;
    color: black;
    margin-right: 5px;
  }
}

.footer-checkbox-container {
  display: flex;
  flex-direction: column;

  > span {
    color: white;
    font-weight: bold;
    margin-bottom: 4px;
  }

  input {
    margin-left: 3px;
  }
}
</style>
  