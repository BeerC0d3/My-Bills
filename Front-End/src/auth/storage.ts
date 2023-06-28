import { setToken, deleteToken, setSucursal } from 'boot/axios';

export const setHeaderToken = () => setToken();
export const deleteHeaderToken = () => deleteToken();
export const setHeaderSucursal = (sucID: number) => setSucursal(sucID);
export const getLocalToken = (): string => {
  //const token = localStorage.getItem('token');

  return JSON.parse(localStorage.getItem('token') || '{}');
};
export const deleteLocalToken = () => localStorage.removeItem('token');
export const setLocalToken = (token: any) =>
  localStorage.setItem('token', JSON.stringify(token));

export const getUser = () => JSON.parse(localStorage.getItem('user') || '{}');
export const setUser = (user: any) =>
  localStorage.setItem('user', JSON.stringify(user));
export const deleteUser = () => localStorage.removeItem('user');
