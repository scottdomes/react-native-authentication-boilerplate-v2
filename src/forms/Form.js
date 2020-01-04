import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { validateFields, hasValidationError } from '../forms/validation';
import Field from './Field';
import SubmitButton from './SubmitButton';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(resolve, 700));

const Form = ({ fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);

    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: '' };
      setValidationErrors(newErrors);
    }
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const fadeOut = () =>
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();

  const fadeIn = () =>
    Animated.timing(opacity, { toValue: 1, duration: 200 }).start();

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    fadeOut();
    if (hasValidationError(errors)) {
      await animationTimeout();
      fadeIn();
      setValidationErrors(errors);
      return setSubmitting(false);
    }

    try {
      const [result] = await Promise.all([
        action(...getValues()),
        animationTimeout(),
      ]);
      await afterSubmit(result);
      fadeIn();
    } catch (e) {
      setErrorMessage(e.message);
      setSubmitting(false);
      fadeIn();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.error}>{errorMessage}</Text>
      <Animated.View style={{ opacity }}>
        {isSubmitting && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#3F5EFB" />
          </View>
        )}
        {fieldKeys.map((key) => {
          return (
            <Field
              isSubmitting={isSubmitting}
              key={key}
              fieldName={key}
              field={fields[key]}
              error={validationErrors[key]}
              onChangeText={onChangeValue}
              value={values[key]}
            />
          );
        })}
      </Animated.View>
      <SubmitButton
        title={buttonText}
        onPress={submit}
        isSubmitting={isSubmitting}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
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
    zIndex: 2,
  },
  error: {
    marginBottom: 20,
    height: 17.5,
  },
});

export default Form;
