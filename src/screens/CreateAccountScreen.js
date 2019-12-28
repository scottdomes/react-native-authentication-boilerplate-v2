import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createAccount } from '../api/mock';

const CreateAccount = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const createUser = () => {
    createAccount('test@test.ca', 'password')
      .then((val) => {
        navigation.navigate('Home');
      })
      .catch((res) => setErrorMessage(res.error));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CreateAccount</Text>
      <Button title="Create user" onPress={createUser} />
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default CreateAccount;
