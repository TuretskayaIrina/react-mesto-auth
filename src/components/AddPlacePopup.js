import React from 'react';
import PopupWithForm from './PopupWithForm';
import FormValidator from '../hooks/FormValidator';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const {values, handleChange, errors, isValid, resetForm} = FormValidator();
  React.useEffect(() => {
    resetForm();
  }, [ resetForm ]);

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
        <input
          ref={title}
          id="place"
          className="popup__input popup__input_place"
          type="text"
          name="place"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.place || ''}
        />
        <span id="place-error" className="popup__input-error">{errors.place || ''}</span>

        <input
          ref={link}
          id="link-card"
          className="popup__input popup__input_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.link || ''}
        />
        <span id="link-error" className="popup__input-error">{errors.link || ''}</span>

        <button
          className={isValid ? 'popup__button-save' : 'popup__button-save popup__button-save_inactive'}
          disabled={!isValid}
          type="submit"
        >
          Добавить
        </button>
      </>
    }
    />
  )
}

export default AddPlacePopup;
