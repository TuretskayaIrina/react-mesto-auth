import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {

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
    onLogin(email, password)
  }

  return(
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Вход</h2>
      <input
        onChange={handleChangeEmail}
        className="login__input"
        required
        placeholder="Email"
        type="email"
      />
      <input
        onChange={handleChangePassword}
        className="login__input"
        required placeholder="Пароль"
        type="password"
        minLength="10" maxLength="40"
      />
      <button className="login__submit" type="submit">Войти</button>
      <Link to="/sign-up" className="login__link">Ещё не зарегистрированы? Регистрация</Link>
    </form>
  );
}

export default Login;
