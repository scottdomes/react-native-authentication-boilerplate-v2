import React, { useState } from 'react';
import { setToken } from '../api/token';
import { validateContent, validateLength } from './validators';
import { login } from '../api/authentication';
import Form from './Form';

const LoginForm = ({ children, onAuthentication }) => {
  const handleResult = async (loginResult) => {
    if (loginResult && loginResult.data && loginResult.data.auth_token) {
      await setToken(loginResult.data.auth_token);
      onAuthentication();
    }

    if (loginResult && loginResult.status === 401) {
      throw new Error('Invalid login.');
    }
  };

  return (
    <Form
      action={login}
      afterSubmit={handleResult}
      buttonText="Log in"
      fields={{
        email: {
          label: 'Email',
          validators: [validateContent],
          keyboardType: 'email-address',
        },
        password: {
          label: 'Password',
          validators: [validateContent, validateLength],
          secureTextEntry: true,
        },
      }}
    >
      {children}
    </Form>
  );
};

export default LoginForm;
