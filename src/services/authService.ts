import api from '../api/axios';

export const login = async (login: string, password: string) => {
  const response = await api.post('/auth/login', {
    login,
    password,
  });
  return response.data;
};

export const refresh = async () => {
  const response = await api.get('/auth/refresh');
  return response.data;
};
