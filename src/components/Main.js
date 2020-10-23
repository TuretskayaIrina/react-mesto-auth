import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">

      <section className="profile">
        <div className="profile__container">
          <img src={currentUser.avatar} alt="Аватарка" className="profile__img" />
          <div className="profile__pen-edite" onClick={props.onEditAvatar} />
          <div className="profile__info">
            <div className="profile__change">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__button-edit" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace} />
      </section>

      {<section className="elements">
      {props.cards.map((card) => <Card key={card._id} card={card} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} onCardLike={props.onCardLike} />)}
      </section>}

    </main>
  );
}

export default Main;
