import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuth, showRegForm } from '../../redux/slices/mainSlice';

import styles from '../RegForm/RegForm.module.scss';

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const userInfo = await dispatch(fetchAuth(values));
      if (!userInfo.payload) {
        return alert('Не удалось авторизоваться');
      }

      if ('token' in userInfo.payload) {
        window.localStorage.setItem('token', userInfo.payload.token);
      }
      navigate('/account');
      
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Введите электронный адрес' })}
        placeholder="Введите email"
        type="email"
      />
      {errors?.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
      <input
        {...register('password', { required: 'Введите пароль', minLength: 8 })}
        placeholder="Введите пароль"
        type="password"
      />
      {errors?.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      <button className={styles.submitBtn}>Войти</button>
      <a onClick={() => dispatch(showRegForm())} className={styles.haveAccBtn}>Регистрация</a>
    </form>
  );
};

export default AuthForm;
