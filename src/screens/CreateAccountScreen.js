import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CreateAccountForm from '../forms/CreateAccountForm';
import Link from '../components/Link';

const CreateAccount = ({ navigation }) => {
  return (
    <CreateAccountForm onAuthentication={() => navigation.navigate('Home')}>
      <Link onPress={() => navigation.navigate('Login')}>
        Log in to existing account
      </Link>
    </CreateAccountForm>
  );
};

export default CreateAccount;
