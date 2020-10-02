import React from 'react';
import Error from '../images/error.png';
import Ok from '../images/ok.png';

function InfoTooltip() {
  return (
    <div className="popup popup_opened popup_bg-opacity-light">
      <div className="popup__container">
        <div className="infotooltip">
          <div className="infotooltip__container">
            <img alt="status" src={Ok}></img>
            <h3 className="infotooltip__title">Вы успешно зарегистрировались!</h3>
          </div>
        </div>
        <button className="popup__button-close" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
