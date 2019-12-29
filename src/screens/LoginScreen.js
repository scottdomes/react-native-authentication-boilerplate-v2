import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { login } from '../api/mock';

const LoginScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginUser = () => {
    setErrorMessage('');
    login('test@test.ca', 'password')
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <Button title="Log in" onPress={loginUser} />
      <Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccount')}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default LoginScreen;
