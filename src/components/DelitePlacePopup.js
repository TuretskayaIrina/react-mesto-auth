import React from 'react';
import PopupWithForm from './PopupWithForm';

function DelitePlacePopup(props) {

  // обработчик отправки удаления карточки
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
}

  return(
    <PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    name='popup-delite'
    title='Вы уверены?'
    />
  )
}

export default DelitePlacePopup;
