import {useState} from 'react';

function useToken() {

  // Получаем из локального хранилища наш токен и парсим его в объект
  const getToken = () => {
     // Ищем по ключу "token"
    return localStorage.getItem('token'); // Возвращаем
  };

  const signOut = () =>{
    localStorage.clear();
    window.location.reload();
  }

  // Помещаем в стейт наш текущей токен (т.е. вызываем его методом)
  const [token, setToken] = useState(getToken());

  // Здесь сохроняем наш токен и задаем его в стейт
  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };


  // Возвращаем значения
  return {
    setToken: saveToken,
    token,
    signOut
  }
}

export default useToken;