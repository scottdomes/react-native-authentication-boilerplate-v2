import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import { setToken } from '../api/token';
import Field from './Field';
import {
  useValidatedField,
  validateContent,
  validateLength,
} from './validators';
import AnimatedForm from './AnimatedForm';
import CustomButton from '../forms/Button';

const getInitialState = (fields) => {
  const state = {};
  Object.keys(fields).forEach((key) => {
    state[key] = '';
  });

  return state;
};

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 500));

const Form = ({ fields, buttonText, children, action, afterSubmit }) => {
  const [values, setValues] = useState(getInitialState(fields));
  const [errors, setErrors] = useState(getInitialState(fields));
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const validateFields = () => {
    const newErrors = getInitialState(fields);
    let hasError = false;
    Object.keys(fields).forEach((key) => {
      const field = fields[key];

      if (field.validators && field.validators.length > 0) {
        const value = values[key];
        let error = '';
        field.validators.forEach((validator) => {
          const validationError = validator(value);
          if (validationError) {
            error = validationError;
            hasError = true;
          }
        });
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return hasError;
  };

  const getValues = () => {
    return Object.keys(fields)
      .sort()
      .map((key) => values[key]);
  };

  const hasValidationErrors = () => {
    return validateFields();
  };

  const validateAndLogin = () => {
    const isValid = !hasValidationErrors();

    if (isValid) {
      return action(...getValues());
    } else {
      return Promise.resolve();
    }
  };

  const submit = () => {
    return Promise.all([animationTimeout(), validateAndLogin()]).then(
      async (res) => {
        return afterSubmit(res[1]);
      },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <AnimatedForm onSubmit={submit} buttonText={buttonText}>
        {(isSubmitting) => {
          return [
            ...Object.keys(fields).map((key) => {
              const field = fields[key];

              return (
                <Field
                  key={key}
                  value={values[key]}
                  onChangeText={(text) => onChangeValue(key, text)}
                  error={errors[key]}
                  isSubmitting={isSubmitting}
                  {...field}
                />
              );
            }),
          ];
        }}
      </AnimatedForm>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Form;
