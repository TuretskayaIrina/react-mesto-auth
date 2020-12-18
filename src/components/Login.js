import React from 'react';
import { Link } from 'react-router-dom';
import FormValidator from '../hooks/FormValidator';

function Login({ onLogin }) {

  const {values, handleChange, errors, isValid, resetForm} = FormValidator();
  React.useEffect(() => {
    resetForm();
  }, [ resetForm ]);

  // обработчик отправки формы авторизации
  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values.email, values.password)
  }

  return(
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Вход</h2>
      <input
        onChange={handleChange}
        className="login__input"
        required
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={values.email || ''}
      />
      <span id="email-auth-error" className="popup__input-error popup__input-error_register" >{errors.email || ''}</span>
      <input
        onChange={handleChange}
        className="login__input"
        required placeholder="Пароль"
        type="password"
        id="password"
        name="password"
        value={values.password || ''}
      />
      <span id="password-auth-error" className="popup__input-error popup__input-error_register" >{errors.password || ''}</span>
      <button className={isValid ? 'login__submit login__submit-active' : 'login__submit login__submit-disabled'} type="submit" disabled={!isValid}>Войти</button>
      <Link to="/sign-up" className="login__link">Ещё не зарегистрированы? Регистрация</Link>
    </form>
  );
}

export default Login;
