import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { validateFields, hasValidationError } from '../forms/validation';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const submit = async () => {
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    if (hasValidationError(errors)) {
      console.log(errors);
      return setValidationErrors(errors);
    }
    const result = await action(...getValues());
    try {
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View>
      <Text>{errorMessage}</Text>
      {fieldKeys.map((key) => {
        const field = fields[key];
        const fieldError = validationErrors[key];
        return (
          <View key={key}>
            <Text>{field.label}</Text>
            <TextInput
              {...field.inputProps}
              value={values[key]}
              onChangeText={(text) => onChangeValue(key, text)}
            />
            <Text>{fieldError}</Text>
          </View>
        );
      })}
      <Button title={buttonText} onPress={submit} />
    </View>
  );
};

export default Form;
