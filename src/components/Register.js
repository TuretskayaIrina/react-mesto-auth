import React from 'react';
import { Link } from 'react-router-dom';
import FormValidator from '../hooks/FormValidator';

function Register({ onRegister }) {

  // валидация формы
  const {values, handleChange, errors, isValid, resetForm} = FormValidator();
  React.useEffect(() => {
    resetForm();
  }, [ resetForm ]);

  // обработчик отправки формы регистрации
  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onRegister(values.email, values.password)
  }

  return(
    <form onSubmit={handleSubmit} className="login">
      <h2 className="login__title">Регистрация</h2>
      <input
        onChange={handleChange}
        className="login__input"
        required
        placeholder="Email"
        type="email"
        minLength="5"
        maxLength="40"
        id="email-input"
        name="email"
        value={values.email || ''}
      />
      <span id="email-register-error" className="popup__input-error popup__input-error_register" >{errors.email || ''}</span>
      <input
        onChange={handleChange}
        className="login__input"
        required
        placeholder="Пароль"
        type="password"
        minLength="10"
        maxLength="40"
        id="password-input"
        name="password"
        value={values.password || ''}
      />
      <span id="password-register-error" className="popup__input-error popup__input-error_register" >{errors.password || ''}</span>
      <button  className={isValid ? 'login__submit login__submit-active' : 'login__submit login__submit-disabled'} type="submit" disabled={!isValid}>Зарегистрироваться</button>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
