// useInterval.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default function useInterval(callback: any, delay: number | undefined) {
  const savedCallback = ref(callback);

  onMounted(() => {
    savedCallback.value = callback;
  });

  onBeforeUnmount(() => {
    savedCallback.value = null;
  });

  onMounted(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => {
      if (savedCallback.value) {
        savedCallback.value();
      }
    }, delay);

    onBeforeUnmount(() => {
      clearInterval(id);
    });
  });
}
