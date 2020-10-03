import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const[ password, setPassword ] = React.useState('');
  const[ email, setEmail ] = React.useState('');

  // обработчик изменения пароля
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  // обработчик изменения email
  function handleChangeEmail(e) {
    setEmail (e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email)
  }

  return(
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Регистрация</h2>
      <input className="login__input" required placeholder="Email" type="email" />
      <input onChange={handleChangePassword} className="login__input" required placeholder="Пароль" type="password" minLength="10" maxLength="40" />
      <button onChange={handleChangeEmail} className="login__submit" type="submit">Зарегистрироваться</button>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
