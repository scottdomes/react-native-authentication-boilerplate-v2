import React from 'react';
import { View, Text, Button } from 'react-native';
import { getUsers } from '../api/users';
import { setToken } from '../api/token';

export default class HomeScreen extends React.Component {
  state = { users: [], hasLoadedUsers: false, userLoadingErrorMessage: '' };

  loadUsers() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' });
    getUsers().then((res) => {
      if (res.ok) {
        this.setState({
          hasLoadedUsers: true,
          users: res.data,
        });
      } else {
        this.handleUserLoadingError(res);
      }
    });
  }

  handleUserLoadingError = (res) => {
    if (res.status === 401) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedUsers: false,
        userLoadingErrorMessage: res.message,
      });
    }
  };

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (!this.state.hasLoadedUsers) {
          this.loadUsers();
        }
      },
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  logOut = async () => {
    this.setState({ hasLoadedUsers: false, users: [] });
    await setToken('');
    this.props.navigation.replace('Login');
  };

  render() {
    const { users, userLoadingErrorMessage } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        {users.map((user) => (
          <Text key={user.email}>{user.email}</Text>
        ))}
        {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
        ) : null}
        <Button title="Log out" onPress={this.logOut} />
      </View>
    );
  }
}
