import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, logout, selectIsAuth } from '../../redux/slices/mainSlice';

const Header = () => {
  const isAuth = useSelector(selectIsAuth);

  const username = useSelector(state => state?.mainReducer?.data?.name);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(fetchAuthMe());
    }
    fetchData();
  }, []);

  const onClickLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {username && <h2 style={{ display: 'inline' }}>Привет, {username}</h2>}
            
                  <Link to="/account">
                    <Button variant="contained">Профиль</Button>
                  </Link>
                  <Link to="/people">
                    <Button variant="contained">Аккаунты</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Выйти
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="contained">Главная</Button>
                </Link>
                <Tooltip title="Необходимо авторизоваться">
                  <span>
                    <Link className={styles.disabledLink} to="/account">
                      <Button disabled variant="contained">
                        Профиль
                      </Button>
                    </Link>
                  </span>
                </Tooltip>
                <Tooltip title="Необходимо авторизоваться">
                  <span>
                    <Link className={styles.disabledLink} to="/people">
                      <Button disabled variant="contained">
                        Аккаунты
                      </Button>
                    </Link>
                  </span>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
