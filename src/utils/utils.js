// мой конфиг

const config = {
  baseUrl: 'https://api.noinstagram.students.nomoreparties.xyz',
  // для локальной работы
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

export const authUrl = 'https://api.noinstagram.students.nomoreparties.xyz';
// для локальной работы
// export const authUrl = 'http://localhost:3000';

export default config;
