import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={(props.isOpen ? `popup popup_opened popup_bg-opacity-light` : `popup popup_bg-opacity-light`)}>
      <div className="popup__container">
        <div className="infotooltip">
          <div className="infotooltip__container">
            <img alt="status" src={props.img}></img>
            <h3 className="infotooltip__title">{props.message}</h3>

          </div>
        </div>
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
