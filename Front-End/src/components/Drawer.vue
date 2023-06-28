<template>
  <q-drawer
    class="bg-primary"
    v-model="leftDrawerOpen"
    side="left"
    overlay
    bordered
    behavior="mobile"
    @hide="(value) => ShowHidden(value)"
  >
    <q-scroll-area class="scroll-content">
      <!-- <q-list>
        <MenuRecursive v-for="item in menus" :key="item.id" v-bind="item" />
      </q-list> -->
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-scroll-area>
    <div class="absolute-top text-center avatar-top">
      <div class="bg-transparent">
        <div class="q-mb-sm avatar-med-circule">
          <!-- <img
            :src="
              $authStore.getUser.fotoUrl == null
                ? 'https://cdn.quasar.dev/img/boy-avatar.png'
                : $authStore.getUser.fotoUrl
            "
          /> -->

          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </div>
        <div class="text-weight-bold">Diego luna</div>
        <div>@rstoenescu</div>
      </div>
    </div>
  </q-drawer>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject, computed, watch } from 'vue';
import { useDrawerStore } from 'src/stores/all';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

// import MenuRecursive from '../Sistema/MenuRecursive.vue';
// import useHookMenu from '../../hooks/sistema/hookMenu';
// import { useCommonStore, useUserStore } from 'stores/all';
const $drawerStore = useDrawerStore();
const leftDrawerOpen = ref(false);
const bus = inject<any>('bus');

const ShowHidden = (evt: any) => {
  // setTimeout(() => {
  //   $drawerStore.setToggle();
  // }, 1000);
  $drawerStore.setToggle();
  //console.log(evt);
};
const isOpenDrawer = computed(() => $drawerStore.getLeftDrawer);
// const toggleLeftDrawer = () => {
//   console.log('click toggle');
//   leftDrawerOpen.value = leftDrawerOpen.value;
// };
watch(
  () => isOpenDrawer.value,
  (newVal) => {
    if (newVal) leftDrawerOpen.value = isOpenDrawer.value;
    else leftDrawerOpen.value = false;
  }
);
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

// bus.on('drawerOpen', (drawerOpen: boolean) => {
//   //leftDrawerOpen.value = drawerOpen;
//   console.log('drawerOpen:' + drawerOpen);
// });

// const { getAll, menus } = useHookMenu();
// const $commonStore = useCommonStore();
// const $authStore = useUserStore();
// const fotoUser = ref<any>(null);

// onBeforeMount(async () => {
//   try {
//     //console.log($authStore.getUser.fotoUrl);
//     fotoUser.value = $authStore.getUser.fotoUrl || {};
//     $commonStore.Add_Request();
//     await getAll();
//   } catch (e) {
//     $commonStore.Remove_Request();
//     console.log(e);
//   }
// });
</script>
