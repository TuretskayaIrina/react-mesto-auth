import React from 'react';

function ImagePopup(props) {
  return(
    <div className={(props.card.isOpen ? `popup popup-picture popup_bg-opacity-dark popup_opened` : `popup popup-picture popup_bg-opacity-dark`)}>
      <div className="popup__container">
        <figure className="popup__figure">
          <img alt={props.card.name} src={props.card.link} className="popup__image" />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__button-close popup__picture-close" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}
 export default ImagePopup;

