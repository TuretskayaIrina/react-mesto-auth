import React from 'react';
import PopupWithForm from './PopupWithForm';



function EditAvatarPopup({ isOpen,  onClose, onUpdateAvatar }) {
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
        <input ref={avatarRef} id="link" className="popup__input popup__input_avatar" type="url" name="linkInput"  placeholder="Ссылка на аватар" required />
        <span id="link-error" className="popup__input-error" />
      </>
    }
    />
  )
}

export default EditAvatarPopup;
