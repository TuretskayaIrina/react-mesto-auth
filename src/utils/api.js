import config from './utils';

class Api {
  constructor({ baseUrl, myId, headers = {} }) {
    this.baseUrl = baseUrl;
    this.myId = myId;
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
  getUserInfo() {
    return fetch(
      `${this.baseUrl}/users/me`,
      {
        headers: this.headers
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
        headers: this.headers,
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
        headers: this.headers,
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
        headers: this.headers
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
        headers: this.headers,
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
  setLike(id) {
    return fetch(
      `${this.baseUrl}/cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // удалить лайк
  deleteLike(id) {
    return fetch(
      `${this.baseUrl}/cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(
      `${this.baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

const api = new Api(config);

export default api;
