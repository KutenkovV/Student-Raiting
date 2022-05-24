import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";


const Settings = () => {
  document.title = "Настройка рейтинга";
  
  const onSubmit = async (e) => {
      e.preventDefault()
      
      const nidInput = document.getElementById("nidInput").value;
      const udInput = document.getElementById("udInput").value;
      const sdInput = document.getElementById("sdInput").value;
      const odInput = document.getElementById("odInput").value;
      const ktdInput = document.getElementById("ktdInput").value;

      const dataSettings = new FormData();
      dataSettings.append("nidInput", nidInput)
      dataSettings.append("udInput", udInput)
      dataSettings.append("sdInput", sdInput)
      dataSettings.append("odInput", odInput)
      dataSettings.append("ktdInput", ktdInput)

      await axios.put(`http://localhost:8080/api/ratingCount`, dataSettings)
      .then(() => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error('Error!', e);
      })

      //Чистим поля
      document.getElementById("nidInput").value = "";
      document.getElementById("udInput").value = "";
      document.getElementById("sdInput").value = "";
      document.getElementById("odInput").value = "";
      document.getElementById("ktdInput").value = "";
  }; 

  return (
    <div>
      <h1 className="header">Настройка рейтинга</h1>

      <form action="#" id="#" method="put" onSubmit={onSubmit}>
      <div class="mainSettings row mt-4">
        <div class = "col">
          <div class="col m-4">
              <label for="nidInput" class="form-label">
                Научная деятельность
              </label>
              <input class="form-control"  type="number" id="nidInput"/>
            </div>
            <div class="col m-4">
              <label for="udInput" class="form-label">
                Учебная деятельность
              </label>
              <input class="form-control"  type="number" id="udInput" />
            </div>
            <div class="col m-4">
              <label for="sdInput" class="form-label">
                Спортивная деятельность
              </label>
              <input class="form-control"  type="number" id="sdInput" />
            </div>
        </div>
        <div class = "col">
          <div class="col m-4">
              <label for="odInput" class="form-label">
                Общественная деятельность
              </label>
              <input class="form-control"  type="number" id="odInput" />
            </div>
            <div class="col m-4">
              <label for="ktdInput" class="form-label">
                Культурно-творческая деятельность
              </label>
              <input class="form-control"  type="number" id="ktdInput" />
            </div>
            <div className="col m-4">
            <div class="mt-5 d-flex flex-row-reverse">
                <div className="settingSafe">Настройки сохранены!</div>
              </div>
            </div>
        </div>
        </div>
        <div className="row d-flex justify-content-end">
            <button type="submit" class="btn btn-primary col-auto mt-4">Сохранить</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
