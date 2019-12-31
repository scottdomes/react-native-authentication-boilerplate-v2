import React, { useState } from 'react';
import { validateContent } from './validators';
import Form from './Form';

const ForgotPasswordForm = ({ children, onComplete }) => {
  const handleResult = async (result) => {
    if (result && result.ok) {
      onComplete();
    } else if (result && !result.ok) {
      throw new Error('Something went wrong.');
    }
  };

  return (
    <Form
      action={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      }
      afterSubmit={handleResult}
      buttonText="Submit"
      fields={{
        email: {
          label: 'Email',
          validators: [validateContent],
          keyboardType: 'email-address',
        },
      }}
    >
      {children}
    </Form>
  );
};

export default ForgotPasswordForm;
