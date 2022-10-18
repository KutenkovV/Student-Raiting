import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Authorization = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/users/login",
        {
          user: {
            email: email,
            password: password,
          },
        }
      );

      // Передаем токен в App.js
      setToken(response.data.user.token);
    } catch (error) {
      if (error.response?.status === 401) {
        // Вывод сообщения с сервера
        setValid(true);
        setErrMsg(error.response.data.errors.body[1]);
      } else {
        setValid(true);
        setErrMsg("Сервер не отвечает");
      }
    }
  };

  return (
    <div className="col-lg-4 col-sm-6 container authorizationContainer mt-4">
      <form onSubmit={handleSubmit}>
        <p className="alert alert-primary" role="alert">
          Для работы в системе авторизуйтесь
        </p>
        <p className={valid ? "alert alert-danger" : ""} role="alert">
          {errMsg}
        </p>
        <div class="mb-3 m-3">
          <label for="loginInput" class="form-label">
            Логин
          </label>
          <input
            class="form-control"
            id="loginInput"
            value={email}
            placeholder="Логин"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="mb-3 m-3">
          <label for="inputPassword" class="form-label">
            Пароль
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div class="col-auto m-3 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary mt-3 col-auto">
            Вход
          </button>
        </div>
      </form>
    </div>
  );
};

Authorization.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Authorization;
