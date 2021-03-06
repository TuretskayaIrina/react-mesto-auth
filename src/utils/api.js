import config from './utils';

class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // проверка ответа сервера
  _handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      console.log('Rejection')
      return Promise.reject(response.statusText)
    }
  }

  // обработка ошибки
  _handleResponseError(err){
    console.log('Error')
    return Promise.reject(err.message)
  }

  // получить данные профиля
  getUserInfo = () => {
    return fetch(
      `${this.baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${localStorage.jwt}` },
        }
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // отправить данные профиля
  setUserInfo(data) {
    return fetch(
      `${this.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${localStorage.jwt}` },
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // изменить аватарку
  changeAvatar(data) {
    return fetch(
      `${this.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${localStorage.jwt}` },
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }


  // получить дефолтные карточки
  getInitialCards() {
    return fetch(
      `${this.baseUrl}/cards`,
      {
        method: 'GET',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${localStorage.jwt}` },
        }
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // отправить карточку на сервер
  setCard(data) {
    return fetch(
      `${this.baseUrl}/cards`,
      {
        method: 'POST',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${localStorage.jwt}` },
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // отправить лайк
  setLike({token, cardId}) {
    return fetch(
      `${this.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${token}` },
        }
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // удалить лайк
  deleteLike({token, cardId}) {
    return fetch(
      `${this.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${token}` },
        }
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // удалить карточку
  deleteCard({token, cardId}) {
    return fetch(
      `${this.baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          ...this.headers,
          ...{ 'Authorization': `Bearer ${token}` },
        }
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

const api = new Api(config);

export default api;
