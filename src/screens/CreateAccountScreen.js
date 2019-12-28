import React from 'react';
import { View, Text, Button } from 'react-native';

export default class CreateAccount extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>CreateAccount</Text>
        <Button
          title="Log in"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
