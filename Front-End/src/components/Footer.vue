<template>
  <q-footer bordered class="bg-white text-primary">
    <q-tabs
      active-color="primary"
      indicator-color="transparent"
      class="text-grey"
      no-caps
    >
      <q-route-tab
        to="/main"
        label="Inicio"
        name="explore"
        icon="fa-solid fa-house"
        class="icon-size"
      />

      <q-route-tab
        to="/main/profile"
        label="Perfil"
        name="account"
        icon="account_circle"
        class="icon-size"
      />
      <q-route-tab
        label="Salir"
        name="auth"
        icon="fa-solid fa-right-from-bracket"
        class="icon-size"
        @click="Salir"
      />
    </q-tabs>
  </q-footer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/all';
const $store = useUserStore();
const $router = useRouter();

const Salir = (): void => {
  $store.logout();
  $router.push('/auth/login');
};
</script>
