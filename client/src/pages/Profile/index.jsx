import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, fetchUpdateInfo, selectIsAuth } from '../../redux/slices/mainSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import styles from '../../components/RegForm/RegForm.module.scss';

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

  const username = useSelector((state) => state?.mainReducer?.data?.name);

  const [info, setInfo] = useState();

  const inputFileRef = useRef(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      const file = inputFileRef.current.files[0];
      formData.append('image', file);
      const { data } = await axios.post(`/upload`, formData);
      const result = { ...values, photoUrl: data.url, id: info?.payload._id };
      const responce = await dispatch(fetchUpdateInfo(result));
    } catch (error) {
      console.log('Не удалось внести изменения', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(fetchAuthMe());
      setInfo(result);
    }
    fetchData();
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isAuth && (
        <div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <input
                  {...register('name', { required: 'Введите имя' })}
                  placeholder={username}
                  type="name"
                />
                {errors?.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                <input
                  {...register('password', { required: 'Введите пароль', minLength: 8 })}
                  placeholder="Введите пароль"
                  type="password"
                />
                {errors?.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
              </div>
              <img width={300} src={info?.payload?.photoUrl} alt={info?.payload?.name} />
            </div>
            <input ref={inputFileRef} type="file" />
            <button className={styles.submitBtn}>Изменить</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
