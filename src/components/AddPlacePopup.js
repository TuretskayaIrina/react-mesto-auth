import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const title = React.useRef();
  const link = React.useRef();

  // очистить поля при открытии попапа
  React.useEffect(() => {
    title.current.value = '';
    link.current.value = '';
  }, [isOpen]);


  // обработчик создания карточки
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title.current.value,
      link: link.current.value
    });
  }

  return(
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='popup-add'
    title='Новое место'
    children={
      <>
        <input ref={title} id="place" className="popup__input popup__input_place" type="text" name="placeInput"  placeholder="Название" required minLength="1" maxLength="30" />
        <span id="place-error" className="popup__input-error" />

        <input ref={link}  id="link" className="popup__input popup__input_link" type="url" name="linkInput"  placeholder="Ссылка на картинку" required />
        <span id="link-error" className="popup__input-error" />
      </>
    }
    />
  )
}

export default AddPlacePopup;
