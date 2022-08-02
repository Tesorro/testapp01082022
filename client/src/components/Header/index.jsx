import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';
import { Tooltip } from '@mui/material';

const Header = () => {
  // const isAuth = true;
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/">
                  <Button variant="contained">Главная</Button>
                </Link>
                <Link to="/account">
                  <Button variant="contained">Профиль</Button>
                </Link>
                <Link to="/people">
                  <Button variant="contained">Аккаунты</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
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
