import React from 'react';
import Error from '../images/error.png';
import Ok from '../images/ok.png';

function InfoTooltip(props) {
  return (
    <div className={(props.isOpen ? `popup popup_opened popup_bg-opacity-light` : `popup popup_bg-opacity-light`)}>
      <div className="popup__container">
        <div className="infotooltip">
          <div className="infotooltip__container">
            <img alt="status" src={`${ props.loggedIn ? Ok : Error }`}></img>
            <h3 className="infotooltip__title">{`${ props.loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}`}</h3>
          </div>
        </div>
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
