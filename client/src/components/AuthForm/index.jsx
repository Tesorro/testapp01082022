import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../RegForm/RegForm.module.scss';

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    alert(`name is ${data.email}, ${data.password}`);
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
    </form>
  );
};

export default AuthForm;
