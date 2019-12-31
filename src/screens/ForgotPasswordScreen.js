import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import Link from '../components/Link';

const ForgotPassword = ({ navigation }) => {
  return (
    <ForgotPasswordForm onComplete={() => navigation.navigate('Login')}>
      <Link onPress={() => navigation.navigate('Login')}>
        Log in to existing account
      </Link>
    </ForgotPasswordForm>
  );
};

export default ForgotPassword;
