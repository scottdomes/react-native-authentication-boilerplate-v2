import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

const Link = ({ onPress, children }) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginTop: 5,
    paddingHorizontal: 30
  },
});

export default Link;
