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
import DelitePlacePopup from './DelitePlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
  const[cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardDelete, setCardDelete] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDelitePlacePopupOpen, setIsDelitePlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: ''
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const history = useHistory();

  // получить данные профиля с сервера
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
  }, []);

  // получить карточки с сервера
  React.useEffect(() => {
    api.getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => console.log(err))
  }, []);

  // открыть попап удаления
  function handleDelitePlaceClick() {
    setIsDelitePlacePopupOpen(true);
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

  // открыть попап InfoTooltip
  function handleRegisterConfirm(state) {
    setIsInfoTooltipOpen(true)
    setIsSuccess(state);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsDelitePlacePopupOpen(false);
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
      api.setLike(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
    } else {
      api.deleteLike(card._id)
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
    api.deleteCard(cardDelete._id)
    .then(() => {
      setCards(cards.filter((c) => c._id !== cardDelete._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  // изменить описание профиля
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // изменить аватар
  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // добавить новое место
  function handleAddPlaceSubmit(data){
    api.setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
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

  function user() {
    console.log('user')
  }

  function handleOut() {
    console.log('handleOut')
  }

  // обработчик регистрации
  function handleRegister(email, password) {
    console.log('handleRegister')
    return auth.register(email, password)
      .then(() => {
        handleRegisterConfirm(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        handleRegisterConfirm(false);
        console.log(err);
      })
  }


  function handleLogin() {
    console.log('handleLogin')
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            user={user}
            onSignOut={handleOut}
          />

          <Switch>
            <ProtectedRoute
              exact path="/"
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
              {/* {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>} */}
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

          <DelitePlacePopup
            isOpen={isDelitePlacePopupOpen}
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
            isSuccess={isSuccess}
          />

        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
