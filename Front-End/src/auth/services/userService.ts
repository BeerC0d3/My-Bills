import { Login } from 'src/auth/types/userModel';
import { api } from 'boot/axios';
export class User {
  constructor() {
    console.log('userService');
  }

  async Login(login: Login): Promise<any> {
    await api.post('/api/Usuarios/token/', login).then(async (response) => {
      // this.SET_TOKEN(response.data)
      // await this.GET_USER(response.data.access)
      return response.data;
    });
  }
}
