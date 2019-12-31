import React from 'react';
import Form from '../forms/Form';
import { login } from '../api/authentication';

const LoginScreen = ({ navigation }) => {
  return (
    <Form
      action={login}
      buttonText="Submit"
      fields={{
        email: {
          label: 'Email',
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          inputProps: {
            secureTextEntry: true,
          },
        },
      }}
    />
  );
};

export default LoginScreen;
