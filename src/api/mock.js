const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (email, password, shouldSucceed = true) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

export const createAccount = (email, password, shouldSucceed = true) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

const getAuthenticationToken = () => 'successful_fake_token';

export const getUsers = (shouldSucceed = true) => {
  const token = getAuthenticationToken();

  if (!shouldSucceed) {
    return mockFailure({ error: 'Invalid Request' });
  }

  return mockSuccess({
    users: [
      {
        email: 'test@test.ca',
      },
      {
        email: 'test2@test.ca',
      },
    ],
  });
};
