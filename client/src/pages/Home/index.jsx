import React, { useRef, useState } from 'react';

import styles from './Home.module.scss';
import RegForm from '../../components/RegForm';
import AuthForm from '../../components/AuthForm';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/mainSlice';

const Home = () => {

  const isAuth = useSelector(selectIsAuth);

  const [state, setState] = useState(false);

  function getAge(dateString) {
    let today = new Date();
    let age = today.getFullYear() - dateString.getFullYear();
    let m = today.getMonth() - dateString.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateString.getDate())) {
      age--;
    }
    return age;
  }

  return <>{isAuth ? <AuthForm /> : <RegForm />}</>;
};

export default Home;
