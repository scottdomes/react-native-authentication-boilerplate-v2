import React from 'react';
import { View, Text, Button } from 'react-native';

const CreateAccount = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CreateAccount</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default CreateAccount;
