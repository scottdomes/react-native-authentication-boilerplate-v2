import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import FieldValidator from './FieldValidator';

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

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const submit = async () => {
    const values = getValues();
    const result = await action(...values);
    try {
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View>
      <Text>{errorMessage}</Text>
      <FieldValidator fields={fields} values={values}>
        {(errors) =>
          fieldKeys.map((key) => {
            const field = fields[key];
            const error = errors[key]
            return (
              <View key={key}>
                <Text>{field.label}</Text>
                <TextInput
                  {...field.inputProps}
                  value={values[key]}
                  onChangeText={(text) => onChangeValue(key, text)}
                />
                <Text>{error}</Text>
              </View>
            );
          })
        }
      </FieldValidator>
      <Button title={buttonText} onPress={submit} />
    </View>
  );
};

export default Form;
