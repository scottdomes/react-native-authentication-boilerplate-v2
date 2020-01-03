import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Field = ({ fieldName, field, value, onChangeText, error }) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{field.label}</Text>
      <TextInput
        style={styles.input}
        {...field.inputProps}
        value={value}
        onChangeText={(text) => onChangeText(fieldName, text)}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: { textAlign: 'center', height: 17.5 },
});

export default Field;
