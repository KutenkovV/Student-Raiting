import React from "react";

const Authorization = () => {
    return (
        <div className="col-6 container authorizationContainer">
            <div class="mb-3 m-3">
                <label for="loginInput" class="form-label">Логин</label>
                <input class="form-control" id="loginInput"/>
            </div>
            <div class="mb-3 m-3">
                <label for="inputPassword" class="form-label">Пароль</label>      
                <input type="password" class="form-control" id="inputPassword"/>
            </div>
            <div class="col-auto m-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary mt-3 col-3">Вход</button>
            </div>
        </div>
    );
  }
  
export default Authorization;