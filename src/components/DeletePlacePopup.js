import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup(props) {

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
    children={
      <>
        <button className="popup__button-save" type="submit">Да</button>
      </>
    }
    />
  )
}

export default DeletePlacePopup;
