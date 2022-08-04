import React, { useRef, useState } from 'react';

import styles from './Home.module.scss';
import RegForm from '../../components/RegForm';
import AuthForm from '../../components/AuthForm';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/mainSlice';

const Home = () => {

  const showLogin = useSelector(state => state.mainReducer.isLogin);

  return <>{showLogin ? <AuthForm /> : <RegForm />}</>;
};

export default Home;
