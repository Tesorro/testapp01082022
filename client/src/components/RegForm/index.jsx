import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import { Navigate } from 'react-router-dom';

import axios from '../../axios';

import styles from './RegForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth, showLoginForm } from '../../redux/slices/mainSlice';

const options = [
  { value: 'М', label: 'М' },
  { value: 'Ж', label: 'Ж' },
];

const RegForm = () => {
  const isAuth = useSelector(selectIsAuth);

  const [photoUrl, setPhotoUrl] = useState();

  const [gender, setGender] = useState('');

  const [date, setDate] = useState(new Date());

  const inputFileRef = useRef(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (values) => {
    try {
      if (values.password !== values.passwordConfirm) {
        resetField('password');
        resetField('passwordConfirm');
        return alert('Введенные пароли не совпадают')
      }
      const formData = new FormData();
      const file = inputFileRef.current.files[0];
      formData.append('image', file);
      const { data } = await axios.post(`/upload`, formData);
      const fields = ({ passwordConfirm, ...values }) => values;
      const result = {
        ...fields(values),
        photoUrl: `http://localhost:4444${data.url}`,
        gender: gender.value,
        birthday: date,
      };
      const userInfo = await dispatch(fetchRegister(result));
      if (!userInfo.payload) {
        return alert('Не удалось зарегистрироваться');
      }

      if ('token' in userInfo.payload) {
        window.localStorage.setItem('token', userInfo.payload.token);
      }
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  if (isAuth) {
    return <Navigate to="/account" />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Введите полное имя', minLength: 3 })}
        type="text"
        placeholder="Введите имя"
      />
      {errors?.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
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
      <input
        {...register('passwordConfirm', { required: 'Введите пароль', minLength: 8 })}
        placeholder="Подтвердите пароль"
        type="password"
      />
      {errors?.passwordConfirm && (
        <div style={{ color: 'red' }}>{errors.passwordConfirm.message}</div>
      )}
      <div className={styles.datePicker}>
        <DatePicker
          onChange={(date) => setDate(date)}
          value={date}
          returnValue="start"
          maxDate={new Date()}
        />
      </div>
      <Select
        placeholder="Пол"
        className={styles.gender}
        options={options}
        value={gender}
        onChange={(value) => setGender(value)}
      />
      <input ref={inputFileRef} type="file" />
      <button className={styles.submitBtn}>Зарегистрироваться</button>
      <a className={styles.haveAccBtn} onClick={() => dispatch(showLoginForm())}>Есть аккаунт?</a>
    </form>
  );
};

export default RegForm;
