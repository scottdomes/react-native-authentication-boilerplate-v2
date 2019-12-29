import { post } from './fetch';

export const login = (email, password) => {
  return post('/users/login', {
    user: { email, password },
  });
};

export const createAccount = (email, password) => {
  return post('/users', {
    user: { email, password },
  });
};
