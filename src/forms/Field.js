import React from 'react';
import { StyleSheet, TextInput, Text, View, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from './constants';

export default class Field extends React.Component {
  position = new Animated.Value(0);

  shake() {
    const duration = 50;
    const distance = 8;
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(this.position, {
          toValue: distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.position, {
          toValue: -distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.position, {
          toValue: distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.position, {
          toValue: -distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.position, {
          toValue: distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.position, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    const hasNewError = this.props.error && !prevProps.error && !this.props.isSubmitting;
    const hasExistingError =
      this.props.error && prevProps.isSubmitting && !this.props.isSubmitting;
    if (hasNewError || hasExistingError) {
      this.shake();
    }
  }

  render() {
    const {
      label,
      keyboardType = 'default',
      onChangeText,
      value,
      secureTextEntry = false,
      error,
      isSubmitting,
    } = this.props;
    return (
      <Animated.View
        style={{
          ...styles.inputContainer,
          transform: [
            {
              translateX: this.position,
            },
          ],
        }}
      >
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
      </Animated.View>
    );
  }
}

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
