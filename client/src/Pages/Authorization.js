import axios from "axios";
import React from "react";
import PropTypes from 'prop-types'
import { useState } from "react";

const Authorization = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit  = async (e) => {
    e.preventDefault();
    try {
      console.log("сработало!");
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
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
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="col-4 container authorizationContainer mt-4">
      <form onSubmit={handleSubmit }>
        <p className="has-text-centered">{msg}</p>
        <div class="mb-3 m-3">
          <label for="loginInput" class="form-label">
            Логин
          </label>
          <input
            class="form-control"
            id="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="col-auto m-3 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary mt-3 col-3">
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
