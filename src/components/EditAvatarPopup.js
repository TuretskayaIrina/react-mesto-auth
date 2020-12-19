import React from 'react';
import PopupWithForm from './PopupWithForm';
import FormValidator from '../hooks/FormValidator';

function EditAvatarPopup({ isOpen,  onClose, onUpdateAvatar }) {

  const {values, handleChange, errors, isValid, resetForm} = FormValidator();
  React.useEffect(() => {
    resetForm();
  }, [ resetForm ]);

  const avatarRef = React.useRef();

  // очистить поля при открытии попапа
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  // обработчик отправки изменения аватарки
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='popup-avatar'
    title='Обновить аватар'
    children={
      <>
        <input
          ref={avatarRef}
          id="link"
          className="popup__input popup__input_avatar"
          type="url"
          name="avatar"
          value={values.avatar || ''}
          placeholder="Ссылка на аватар"
          onChange={handleChange}
          required
        />
        <span id="link-error" className="popup__input-error">{errors.avatar || ''}</span>

        <button
          className={isValid ? 'popup__button-save' : 'popup__button-save popup__button-save_inactive'}
          disabled={!isValid}
          type="submit"
        >
          Обновить
        </button>
      </>
    }
    />
  )
}

export default EditAvatarPopup;
