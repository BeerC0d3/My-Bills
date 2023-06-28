import { defineStore } from 'pinia';
import { Login } from 'src/auth/types/userModel';
import * as storage from 'src/auth/storage';
import { api } from 'boot/axios';

interface UserState {
  user: object;
  authenticated: boolean;
  token: string;
  sucursalID: number;
}

export const useUserStore = defineStore('auth', {
  state: (): UserState => ({
    user: {},
    authenticated: false,
    token: '',
    sucursalID: 0,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
    getSucursalId: (state) => state.sucursalID,
  },
  actions: {
    async Login(login: Login) {
      await api.post('/api/Usuarios/token/', login).then(async (response) => {
        this.setToken(response.data);
        // await this.GET_USER(response.data.access);
      });
    },
    async RefreshToken() {
      await api
        .post('/api/Usuarios/refresh-token', {})
        .then(async (response) => {
          // console.log('-------Refresh token-----');
          // console.log(response.data);
          this.setToken(response.data);
          // await this.GET_USER(response.data.access);
        });
    },

    async checkToken() {
      console.log('entre aqui checkToken');

      if (this.token) return Promise.resolve(this.token);
      const token = storage.getLocalToken();
      if (!token) return Promise.reject(new Error('Token inválido!'));
      this.setToken(token);
      return this.LoadSession();
    },

    setToken(payload: any) {
      //console.log(payload);
      storage.setLocalToken(payload.token);
      storage.setHeaderToken();
      storage.setHeaderSucursal(1);
      this.user = payload;
      this.token = payload;
      this.authenticated = true;
      this.sucursalID = 1;
    },

    LoadSession() {
      return new Promise((resolve: any, reject) => {
        try {
          this.user = storage.getUser();
          resolve();
        } catch (error) {
          this.logout();
          reject(error);
        }
      });
    },

    logout() {
      storage.deleteLocalToken();
      storage.deleteHeaderToken();
      storage.deleteUser();
      this.user = {};
      this.token = '';
      this.authenticated = false;
      this.sucursalID = 0;
    },
  },
  //persist: true,
});
