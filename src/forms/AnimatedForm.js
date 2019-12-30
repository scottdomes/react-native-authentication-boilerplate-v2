import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../forms/Button';
import { GRADIENT_COLORS } from './constants';

const AnimatedForm = ({ children, onSubmit, buttonText }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    setErrorMessage('');
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();
    return onSubmit()
      .then(() => {
        setSubmitting(false);
        Animated.timing(opacity, { toValue: 1, duration: 200 }).start();
      })
      .catch((res) => {
        setSubmitting(false);
        Animated.timing(opacity, { toValue: 1, duration: 200 }).start();

        if (res && res.error) {
          setErrorMessage(res.error);
        }

        setErrorMessage('Something went wrong.');
      });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.error}>{errorMessage}</Text>
      <View style={styles.formInner}>
        {isSubmitting && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={GRADIENT_COLORS[1]} />
          </View>
        )}
        <Animated.View style={{ opacity }}>{children(isSubmitting)}</Animated.View>
      </View>
      <CustomButton onPress={submit} title={buttonText} />
    </View>
  );
};

const styles = StyleSheet.create({
  formInner: {
    position: 'relative',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginBottom: 20,
  },
});

export default AnimatedForm;
