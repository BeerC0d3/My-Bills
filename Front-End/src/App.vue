<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useCommonStore } from 'stores/all';
import { loader } from 'src/support/utils/loader';

const store = useCommonStore();
const isLoading = computed(() => store.isLoading);

watch(
  () => isLoading.value,
  (newVal) => {
    if (newVal) loader.show();
    else loader.hide();
  }
);
</script>
<style lang="scss">
#q-app {
  @import './assets/app.scss';
}
</style>
