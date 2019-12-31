import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields, buttonText, action }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));

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
    console.log(result);
  };

  return (
    <View>
      {fieldKeys.map((key) => {
        const field = fields[key];
        return (
          <View key={key}>
            <Text>{field.label}</Text>
            <TextInput
              {...field.inputProps}
              value={values[key]}
              onChangeText={(text) => onChangeValue(key, text)}
            />
          </View>
        );
      })}
      <Button title={buttonText} onPress={submit} />
    </View>
  );
};

export default Form;
