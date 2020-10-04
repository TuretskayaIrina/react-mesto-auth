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
    if (!email || !password) {
      return;
    }
    onRegister(email, password)
    console.log(onRegister(email, password))
  }

  return(
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Регистрация</h2>
      <input
        onChange={handleChangeEmail}
        className="login__input"
        required
        placeholder="Email"
        type="email"
        id="email-input"
        name="email"
        // value={email || ''}
      />
      <input
        onChange={handleChangePassword}
        className="login__input"
        required
        placeholder="Пароль"
        type="password"
        minLength="10"
        maxLength="40"
        id="password-input"
        name="password"
        // value={password || ''}
      />
      <button  className="login__submit" type="submit">Зарегистрироваться</button>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
