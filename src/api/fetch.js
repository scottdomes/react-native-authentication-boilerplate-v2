import { API_URL } from '../../secrets';
import { getToken } from './token';

const resultFormatter = async (res) => {
  const formatted = {
    status: res.status,
    message: res.message,
    ok: res.ok,
  };

  if (res.ok) {
    formatted.data = await res.json();
  }

  console.log(formatted);

  return formatted;
};

const getHeaders = async () => {
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const formattedResult = await resultFormatter(result);

  return formattedResult;
};

export const get = async (destination) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'GET',
    headers,
  });

  const formattedResult = await resultFormatter(result);

  return formattedResult;
};
