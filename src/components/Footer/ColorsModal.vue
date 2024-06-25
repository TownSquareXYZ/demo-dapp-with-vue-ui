<template>
  <div>
    <button @click="openModal">change colors</button>
    <div v-if="opened" class="modal">
      <button @click="closeModal">close</button>
      <div class="modal__toggle">
        <a
          href="#"
          :style="{ color: theme === THEME.LIGHT ? 'blue' : 'white' }"
          @click="setTheme(THEME.LIGHT)"
          >LIGHT</a
        >
        <a
          href="#"
          :style="{ color: theme === THEME.DARK ? 'blue' : 'white' }"
          @click="setTheme(THEME.DARK)"
          >DARK</a
        >
      </div>

      <ColorsSelect :theme="theme" />
    </div>
  </div>
</template>
  
  <script>
import { THEME } from "@townsquarexyz/ui-vue";
import ColorsSelect from "./ColorsSelect.vue";

export default {
  name: "ColorsModal",
  data() {
    return {
      opened: false,
      theme: THEME.LIGHT,
    };
  },
  methods: {
    openModal() {
      this.opened = true;
    },
    closeModal() {
      this.opened = false;
    },
    setTheme(newTheme) {
      this.theme = newTheme;
    },
  },
  components: {
    ColorsSelect,
  },
};
</script>
  
  <style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000000;

  background-color: rgb(16, 22, 31);

  padding: 20px;

  color: white;

  > button {
    float: right;
  }

  &__toggle {
    display: flex;
    justify-content: center;
    gap: 20px;

    > a {
      color: white;
    }
  }
}
</style>
  