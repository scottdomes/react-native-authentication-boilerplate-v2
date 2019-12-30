import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from './constants';

const Field = ({
  label,
  keyboardType = 'default',
  onChangeText,
  value,
  secureTextEntry = false,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        style={styles.inputGradient}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </LinearGradient>
      <Text>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  inputGradient: {
    padding: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default Field;
