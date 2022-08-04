import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory, useNavigate } from 'react-router-dom';

import { fetchGetPeople } from '../../redux/slices/mainSlice';

import styles from './UserInfo.module.scss';

const UserInfo = () => {
  const [person, setPerson] = useState([]);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPerson() {
      const usersList = await dispatch(fetchGetPeople());
      const temp = usersList.payload.usersList.filter((user) => user._id === id);
      setPerson(temp);
    }
    setIsLoading(true);
    fetchPerson();
    setIsLoading(false);
  }, []);

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  return (
    <>
      {isLoading ? (
        <h1>Идет загрузка</h1>
      ) : (
        <>
        <div className={styles.container}>
          <img className={styles.photo} src={person[0]?.photoUrl} alt={person[0]?.name} />
          <div className={styles.info}>
            <p>Имя пользователя: {person[0]?.name}</p>
            <p>Возраст: {getAge(person[0]?.birthday)}</p>
          </div>
        </div>
        <button className={styles.button} onClick={() => navigate(-1)}>Назад</button>
        </>
      )}
    </>
  );
};

export default UserInfo;
