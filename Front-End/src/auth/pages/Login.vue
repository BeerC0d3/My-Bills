<template>
  <q-page class="fit row wrap justify-center items-center content-center">
    <div
      class="col-6 col-xs-12 col-sm-6 col-lg-4 col-md-6 q-pl-xs q-pr-xs self-center"
    >
      <q-card class="q-ma-none no-shadow">
        <div class="text-center">
          <q-img
            src="~assets/beer.png"
            spinner-color="white"
            class="rounded-borders"
            style="max-width: 300px"
          ></q-img>
        </div>
        <p class="text-weight-bolder text-center text-grey">
          Accesar al sistema
        </p>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="doLogin">
            <q-input
              outlined
              clearable
              v-model="user.username"
              label="Email"
              type="email"
              :rules="[ruleLogin.required]"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              outlined
              clearable
              v-model="user.password"
              label="Password"
              type="password"
              :rules="[ruleLogin.required]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
            </q-input>

            <q-card-actions>
              <div class="row full-width items-center">
                <div class="col-12">
                  <q-btn
                    outline
                    rounded
                    size="md"
                    class="full-width"
                    color="primary"
                    label="Accesar"
                    type="submit"
                  ></q-btn>
                </div>
              </div>
            </q-card-actions>
            <q-card-section>
              <p
                class="text-caption text-weight-light text-grey box-buttons"
              ></p>
            </q-card-section>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <!-- <div v-if="$q.platform.is.desktop">I'm only rendered on desktop!</div>

  <div v-if="$q.platform.is.mobile">I'm only rendered on mobile!</div>

  <div v-if="$q.platform.is.electron">I'm only rendered on Electron!</div> -->
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommonStore, useUserStore } from 'src/stores/all';
import ruleLogin from 'src/auth/rules/Login';
import { Login } from 'src/auth/types/userModel';
import { useQuasar } from 'quasar';
import { HandlError } from 'src/support/handles/handleError';
// import { usePushNotificationStore } from '../stores/store-push-notification';

const $commonStore = useCommonStore();
// const xx = usePushNotificationStore();

const $authStore = useUserStore();

// const $pushStore = usePushNotificationStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const deferredPrompt = ref<any>(null);

const user = reactive<Login>({
  username: '',
  password: '',
});

onMounted(async () => {
  // $pushStore.SetStatePush()
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});

const loading = computed(() => $commonStore.isLoading);

const browserType = () => {
  const userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }

  return browserName;
};

const doLogin = async () => {
  try {
    $commonStore.Add_Request();
    await $authStore.Login(user);
    $router.push('/app');
    //await $pushStore.ChekSubscriptionPush();
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
};

const installApp = async () => {
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;

  if (outcome === 'dismissed') {
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt.value = null;
    return '';
  }
};

const pwaIsInstalled = computed(() => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('This IS running as standalone.');
    return true;
  }

  console.log('This is NOT running as standalone.');
  return false;
});

//console.log($q.platform);
</script>
<style scoped>
h1,
.h1 {
  font-size: 1.75rem;
}

.box-buttons {
  text-align: center;
  margin: 25px auto;
  height: 100%;
}
</style>
