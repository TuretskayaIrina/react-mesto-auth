import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return(
    <form className="login">
      <h2 className="login__title">Регистрация</h2>
      <input className="login__input" required placeholder="Email" type="email" />
      <input className="login__input" required placeholder="Пароль" type="password" minLength="10" maxLength="40" />
      <button className="login__submit" type="submit">Зарегистрироваться</button>
      <a href="#" className="login__link">Уже зарегистрированы? Войти</a>
    </form>
  );
}

export default Register;
