import { get } from './fetch';

export const getUsers = (email, password) => {
  return get('/users');
};
