import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import FormValidator from '../hooks/FormValidator';


function EditProfilePopup({ isOpen,  onClose, onUpdateUser }) {
  // eslint-disable-next-line no-unused-vars
  const[ name, setName ] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const[ description, setDescription ] = React.useState('');

  const {values, handleChange, errors, isValid, resetForm} = FormValidator();
  React.useEffect(() => {
    resetForm();
  }, [ resetForm ]);

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // обработчик отправки изменений профиля
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
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
        <input
          value={values.name || ''}
          onChange={handleChange}
          id="name-prifile"
          className="popup__input popup__input_name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          pattern="[А-ЯЁа-яёA-Za-z -]{1,40}"
        />
        <span id="name-prifile-error" className="popup__input-error">{errors.name || ''}</span>

        <input
          value={values.description || ''}
          onChange={handleChange}
          id="profession"
          className="popup__input popup__input_profession"
          type="text"
          name="description"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="profession-error" className="popup__input-error">{errors.description || ''}</span>
        <button
          className={isValid ? 'popup__button-save' : 'popup__button-save popup__button-save_inactive'}
          disabled={!isValid}
          type="submit"
        >
          Изменить
        </button>
      </>
    }
    />
  )

}


export default EditProfilePopup;
