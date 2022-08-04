import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGetPeople, selectIsAuth } from '../../redux/slices/mainSlice';

import styles from './People.module.scss';

const People = () => {
  const isAuth = useSelector(selectIsAuth);

  const [people, setPeople] = useState([]);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      const usersList = await dispatch(fetchGetPeople());
      setPeople(usersList.payload.usersList);
    }
    setIsLoading(true);
    fetchList();
    setIsLoading(false);
  }, []);

  return (
    <>
      <h1>Пользователи:</h1>
      {isLoading ? (
        <h2>Загрузка</h2>
      ) : (
        <ol>
          {people.map((el, i) => (
            <Link key={i} to={`/user/${el._id}`}>
              {' '}
              <li className={styles.li}>{el.name}</li>
            </Link>
          ))}
        </ol>
      )}
    </>
  );
};

export default People;
