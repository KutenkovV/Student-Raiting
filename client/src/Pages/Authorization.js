import axios from "axios";
import React from "react";
import { useState } from "react";

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const Auth = async (e) => {
        e.preventDefault();
        try {
            console.log('сработало!');
            const response = await axios.post('http://localhost:8080/api/users/login', {
                user: {
                    email: email,
                    password: password
                }
            });

            localStorage.setItem('token', response.data.user.token)
        } catch(error) {
            if(error.response) {
                setMsg(error.response.data.msg)
            }
        }
    } 

    return (
      <div className="col-6 container authorizationContainer">
        <form onSubmit={Auth}>
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
  }
  
export default Authorization;