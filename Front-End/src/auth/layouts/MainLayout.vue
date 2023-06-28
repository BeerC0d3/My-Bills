<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-auth flex-center">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated bounceInLeft">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
$q.dark.set(false);
</script>
<style scoped>
/* .bg-image {
  background-image: linear-gradient(135deg, #bec8d4, #dedde2);
} */
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.login-image {
  z-index: 1;
}
</style>
