import React from 'react';
import { View, Text, Button } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LoginScreen</Text>
        <Button
          title="Log in"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Create account"
          onPress={() => this.props.navigation.navigate('CreateAccount')}
        />
      </View>
    );
  }
}
