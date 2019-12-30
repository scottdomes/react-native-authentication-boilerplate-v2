import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { login } from '../api/authentication';
import EmailForm from '../forms/EmailForm';
import Link from '../components/Link';

const LoginScreen = ({ navigation }) => {
  return (
    <EmailForm
      buttonText="Log in"
      onSubmit={login}
      onAuthentication={() => navigation.navigate('Home')}
    >
      <Link onPress={() => navigation.navigate('CreateAccount')}>
        Create account
      </Link>
      <Link onPress={() => {}}>Forgot password?</Link>
    </EmailForm>
  );
};

export default LoginScreen;
