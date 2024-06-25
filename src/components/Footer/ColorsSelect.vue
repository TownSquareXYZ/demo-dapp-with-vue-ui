<template>
  <div class="colors-container">
    <div v-for="(value1, key1) in colors" :key="key1">
      <template v-if="typeof value1 === 'object'">
        <div>
          <span>{{ key1 }}:</span>
          <div v-for="(value2, key2) in value1" :key="key1 + key2">
            <label>
              {{ key2 }}
              <input
                type="color"
                :value="colors[key1][key2]"
                @input="onChange($event.target.value, key1, key2)"
              />
            </label>
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <span>{{ key1 }}:</span>
          <label>
            <input
              type="color"
              :value="colors[key1]"
              @input="onChange($event.target.value, key1)"
            />
          </label>
        </div>
      </template>
    </div>
  </div>
</template>
  
  <script>
import { THEME, useTonConnectUI } from "@townsquarexyz/ui-vue";
import { ref, watch } from "vue";

const defaultColors = {
  [THEME.LIGHT]: {
    constant: {
      black: "#000000",
      white: "#FFFFFF",
    },
    connectButton: {
      background: "#0098EA",
      foreground: "#FFFFFF",
    },
    accent: "#0098EA",
    telegramButton: "#0098EA",
    icon: {
      primary: "#0F0F0F",
      secondary: "#7A8999",
      tertiary: "#C1CAD2",
      success: "#29CC6A",
      error: "#F5A73B",
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F1F3F5",
      segment: "#FFFFFF",
      tint: "#F1F3F5",
      qr: "#F1F3F5",
    },
    text: {
      primary: "#0F0F0F",
      secondary: "#6A7785",
    },
  },
  [THEME.DARK]: {
    constant: {
      black: "#000000",
      white: "#FFFFFF",
    },
    connectButton: {
      background: "#0098EA",
      foreground: "#FFFFFF",
    },
    accent: "#E5E5EA",
    telegramButton: "#31A6F5",
    icon: {
      primary: "#E5E5EA",
      secondary: "#909099",
      tertiary: "#434347",
      success: "#29CC6A",
      error: "#F5A73B",
    },
    background: {
      primary: "#121214",
      secondary: "#18181A",
      segment: "#262629",
      tint: "#222224",
      qr: "#F1F3F5",
    },
    text: {
      primary: "#E5E5EA",
      secondary: "#7D7D85",
    },
  },
};

export default {
  props: {
    theme: String,
  },
  setup(props) {
    const [_, setOptions] = useTonConnectUI();

    const colors = ref(defaultColors[props.theme]);

    const onChange = (value, property1, property2) => {
      setOptions({
        uiPreferences: {
          colorsSet: {
            [props.theme]: {
              [property1]: property2
                ? { ...colors.value[property1], [property2]: value }
                : value,
            },
          },
        },
      });

      colors.value = {
        ...colors.value,
        [property1]: property2
          ? { ...colors.value[property1], [property2]: value }
          : value,
      };

      defaultColors[props.theme] = {
        ...defaultColors[props.theme],
        [property1]: property2
          ? { ...colors.value[property1], [property2]: value }
          : value,
      };
    };

    watch(
      () => props.theme,
      (newTheme) => {
        colors.value = defaultColors[newTheme];
      }
    );

    return {
      colors,
      onChange,
    };
  },
};
</script>
  
  <style scoped lang="scss">
.colors-container {
  > div {
    margin-bottom: 20px;

    > span {
      margin-right: 14px;
      font-weight: bold;
    }

    > label {
      margin-right: 10px;
    }
  }
}

</style>
  