import {authUrl} from './utils';

// запросить регистрацию пользователя
export const register = (password, email) => {
  return fetch(
    `${authUrl}/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

// запросить авторизацию пользователя
export const authorize = (password, email) => {
  return fetch(
    `${authUrl}/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err))
}

// проверить валидность токена и получить email для вставки в шапку сайта
export const getContent = (token) => {
  return fetch(`${authUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => {
      if (res.ok) {
          return res.json();
      }
      else {
          return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch(err => console.log(err))
}
