import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { login } from '../api/authentication';
import LoginForm from '../forms/LoginForm';
import Link from '../components/Link';

const LoginScreen = ({ navigation }) => {
  return (
    <LoginForm onAuthentication={() => navigation.navigate('Home')}>
      <Link onPress={() => navigation.navigate('CreateAccount')}>
        Create account
      </Link>
      <Link onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password?
      </Link>
    </LoginForm>
  );
};

export default LoginScreen;
