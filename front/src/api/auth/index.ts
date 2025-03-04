import { axiosClient } from 'api/axios';

import { AuthRes, CheckRes } from './types';

const login = async ({ email, password }: { email: string; password: string }) => {
  return axiosClient.post<AuthRes>('/auth/login', {
    email,
    password,
  });
};

const register = async ({ email, password }: { email: string; password: string }) => {
  return axiosClient.post<AuthRes>('/auth/register', {
    email,
    password,
  });
};

const refresh = async () => {
  return axiosClient.get<AuthRes>('/auth/refresh');
};

const check = async () => {
  return axiosClient.get<CheckRes>('/auth/check');
};

const logout = async () => {
  return axiosClient.get<CheckRes>('/auth/logout');
};

export const authApi = { login, register, refresh, check, logout };
