import { boot } from 'quasar/wrappers';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Body from '../components/Body.vue';
import Drawer from '../components/Drawer.vue';
import HeaderBtnBack from '../components/HeaderButtonBack.vue';

export default boot(async ({ app }) => {
  app.component('page-header', Header);
  app.component('page-body', Body);
  app.component('page-header-btn-back', HeaderBtnBack);
  app.component('page-footer', Footer);
  app.component('page-drawer', Drawer);
});
