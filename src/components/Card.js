import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import errorPhoto from '../images/error-photo.png';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isMyCard = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`elements__delete ${isMyCard ? 'elements__delete_active' : ''}`);

  const isLiked = props.card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${isLiked ? 'elements__like_active' : ''}`);

  // массив имен лайкнувших пользователей
  const whoIsLiked = props.card.likes.map((item) => item.name)

  // обработчик вывода имен лайкнувших пользователей и счетчика лайков
  function nameLiked(number) {
    const arr = whoIsLiked;
    if (number === 0) {
      return `Это фото еще не оценили...`
    } else if (number === 1) {
      return `Нравится: ${arr[0]}`
    } else if (number === 2) {
      let newArr = arr.splice(0, 2);
      const nameList = newArr.join(', ');
      return `Нравится: ${nameList}`
    } else if (number > 2) {
      let newArr = arr.splice(0, 2);
      const nameList = newArr.join(', ');
      const likeCounter = arr.length
      return `Нравится: ${nameList} и еще ${likeCounter}`
    } else if (number >= 3) {
      let newArr = arr.splice(0, 2);
      const nameList = newArr.join(', ');
      const likeCounter = arr.length - 2
      return `Нравится: ${nameList} и еще ${likeCounter}`
    }
  }

  // dsводим три первых аватарки пользователей лайкнувших фото
  const whoIsLikedAvatar = props.card.likes.map((item) => item.avatar);
  const first = whoIsLikedAvatar[0];
  const second = whoIsLikedAvatar[1];
  const third = whoIsLikedAvatar[2];

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
          <div className="elements__about-box">
            <div className="elements__about-description">
              <h2 className="elements__name">{props.card.name}</h2>
              <button className={`${cardLikeButtonClassName}`} type="button" onClick={handleLikeClick}/>
            </div>
            <div className="elements__like-box">
              <div className={whoIsLikedAvatar.length === 2 ? 'elements__like-avatars_width' : 'elements__like-avatars'}>
                { whoIsLikedAvatar.length === 1 &&
                  <img className="elements__like-avatars-item" src={first} alt="avatar"></img>
                }
                { whoIsLikedAvatar.length === 2 &&
                  <img className="elements__like-avatars-item" src={first} alt="avatar"></img>
                }
                { whoIsLikedAvatar.length === 2 &&
                  <img className="elements__like-avatars-item" src={second} alt="avatar"></img>
                }
                { whoIsLikedAvatar.length >= 3 &&
                  <img className="elements__like-avatars-item" src={first} alt="avatar"></img>
                }
                { whoIsLikedAvatar.length >= 3 &&
                  <img className="elements__like-avatars-item" src={second} alt="avatar"></img>
                }
                { whoIsLikedAvatar.length >= 3 &&
                  <img className="elements__like-avatars-item" src={third} alt="avatar"></img>
                }
              </div>
              { nameLiked(whoIsLikedAvatar.length) }
            </div>
          </div>
        </div>
      </div>
  )
}

export default Card;
