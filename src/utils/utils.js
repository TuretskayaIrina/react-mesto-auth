// мой конфиг

const config = {
  baseUrl: 'https://api.kusto.students.nomoreparties.xyz',
  headers: {
    authorization: { Authorization: localStorage.authToken },
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const authUrl = 'https://api.kusto.students.nomoreparties.xyz';

export default config;
