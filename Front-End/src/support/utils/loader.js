import { Loading } from 'quasar';

export const loader = {
  show: () => {
    Loading.show({
      message: 'Procesando...',
    });
  },
  hide: () => {
    Loading.hide();
  },
};
