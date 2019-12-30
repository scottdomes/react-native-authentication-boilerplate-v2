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
  isSubmitting,
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
      <Text style={styles.error}>{isSubmitting ? '' : error}</Text>
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
    marginVertical: 3,
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
