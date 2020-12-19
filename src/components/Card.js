import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import errorPhoto from '../images/error-photo.png'


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isMyCard = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`elements__delete ${isMyCard ? 'elements__delete_active' : ''}`);

  const isLiked = props.card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${isLiked ? 'elements__like_active' : ''}`);

  // массив имен лайкнувших пользователей
  const whoIsLiked = props.card.likes.map((item) => item.name);
  console.log(whoIsLiked);


  // обработчик попапа просмотра картинки
  function handleCardClick() {
    props.onCardClick(props.card.name, props.card.link);
  }

  // обработчик лайков
  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  // обработчик удаления карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
      <div className="elements__place" key={props.card._id}>
        <img alt={props.card.name} className="elements__img" src={props.card.link || errorPhoto}  onClick={handleCardClick} />
        <button onClick={handleDeleteClick} className={`${cardDeleteButtonClassName}`} type="button" />
        <div className="elements__about">
          <h2 className="elements__name">{props.card.name}</h2>
          <div className="elements__like-container">
            <button className={`${cardLikeButtonClassName}`} type="button" onClick={handleLikeClick}/>
            <span className="elements__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </div>
  )
}

export default Card;
