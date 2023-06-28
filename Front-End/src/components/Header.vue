<template>
  <header
    class="page-header q-header q-layout__section--marginal fixed-top q-header--bordered absolute-top bg-white text-dark"
  >
    <div class="container-template">
      <q-toolbar>
        <div class="q-toolbar row no-wrap items-center">
          <slot name="buttons-left" />

          <div
            class="page-header-title q-toolbar__title ellipsis text-body1 q-pl-none"
          >
            <slot name="title" />
          </div>
        </div>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.xs" dense flat round icon="apps">
            <q-tooltip>Cambiar sucursal</q-tooltip>
          </q-btn>

          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </div>
      </q-toolbar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDrawerStore } from 'src/stores/all';

// const $store = useUserStore();
// const $router = useRouter();
const $drawerStore = useDrawerStore();
const bus = inject<any>('bus');
const toggle = ref(false);

const toggleLeftDrawer = () => {
  toggle.value = true;
  $drawerStore.StateToggle(toggle.value);
  // bus.emit('drawerOpen', toggle.value);
};
// const isAuthenticated = $store.isAuthenticated;

// const Salir = (): void => {
//   $store.logout();
//   $router.push('auth/login');
// };
</script>
<style lang="scss" scoped></style>
