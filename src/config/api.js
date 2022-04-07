import { getToken } from 'config/storage';

export const getConfig = () => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  };

  return config;
};
