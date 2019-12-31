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

const Form = ({ fields, buttonText, children }) => {
  const [values, setValues] = useState(getInitialState(fields));
  const [errors, setErrors] = useState(getInitialState(fields));
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const validateFields = () => {
    const newErrors = getInitialState(fields);
    Object.keys(fields).forEach((key) => {
      const field = fields[key];

      if (field.validators && field.validators.length > 0) {
        const value = values[key];
        let error = '';
        field.validators.forEach((validator) => {
          const validationError = validator(value);
          if (validationError) {
            error = validationError;
          }
        });
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
  };

  const submit = () => {
    validateFields();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
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

const CreateAccountForm = ({
  buttonText,
  onSubmit,
  children,
  onAuthentication,
}) => {
  return (
    <Form
      buttonText="Sign up"
      fields={{
        firstName: {
          label: 'First name',
          validators: [validateContent],
        },
        email: {
          label: 'Email',
          validators: [validateContent],
          keyboardType: 'email-address',
        },
        password: {
          label: 'Password',
          validators: [validateContent, validateLength],
          secureTextEntry: true,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateAccountForm;
