import {authUrl} from './utils';

// запросить регистрацию пользователя
export const register = (email, password) => {
  return fetch(
    `${authUrl}/signup`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
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
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      return;
    })
    .catch((err) => console.log(err));
}

// запросить авторизацию пользователя
export const authorize = (email, password) => {
  return fetch(
    `${authUrl}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
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
      'Accept': 'application/json',
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
