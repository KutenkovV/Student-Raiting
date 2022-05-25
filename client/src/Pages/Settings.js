import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";


const Settings = () => {
  document.title = "Настройка рейтинга";


  const [items, setItems] = useState([]);
  //Гет-запрос на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/ratingCount')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  // изменения значений инпутов  
  const [nidValue, setnidValue] = useState(78)
  const [udValue, setudValue] = useState(72)
  const [sdValue, setsdValue] = useState(65)
  const [odValue, setodValue] = useState(65)
  const [ktdValue, setktdValue] = useState(65)


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

  const [saveActive, setSaveActive] = useState(false);


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
              <input class="form-control"  type="number" id="nidInput" value={nidValue}  onChange={ (event) => setnidValue(event.target.value)} />
            </div>
            <div class="col m-4">
              <label for="udInput" class="form-label">
                Учебная деятельность
              </label>
              <input class="form-control"  type="number" id="udInput" value={udValue}  onChange={ (event) => setudValue(event.target.value)}  />
            </div>
            <div class="col m-4">
              <label for="sdInput" class="form-label">
                Спортивная деятельность
              </label>
              <input class="form-control"  type="number" id="sdInput" value={sdValue}  onChange={ (event) => setsdValue(event.target.value)}  />
            </div>
        </div>
        <div class = "col">
          <div class="col m-4">
              <label for="odInput" class="form-label">
                Общественная деятельность
              </label>
              <input class="form-control"  type="number" id="odInput"  value={odValue}  onChange={ (event) => setodValue(event.target.value)} />
            </div>
            <div class="col m-4">
              <label for="ktdInput" class="form-label">
                Культурно-творческая деятельность
              </label>
              <input class="form-control"  type="number" id="ktdInput" value={ktdValue}  onChange={ (event) => setktdValue(event.target.value)}/>
            </div>
            <div className="col m-4">
            <div class="mt-5 d-flex flex-row-reverse">
                <div className= {saveActive ? "settingSafe activeSafe" : "settingSafe"} >Настройки сохранены!</div>
              </div>
            </div>
        </div>
        </div>
        <div className="row d-flex justify-content-end">
            <button type="submit" class="btn btn-primary col-auto mt-4" onClick={() => setSaveActive(!saveActive)}>Сохранить</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
