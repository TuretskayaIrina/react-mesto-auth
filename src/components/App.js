import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import Error from '../images/error.png';
import Ok from '../images/ok.png';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardDelete, setCardDelete] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: ''
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [img, setImg] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  // проверить токен в локальном хранилище при монтировании App
  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // залогиниться и получить данные пользователя + карточки
  React.useEffect(() => {
    if ( loggedIn ){
      Promise.all([ api.getUserInfo({ token: localStorage.jwt }), api.getInitialCards({ token: localStorage.jwt }) ])
        .then( ([{ data: user }, items ]) => {
          setCurrentUser(user)
          setCards(items.reverse())
          console.log(items)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  // разлогиниться
  function handleOut() {
    localStorage.removeItem('jwt');
    history.push('/login');
    setLoggedIn(false);
  }

  // обработчик регистрации
  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        setMessage('Вы успешно зарегистрировались!');
        setImg(Ok);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        if (err.status === 400) {
          setMessage('Пароль должен быть без пробелов. Email в формате: example@domain.com');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        } else if (err.status === 409) {
          setMessage('Пользователь с таким email уже зарегистрирован');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        } else {
          setMessage('Что-то пошло не так! Попробуйте ещё раз');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        }
      })
  }

  // проверить валидность токена и получить email для вставки в шапку сайта
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              id: res.data._id,
              email: res.data.email
            });
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          history.push('/sign-in');
        });
    }
  }

  // обработчик авторизации
  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setMessage('Неправильные почта или\u00A0пароль');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        } else if (err.status === 401) {
          setMessage('Неправильные почта или\u00A0пароль');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        } else {
          setMessage('Что-то пошло не так! Попробуйте ещё раз.');
          setImg(Error);
          setIsInfoTooltipOpen(true);
        }
      })
  }

  // открыть попап удаления
  function handleDelitePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  // открыть попап изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открыть попап изменения описания профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открфть попап добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // открыть попап просмотра изображения в полном размере
  function handleCardClick(name, link) {
    setSelectedCard({
      isOpen: true,
      name: name,
      link: link
    })
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsDeletePlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      name: '',
      link: ''
    })
    setIsInfoTooltipOpen(false);
  }

  // закрыть на Esc
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  // закрыть на overlay
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  // обработчик лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.setLike({ token: localStorage.jwt, cardId: card._id })
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
    } else {
      api.deleteLike({ token: localStorage.jwt, cardId: card._id })
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards)
      })
      .catch((err) => console.log(err))
    }
  }

  // открытие попапа удаления конкретной карточки
  function handleCardDelete(card) {
    setCardDelete(card);
    handleDelitePlaceClick();
  }

  // удаление карточки
  function handleConfirmCardDelete() {
    api.deleteCard({ token: localStorage.jwt, cardId: cardDelete._id })
    .then(() => {
      setCards(cards.filter((c) => c._id !== cardDelete._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }


  // изменить описание профиля
  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ token: localStorage.jwt, name, about })
      .then(() => {
        setCurrentUser({ ...currentUser, name, about });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // изменить аватар
  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ token: localStorage.jwt, avatar })
      .then(() => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // добавить новое место
  function handleAddPlaceSubmit({ name, link }){
    api.setCard({ token: localStorage.jwt, name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        console.log(newCard.owner)
      })
      .catch((err) => console.log(err))
  }

  // слушатели для закрытия на esc и overlay
  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handleOverlayClose);

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('mousedown', handleOverlayClose);
    };
  })

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            userData={userData}
            onSignOut={handleOut}
            loggedIn={loggedIn}
          />

          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />

            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>

            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
            </Route>

          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeletePlacePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleConfirmCardDelete}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            img={img}
            message={message}
          />

        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
