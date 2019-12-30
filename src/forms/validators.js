import { useState } from 'react';

export const validateContent = (text) => {
  if (!text) {
    return "Can't be blank";
  }
};

export const validateLength = (text) => {
  if (text && text.length < 4) {
    return 'Must be 4 characters or more.';
  }
};

export const useValidatedField = (defaultValue, validators) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');

  const validateField = () => {
    setError('');
    validators.some((validator) => {
      const err = validator(value);

      if (err) {
        setError(err);
        return true;
      }
    });
  };

  return [value, setValue, validateField, error];
};
