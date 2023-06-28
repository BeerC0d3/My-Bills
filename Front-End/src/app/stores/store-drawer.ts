import { defineStore } from 'pinia';

interface drawerState {
  leftDrawer: boolean;
}

export const drawerStore = defineStore('drawer', {
  state: (): drawerState => ({
    leftDrawer: false,
  }),
  getters: {
    getLeftDrawer: (state) => state.leftDrawer,
  },
  actions: {
    StateToggle(isOpen: boolean) {
      //console.log('StateToggle');
      // if (this.leftDrawer) this.leftDrawer = false;
      this.leftDrawer = isOpen;
    },
    setToggle() {
      this.leftDrawer = false;
    },
  },
});
