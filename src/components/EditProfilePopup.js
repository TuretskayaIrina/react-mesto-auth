import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function EditProfilePopup({ isOpen,  onClose, onUpdateUser }) {
  const[ name, setName ] = React.useState('');
  const[ description, setDescription ] = React.useState('');

  // обработчик изменения имени
  function handleChangeName(e) {
    setName(e.target.value);
  }

  // обработчик изменения описания
  function handleChangeDescription(e) {
    setDescription (e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // обработчик отправки изменений профиля
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='popup-edite'
    title='Редактировать профиль'
    children={
      <>
        <input value={name || ''} onChange={handleChangeName} id="name-prifile" className="popup__input popup__input_name" type="text" name="nameInput"  placeholder="Имя" required minLength="2" maxLength="40" pattern="[А-ЯЁа-яёA-Za-z -]{1,40}" />
        <span id="name-prifile-error" className="popup__input-error" />

        <input value={description || ''} onChange={handleChangeDescription} id="profession" className="popup__input popup__input_profession" type="text" name="jobInput"  placeholder="О себе" required minLength="2" maxLength="200" />
        <span id="profession-error" className="popup__input-error" />
      </>
    }
    />
  )

}


export default EditProfilePopup;
