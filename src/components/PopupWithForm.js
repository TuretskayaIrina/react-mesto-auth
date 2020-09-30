import React from 'react';

function PopupWithForm(props) {
  return(
    <div className={(props.isOpen ? `popup ${props.name} popup_bg-opacity-light popup_opened` : `popup ${props.name} popup_bg-opacity-light`)}>
      <div className="popup__container">
        <form className="popup__form" action="#" noValidate name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button-save" type="submit">Сохранить</button>
        </form>
        <button className="popup__button-close popup__edite-close" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;

