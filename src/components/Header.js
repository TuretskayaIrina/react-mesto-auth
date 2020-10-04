import React from 'react';
import { Link, Route } from 'react-router-dom';

function Header(props) {
    return(
      <header className="header">
        <div className="header__logo" />
        <nav className="header__nav">

          <Route path="/sign-up">
            <Link to="/sign-in" className="header__in">Войти</Link>
          </Route>

          <Route path="/sign-in">
            <Link to="/sign-up" className="header__registration">Регистрация</Link>
          </Route>

          <Route exact path="/">
            <div className="header__data">
              <p className="header__email">{props.user}</p>
              <button className="header__button" onClick={props.onSignOut} type="button">Выйти</button>
            </div>
          </Route>

        </nav>

      </header>
    );
}

export default Header;
