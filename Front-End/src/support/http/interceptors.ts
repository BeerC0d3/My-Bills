import { api } from 'boot/axios';
import { useUserStore, useCommonStore } from 'stores/all';
import * as storage from 'src/auth/storage';

export const addInterceptors = (Router: any) => {
  const commonStore = useCommonStore();
  const $authStore = useUserStore();
  const tokenLocal = storage.getLocalToken();
  api.defaults.headers.common.Authorization = `Bearer ${tokenLocal}`;
  api.defaults.headers.common['x-header-sucID'] = $authStore.getSucursalId;
  api.interceptors.response.use(
    (response) => {
      commonStore.Remove_Request();
      return response;
    },
    async (error: any) => {
      const originalRequest = error.config;

      commonStore.Remove_Request();
      if (error.response !== null) {
        //console.log('error.response !== null');
        if (
          error.response.status === 401 &&
          $authStore.isAuthenticated &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            //console.log(originalRequest);
            commonStore.Add_Request();
            await $authStore.RefreshToken();
            // location.reload(true);
            // setTimeout(function () {
            //   return api(originalRequest);
            // }, 5000);

            return api(originalRequest);
          } catch (error: any) {
            if (error.response && error.response.data) {
              return Promise.reject(error.response.data);
            }

            return Promise.reject(error);
          }
        }
      }

      // if (!error.response) {
      //   return Promise.reject(new Error('Error de conexión'));
      // }

      // console.log('aqui cai en Interceptors');
      // console.log(error.config);

      return Promise.reject(error);
    }
  );
};
