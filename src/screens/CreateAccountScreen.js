import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createAccount } from '../api/authentication';
import EmailForm from '../forms/EmailForm';
import Link from '../components/Link';

const CreateAccount = ({ navigation }) => {
  return (
    <EmailForm
      buttonText="Sign up"
      onSubmit={createAccount}
      onAuthentication={() => navigation.navigate('Home')}
    >
      <Link onPress={() => navigation.navigate('Login')}>
        Log in to existing account
      </Link>
    </EmailForm>
  );
};

export default CreateAccount;
