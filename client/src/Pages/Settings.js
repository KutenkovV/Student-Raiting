import React, { useState, useEffect } from "react";
import "../style/Settings.css";
import axios from "../http/api";

const Settings = () => {
  document.title = "Вакансии";

  const [items, setItems] = useState([]);

  // изменения значений инпутов
  const [nidValue, setnidValue] = useState();
  const [udValue, setudValue] = useState();
  const [sdValue, setsdValue] = useState();
  const [odValue, setodValue] = useState();
  const [ktdValue, setktdValue] = useState();

  // Гет-запрос на настройки
  useEffect(() => {
    axios
      .get("/api/ratingCount")
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Если уже есть настройки в ответе items, то вводим их значения
  useEffect(() => {
    items.map((item) => {
      if (item.course.title === "НИД") {
        setnidValue(item.count);
      }
      if (item.course.title === "КТД") {
        setktdValue(item.count);
      }
      if (item.course.title === "УД") {
        setudValue(item.count);
      }
      if (item.course.title === "СД") {
        setsdValue(item.count);
      }
      if (item.course.title === "ОД") {
        setodValue(item.count);
      }
    });
  }, [items]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const nidInput = document.getElementById("nidInput").value;
    const udInput = document.getElementById("udInput").value;
    const sdInput = document.getElementById("sdInput").value;
    const odInput = document.getElementById("odInput").value;
    const ktdInput = document.getElementById("ktdInput").value;

    const dataSettings = new FormData();
    dataSettings.append("nidInput", nidInput);
    dataSettings.append("udInput", udInput);
    dataSettings.append("sdInput", sdInput);
    dataSettings.append("odInput", odInput);
    dataSettings.append("ktdInput", ktdInput);

    await axios
      .put(`api/ratingCount`, dataSettings)
      .then(() => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error("Error!", e);
      });
  };

  const [saveActive, setSaveActive] = useState(false);


  // Обработка ввода отрицательных чисел
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  // Обработка ввода отрицательных чисел (ввод минуса)
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  // километры кода
  return (
    <div>
      <h1 className="header">Вакансии</h1>
      <form action="#" id="#" method="put" onSubmit={onSubmit}>
        <div class="mainSettings row mt-4">
          <div class="col">
            <div class="col m-4">
              <label for="nidInput" class="form-label">
                Научная деятельность
              </label>
              <input
                min={0}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                class="form-control"
                type="number"
                id="nidInput"
                onClick={() => setSaveActive(false)}
                value={nidValue}
                onChange={(event) => setnidValue(event.target.value)}
              />
            </div>
            <div class="col m-4">
              <label for="udInput" class="form-label">
                Учебная деятельность
              </label>
              <input
                min={0}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                class="form-control"
                type="number"
                id="udInput"
                onClick={() => setSaveActive(false)}
                value={udValue}
                onChange={(event) => setudValue(event.target.value)}
              />
            </div>
            <div class="col m-4">
              <label for="sdInput" class="form-label">
                Спортивная деятельность
              </label>
              <input
                min={0}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                class="form-control"
                type="number"
                id="sdInput"
                onClick={() => setSaveActive(false)}
                value={sdValue}
                onChange={(event) => setsdValue(event.target.value)}
              />
            </div>
          </div>
          <div class="col">
            <div class="col m-4">
              <label for="odInput" class="form-label">
                Общественная деятельность
              </label>
              <input
                min={0}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                class="form-control"
                type="number"
                id="odInput"
                onClick={() => setSaveActive(false)}
                value={odValue}
                onChange={(event) => setodValue(event.target.value)}
              />
            </div>
            <div class="col m-4">
              <label for="ktdInput" class="form-label">
                Культурно-творческая деятельность
              </label>
              <input
                min={0}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                class="form-control"
                type="number"
                id="ktdInput"
                onClick={() => setSaveActive(false)}
                value={ktdValue}
                onChange={(event) => setktdValue(event.target.value)}
              />
            </div>
            <div className="col m-4">
              <div class="mt-5 d-flex flex-row-reverse">
                <div
                  className={
                    saveActive ? "settingSafe activeSafe" : "settingSafe"
                  }
                >
                  Вакансии сохранены!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary col-auto mt-4"
            onClick={() => setSaveActive(!saveActive)}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
