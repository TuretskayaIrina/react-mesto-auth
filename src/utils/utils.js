// мой конфиг

const config = {
  baseUrl: 'https://api.kusto.students.nomoreparties.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.jwt}`,
  }
};

export const authUrl = 'https://api.kusto.students.nomoreparties.xyz';

export default config;
